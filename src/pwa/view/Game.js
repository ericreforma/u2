import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Picker from 'react-mobile-picker';
import ReactSlider from 'react-slider';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { withAuth } from '../util/';
import { Icon } from '../../component/';
import { User, Game as Service } from '../../service/';

import '../assets/scss/GameSA.scss';

const externals = [ 1204, 1209, 1211 ];

function Game () {

	const history = useHistory();

	const { search } = useLocation();
	// eslint-disable-next-line
	const [ fromHome, setFromHome ] = useState(search.includes('from_home=1'));

	useEffect(() => {

		if (fromHome) {
			history.replace({ search: '' });
		}

	}, [ history, fromHome ]);

	const [ loading, setLoading ] = useState(false);

	const { userAuth, setUserAuthFN } = useContext(User.Context);

	const { id, name } = useParams();
	const isExternal = externals.includes(+ id);

	const [ iframe, setIframe ] = useState(null);
	const [ iframeI, setIframeI ] = useState(0);

	const [ fullScreen, setFullScreen ] = useState(false);

	const [ overlayState, setOverlayState ] = useState(false);

	const [ balances, setBalances ] = useState([]);
	const [ balanceTransferred, setBalanceTransferred ] = useState(false);
	const [ balanceUpdateI, setBalanceUpdateI ] = useState(0);
	const [ balanceLoad, setBalanceLoad ] = useState(false);
	const [ balancesMap, setBalancesMap ] = useState({});
	const [ balanceOver, setBalanceOver ] = useState(null);
	const [ balanceForm, setBalanceForm ] = useState({
		from: '中央钱包',
		to: name,
		amount: '',
	});

	const [ sliderPercent, setSliderPercent ] = useState(0);

	const [ balanceCurrent, setBalanceCurrent ] = useState({
		name: '',
		balance: 0,
	});

	const goBack = () => history.push('/');

	const refresh = () => setIframeI(iframeI + 1);

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	useEffect(() => {

		if (isExternal) {
			return () => {};
		}

		setBalances([]);
		setBalancesMap({});

		setBalanceCurrent(bc => ({
			name,
			balance: 0,
		}));

		Service.balances({
			...User.read(),
		}).then(_balances => {

			const __balances = _balances.filter(b => !b.error).map(b => `${b.game.name}: ${b.balance} ¥`);
						__balances.push(`中央钱包: ${userAuth.data.balance} ¥`);

			setBalanceForm(balanceForm => ({
				...balanceForm,
				// from: __balances[0],
				// to: __balances[1],
			}));

			setBalances(__balances);

			const __balancesMap = {};

			_balances.filter(b => !b.error).forEach(b => {
				__balancesMap[b.game.name] = b;
			});

			__balancesMap['中央钱包'] = {
				game: {
					id: 0,
					name: 'wallet',
				},
				wallet: true,
				balance: userAuth.data.balance,
			};

			setBalanceCurrent(bc => ({
				...bc,
				balance: __balancesMap[name].balance,
			}));

			setBalancesMap(__balancesMap);

		});

	}, [ balanceUpdateI, userAuth.data.balance, isExternal, name ]);

	useEffect(() => {

		setLoading(true);

		const user = User.read();

		const req = Service.activate({
			num: 1,
			type: 'active',
			gameid: id,
			...user,
		});

		function LogIn () {

			Service.login({
				num: 1,
				gameid: id,
				...user,
			}).promise.then(r => {

				if (!isExternal) {

					setLoading(false);

					setIframe(r.info);

				} else {

					if (fromHome) {
						window.location.href = r.info;
					} else {
						history.push('/');
					}

				}

			}, e => {

				console.error('Unable to login to the game', e);

			});

		}

		req.promise.then(r => {

			console.log(r);

			LogIn();

		}, e => {

			if (!e.is_aborted) {

				console.error('Unable to activate the game:', e);

				LogIn();

			}

		});

		return () => req.cancel();

	}, [ id, history, fromHome, isExternal ]);

	useEffect(() => {

		document.body.style.overflow = balanceOver ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflow = 'auto';
		}

	}, [ balanceOver ]);

	const PickerWrap = ({ dist }) => (
		<div className="picker-wrap">
			{balances.length ? (
			<Picker
				height={120}
				valueGroups={{ [dist]: balanceForm[dist], }}
				optionGroups={{ [dist]: balances, }}
				onChange={(key, value) => setBalanceForm({ ...balanceForm, [key]: value, })} />
			) : null}
		</div>
	)

	const setAmount = e => {

		// console.log(e.target.validity.valid);

		const amount = e.target.value;
		const percent = + BigNumber(amount / userAuth.data.balance * 100).toFixed(0);

		setBalanceForm(form => ({ ...form, amount }));
		setSliderPercent(percent);

	}

	const transfer = e => {

		if (!balanceForm.amount || isNaN(+ balanceForm.amount)) {
			return void console.warn('[transfer] No amount');
		}

		const _getMap = n => balancesMap[n.split(': ')[0]] || null;

		const _from = _getMap(balanceForm.from);
		const _to = _getMap(balanceForm.to);

		if (_from.game.id === _to.game.id) {
			return void console.warn('[transfer] Same game');
		}

		if (_from.balance === 0) {
			return void console.warn('[transfer] Zero balance');
		}

		if (_from.balance < (+ balanceForm.amount)) {
			return void console.warn('[transfer] Not enough game balance');
		}

		console.info(`You're transfering ${balanceForm.amount} ¥ from ${_from.game.name} to ${_to.game.name}`);

		balanceForm.amount = BigNumber(balanceForm.amount).toFixed(0);

		setBalanceLoad(true);

		Service.transfer({
			...User.read(),
			amount: + balanceForm.amount,
			from: _from.game.id,
			to: _to.game.id,
		}).then(r => {

			console.info(`You have successfully transferred ${balanceForm.amount} ¥ from ${_from.game.name} to ${_to.game.name}: ${r.info}`);

			setBalanceLoad(false);

			setBalanceTransferred(true);

		}, e => {

			console.error(e);

			setBalanceLoad(false);

		});

	}

	const finishTransfer = () => {

		setOverlayState(false);

		setBalanceTransferred(false);

		setBalanceForm(bf => ({
			...bf,
			amount: '',
		}));

		setSliderPercent(0);

		setBalanceUpdateI(i => i + 1);

		User.session({
			...User.read()
		}).promise.then(r => setUserAuthFN(1, r.info));

	}

	return (
		<div className={cx('game-sa', 'with-loader', { loading: loading, 'full-screen': fullScreen })}>
			<button className="full-screen-exit" onClick={() => setFullScreen(false)}>
				<Icon name="close-circle-sharp" />
			</button>
			<div className="load-spin"></div>
			<div className={cx('game-sa-head', { hidden: fullScreen })} style={isExternal ? { display: 'none' } : {}}>
				<div className="sa-head-left">
					<button onClick={goBack}>
						<Icon name="arrow-left" />
					</button>
				</div>
				<div className="sa-head-middle">
					<h1>{name}</h1>
				</div>
				<div className="sa-head-right">
					<button className="balance" onClick={e => setOverlayState(true)} disabled={!balances.length}>
						<Icon name="balance" />
					</button>
					<button className="refresh" onClick={refresh}>
						<Icon name="refresh" />
					</button>
					<button className="full-screen" onClick={() => setFullScreen(true)}>
						<Icon name="full-screen" />
					</button>
				</div>
			</div>
			<div className="game-sa-content">
				{iframe ? (
				<iframe 
					key={iframeI}
					title={`IFRAME-N${id}`}
					src={iframe}>
				</iframe>
				) : null}
			</div>
			<div className={`game-sa-overlay${overlayState ? ' shown' : ''}`}>
				<div className="overlay-sublayer">
					<div className={`overlay-layer with-loader${balanceLoad ? ' loading' : ''}`}>
						<div className="load-spin"></div>
						{balanceTransferred ? (
						<div className="form response">
							<div className="form-head">
								<h2>转账</h2>
								<button className="close" onClick={finishTransfer}>
									<Icon name="close-circle-sharp" />
								</button>
							</div>
							<div className="form-body">
								<p>转移成功!</p>
								<div className="form-submit">
									<button onClick={finishTransfer}>OK</button>
								</div>
							</div>
						</div>
						) : (
						<div className="form">
							<div className="form-head">
								<h2>转账</h2>
								<button className="close" onClick={e => setOverlayState(false)}>
									<Icon name="close-circle-sharp" />
								</button>
							</div>
							<div className="form-body">
								{/*<div className="form-field">
									<label>推出</label>
									<div className="input--wrap with-dot">
										<div className={`input-like${balanceForm.from ? ' has-value' : ''}`} onClick={e => setBalanceOver('from')}>{balanceForm.from || '推出'}</div>
									</div>
								</div>
								<div className="form-field">
									<label>进入</label>
									<div className="input--wrap with-dot">
										<div className={`input-like${balanceForm.to ? ' has-value' : ''}`} onClick={e => setBalanceOver('to')}>{balanceForm.to || '进入'}</div>
									</div>
								</div>
								<div className="form-field">
									<label htmlFor="amount">金额</label>
									<div className="input--wrap">
										<input id="amount" type="text" placeholder="金额" pattern="[0-9]*" onChange={e => setAmount(e)} />
									</div>
								</div>*/}
								<div className="form-field transfer-wrap">
									<div className="transfer--item">
										<p className="title">转出钱包</p>
										<p className="game">中央钱包</p>
										<p className="balance">{BigNumber(userAuth.data.balance).toFormat(2)}</p>
									</div>
									<div className="transfer--item icon">
										<Icon name="arrow-left" />
									</div>
									<div className="transfer--item">
										<p className="title">转入钱包</p>
										<p className="game">{balanceCurrent.name}</p>
										<p className="balance">{BigNumber(balanceCurrent.balance).toFormat(2)}</p>
									</div>
								</div>
								<div className="form-field">
									<div className="slider-wrap">
										<p>0</p>
										<div className="slider-subwrap">
											<ReactSlider
												className="slider-picker"
												thumbClassName="thumb"
												trackClassName="track"
												value={sliderPercent}
												onChange={percent => {
													const amount = BigNumber(percent * userAuth.data.balance / 100).toFixed(0);
													setSliderPercent(percent);
													setBalanceForm(bf => ({
														...bf,
														amount,
													}));
												}} />
										</div>
										<p>MAX</p>
									</div>
								</div>
								<div className="form-field">
									<label htmlFor="amount">金额</label>
									<div className="input--wrap">
										<input
											id="amount"
											type="number"
											placeholder="金额"
											pattern="[0-9]*"
											value={balanceForm.amount}
											onChange={e => setAmount(e)} />
									</div>
								</div>
								<div className="form-submit">
									<button onClick={transfer}>立即转账</button>
								</div>
							</div>
						</div>
						)}
					</div>
				</div>
			</div>
			<div className={`game-sa-overlay picker-over${balanceOver ? ' shown' : ''}`}>
				<div className="picker-container">
					<div className="picker-head">
						<button onClick={e => setBalanceOver(null)}>取消</button>
						<p>{balanceOver === 'from' ? '推出' : '进入'}</p>
						<button onClick={e => setBalanceOver(null)}>确定</button>
					</div>
					{balanceOver ? <PickerWrap dist={balanceOver} /> : null}
				</div>
			</div>
		</div>
	);

}

export default withAuth(Game, 1);
