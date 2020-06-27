import React, { useEffect, useState, useContext } from 'react';
import Picker from 'react-mobile-picker';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { Wrap } from './';
import { Icon } from '../../../component/';
import { User, Game } from '../../../service/';

const Transfer = () => {

	const { userAuth, setUserAuthFN } = useContext(User.Context);

	const [ balances, setBalances ] = useState({
		from: [],
		to: [],
	});

	const [ balancesFill, setBalancesFill ] = useState({
		wallet: [],
		games: [],
	});

	const [ balancesRaw, setBalancesRaw ] = useState([]);

	const [ balanceTransferred, setBalanceTransferred ] = useState(false);
	const [ balanceLoad, setBalanceLoad ] = useState(false);
	const [ balanceUpdateI, setBalanceUpdateI ] = useState(0);
	const [ balancesMap, setBalancesMap ] = useState({});
	const [ balanceOver, setBalanceOver ] = useState(null);
	const [ balanceForm, setBalanceForm ] = useState({
		from: null,
		to: null,
		amount: '',
	});

	useEffect(() => {

		setBalances({
			from: [],
			to: [],
		});

		setBalancesMap({});

		setBalancesFill({
			wallet: [],
			games: [],
		});

		Game.balances({
			...User.read(),
		}).then(_balances => {

			setBalancesRaw(_balances.filter(b => !b.error));

			// const __balances = _balances.map(b => `${b.game.name}: ${b.balance} ¥`);
			// 			__balances.unshift(`中央钱包: ${userAuth.data.balance} ¥`);
			const __balances = _balances.filter(b => !b.error).map(b => `${b.game.name}`);
						__balances.unshift(`中央钱包`);

			const _bFillWallet = [`中央钱包`];
			const _bFillGames = _balances.filter(b => !b.error).map(b => b.game.name);

			setBalancesFill({
				wallet: _bFillWallet,
				games: _bFillGames,
			});

			setBalanceForm(balanceForm => ({
				...balanceForm,
				from: __balances[0],
				to: __balances[1],
			}));

			setBalances({
				from: __balances,
				// to: __balances,
				to: _bFillGames,
			});

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
				balance: + userAuth.data.balance,
			};

			setBalancesMap(__balancesMap);

		});

	}, [ balanceUpdateI, userAuth.data.balance ]);

	useEffect(() => {

		User.session({
			...User.read()
		}).promise.then(r => setUserAuthFN(1, r.info));

		setBalanceForm(bf => ({
			...bf,
			amount: '',
		}));

	// eslint-disable-next-line
	}, [ balanceUpdateI ]);

	const AmountVariants = [ 100, 500, 1000, 2000, 5000 ];

	const PickerWrap = ({ dist }) => (
		<div className="picker-wrap">
			{balances[dist].length ? (
			<Picker
				height={120}
				valueGroups={{ [dist]: balanceForm[dist], }}
				optionGroups={{ [dist]: balances[dist], }}
				onChange={(key, value) => {

					if (dist === 'from') {

						const _d = balancesMap[value].wallet ? 'games' : 'wallet';

						setBalances(b => ({
							...b,
							to: balancesFill[_d]
						}));

						setBalanceForm(bf => ({
							...bf,
							to: balancesFill[_d][0]
						}));

					}

					setBalanceForm(bf => ({
						...bf,
						[key]: value
					}));

				}} />
			) : null}
		</div>
	)

	const swap = () => {

		const [ to, from ] = [ balanceForm.from, balanceForm.to ];

		const _d1 = balancesMap[from].wallet ? 'games' : 'wallet';
		const _d2 = balancesMap[to].wallet ? 'games' : 'wallet';

		setBalances(b => ({
			...b,
			to: balancesFill[_d1],
			from: balancesFill[_d2],
		}));

		setBalanceForm(bf => ({
			...bf,
			to,
			from
		}));

	}

	const setAmount = e => {

		const amount = e.target ? e.target.value : e;

		setBalanceForm(form => ({ ...form, amount }));

	}

	const setMax = () => {

		const _game = balancesMap[balanceForm.from];

		let _max = _game.balance;

		if (_game.wallet) {
			_max = userAuth.data.balance;
		}

		setAmount(_max);

	}

	const onlyNumbers = e => {

		const exclude = [ 'Tab', 'ArrowLeft', 'ArrowRight', 'Meta', 'Backspace' ];

		if (!e.metaKey && !exclude.includes(e.key) && !/[\d,.]$/.test(e.key)) {
			e.preventDefault();
		}

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

		setBalanceLoad(true);

		Game.transfer({
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

	const wallet = e => {

		setBalanceLoad(true);

		Game.transferToWallet().promise.then(r => {

			setBalanceLoad(false);

			setBalanceTransferred(true);

		}, e => {

			console.warn(e);

			setBalanceLoad(false);

		});

	}

	return (
		<Wrap className="profile-transfer" name="转账" isLoading={!balancesRaw.length || balanceLoad}>
			<div className="fields">
				<div className="form-field user-balance">
					<i></i>
					<div className="wrap">
						<p className="label">中心钱包</p>
						<p className="amount">¥ {BigNumber(userAuth.data.balance).toFormat(2)}</p>
					</div>
					<button className="to-wallet" onClick={wallet}>
						<Icon name="refresh" />
						<span>一键回收</span>
					</button>
				</div>
				<div className="form-field balances-list">
					{balancesRaw.map((balance, i) => (
					<div key={i} className="balances-list--item">
						<div className="game-name">{balance.game.name}</div>
						<div className="game-balance">{BigNumber(balance.balance).toFormat(2)}</div>
					</div>
					))}
				</div>
				<div className="form-field--doubler">
					<div className="form-field">
						<label>推出</label>
						<div className="input--wrap with-dot">
							<div
								className={cx('input-like', { 'has-value': balanceForm.from })}
								onClick={e => setBalanceOver('from')}>
								{balanceForm.from || '推出'}
							</div>
						</div>
					</div>
					<div className="form-field-swap">
						<button onClick={() => swap()}>
							<Icon name="switch" />
						</button>
					</div>
					<div className="form-field">
						<label>进入</label>
						<div className="input--wrap with-dot">
							<div
								className={cx('input-like', { 'has-value': balanceForm.to })}
								onClick={e => setBalanceOver('to')}>
								{balanceForm.to || '进入'}
							</div>
						</div>
					</div>
				</div>
				<div className="form-field amount-variants">
					{AmountVariants.map((amount, i) => (
						<button
							key={i}
							className={cx('amount-variant', { 'disabled': amount > userAuth.data.balance })}
							onClick={() => setAmount(amount)}>
							{amount}
						</button>
					))}
				</div>
				<div className="form-field with-max">
					<div className="amount-wrap">
						<label htmlFor="amount">金额</label>
						<div className="input--wrap">
							<input
								id="amount"
								type="number"
								placeholder="金额"
								pattern="[0-9,.]*"
								className={cx({ 'has-value': balanceForm.amount })}
								value={balanceForm.amount}
								onChange={e => setAmount(e)}
								onKeyDown={e => onlyNumbers(e)} />
						</div>
					</div>
					<div className="amount-max-wrap">
						<button
							className={cx({ disabled: (!balancesMap[balanceForm.from] || !balancesMap[balanceForm.from].balance) })}
							onClick={() => setMax()}>最大金额</button>
					</div>
				</div>
			</div>
			<div className="submit">
				<button className="button-stylized" onClick={transfer}>立即转账</button>
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
			<div className={`game-sa-overlay${balanceTransferred ? ' shown' : ''}`}>
				<div className="overlay-sublayer">
					<div className="overlay-layer">
						<div className="form response">
							<div className="form-head">
								<h2>转账</h2>
								<button className="close" onClick={() => {
									setBalanceTransferred(false);
									setBalanceUpdateI(i => i + 1);
								}}>
									<Icon name="close-circle-sharp" />
								</button>
							</div>
							<div className="form-body">
								<p>转移成功!</p>
								<div className="form-submit">
									<button onClick={() => {
										setBalanceTransferred(false);
										setBalanceUpdateI(i => i + 1);
									}}>OK</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Wrap>
	);

}

export default Transfer;
