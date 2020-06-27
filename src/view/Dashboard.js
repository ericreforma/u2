import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import cx from 'classnames';

import * as moment from 'moment';
import DatePicker from 'react-datepicker';

import { withAuth, toDate, getAuthKey } from '../util/';
import { User, Game, Card, Transaction as Service } from '../service/';
import { UITabs, UISelect, Icon, FormField } from '../component/';
import { UIAlertSA } from '../pwa/component/';

import 'react-datepicker/dist/react-datepicker.css';
import '../assets/scss/Dashboard.scss';

function useQuery () {

	return new URLSearchParams(useLocation().search);

}

function DashboardTransfer () {

	const { userAuth, setUserAuthFN } = useContext(User.Context);

	const [ balances, setBalances ] = useState({
		status: 0,
		update: 0,
		list: [],
		from: [],
		to: [],
		map: {},
	});

	const [ balancesFill, setBalancesFill ] = useState({
		wallet: [],
		games: [],
	});

	const [ form, setForm ] = useState({
		from: null,
		to: null,
		amount: '',
		overlay: false,
	});

	useEffect(() => {

		setBalances(b => ({
			...b,
			status: 0,
			list: [],
			map: {},
		}));

		Game.balances({
			...User.read(),
		}).then(_balances => {

			const list = _balances.filter(b => !b.error).map(b => `${b.game.name}: ${b.balance} ¥`);
						list.unshift(`中央钱包: ${userAuth.data.balance} ¥`);

			setBalancesFill({
				wallet: [ `中央钱包: ${userAuth.data.balance} ¥` ],
				games: _balances.filter(b => !b.error).map(b => `${b.game.name}: ${b.balance} ¥`),
			});

			const map = {};

			_balances.filter(b => !b.error).forEach(b => {
				map[b.game.name] = b;
			});

			map['中央钱包'] = {
				game: {
					id: 0,
					name: 'wallet',
				},
				wallet: true,
				balance: userAuth.data.balance,
			};

			setForm(f => ({
				...f,
				from: list[0],
				to: list[1],
			}));

			setBalances(b => ({
				...b,
				status: 1,
				list,
				from: list,
				to: _balances.filter(b => !b.error).map(b => `${b.game.name}: ${b.balance} ¥`),
				map,
			}));

		});

	}, [ balances.update, userAuth.data.balance ]);

	const swapGames = () => {

		const [ _to, _from ] = [ form.from, form.to ];

		let from = (_from || '').split(': ')[0];
		let to = (_to || '').split(': ')[0];

		const _d1 = balances.map[from].wallet ? 'games' : 'wallet';
		const _d2 = balances.map[to].wallet ? 'games' : 'wallet';

		from = `${from}: ${balances.map[from].balance} ¥`;
		to = `${to}: ${balances.map[to].balance} ¥`;

		setBalances(b => ({
			...b,
			from: balancesFill[_d2],
			to: balancesFill[_d1],
		}));

		setForm(bf => ({
			...bf,
			from,
			to
		}));

	}

	const _updateBalances = () => {

		setBalances(b => ({
			...b,
			status: 1,
		}));

		User.session({
			...User.read()
		}).promise.then(r => {

			setUserAuthFN(1, r.info);

		});

	}

	const updateBalances = () => {

		setBalances(b => ({
			...b,
			status: 0,
		}));

		Game.transferToWallet().promise.then(r => {

			setForm(f => ({
				...f,
				overlay: true,
			}));

			setBalances(b => ({ ...b, update: b.update + 1 }));

		}, e => {

			console.warn(e);

			setBalances(b => ({
				...b,
				status: 1,
			}));

		});

	}

	const selectGame = (dist, option) => {

		if (dist === 'from') {

			const v = (option || '').split(': ')[0];
			const d = balances.map[v].wallet ? 'games' : 'wallet';

			setBalances(b => ({
				...b,
				to: balancesFill[d]
			}));

			setForm(f => ({
				...f,
				to: balancesFill[d][0]
			}));

		}

		setForm(f => ({
			...f,
			[dist]: option,
		}));

	}

	const transfer = () => {

		if (!form.amount || isNaN(+ form.amount)) {
			return void console.warn('[transfer] No amount');
		}

		const _getMap = n => balances.map[n.split(': ')[0]] || null;

		const _from = _getMap(form.from);
		const _to = _getMap(form.to);

		if (_from.game.id === _to.game.id) {
			return void console.warn('[transfer] Same game');
		}

		if (_from.balance === 0) {
			return void console.warn('[transfer] Zero balance');
		}

		if (_from.balance < (+ form.amount)) {
			return void console.warn('[transfer] Not enough game balance');
		}

		console.info(`You're transfering ${form.amount} ¥ from ${_from.game.name} to ${_to.game.name}`);

		setBalances(b => ({
			...b,
			status: 0,
		}));

		Game.transfer({
			...User.read(),
			amount: + form.amount,
			from: _from.game.id,
			to: _to.game.id,
		}).then(r => {

			console.info(`You have successfully transferred ${form.amount} ¥ from ${_from.game.name} to ${_to.game.name}: ${r.info}`);

			setBalances(b => ({
				...b,
				status: 1,
			}));

			setForm({
				from: null,
				to: null,
				amount: '',
				overlay: true,
			});

			// updateBalances();

		}, e => {

			console.error(e);

			setBalances(b => ({
				...b,
				status: -1,
			}));

		});

	}

	return (
		<>
			<div className={`transfer with-loader${balances.status === 0 ? ' loading' : ''}`}>
				<div className="load-spin"></div>
				<div className="transfer-content">
					<div className="transfer-head">
						<div className="transfer-title">
							<h2>转账</h2>
							<p>场馆钱包之间不可以互转。当您开启免转钱包时，每个场馆无需转账即可畅玩。</p>
						</div>
						<div className="transfer-refresh">
							<button onClick={updateBalances}>
								<Icon name="refresh" />
								<span>刷新 一键回收</span>
							</button>
						</div>
					</div>
					<div className="transfer-form">
						<div className="transfer-form--item dists">
							<div className="transform-field">
								<div className="form-field">
									<label>推出</label>
									<div className="form-field--wrap">
										<UISelect
											value={form.from}
											options={balances.from}
											placeholder="推出"
											onSelect={option => selectGame('from', option)} />
									</div>
								</div>
							</div>
							<div className="transform-switch">
								<button onClick={swapGames}>
									<Icon name="switch" />
								</button>
							</div>
							<div className="transform-field">
								<div className="form-field">
									<label>进入</label>
									<div className="form-field--wrap">
										<UISelect
											value={form.to}
											options={balances.to}
											placeholder="进入"
											onSelect={option => selectGame('to', option)} />
									</div>
								</div>
							</div>
						</div>
						<div className="transfer-form--item">
							<div className="form-field">
								<label htmlFor="amount">金额</label>
								<input
									id="amount"
									type="text"
									placeholder="金额"
									value={form.amount}
									onChange={e => {
										const amount = e.target.value;
										setForm(f => ({ ...f, amount }));
									}} />
							</div>
						</div>
						<div className="transfer-form--item">
							<button className="button-stylized" onClick={transfer}>确定</button>
						</div>
					</div>
					<div className="transfer-body">
						<div className="games-list--category">
							<h3>体育博彩</h3>
							<div className="games-list--items">
								<div className="games-list--item BTI体育">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['BTI体育']?.balance || 0}</span> 元</div>
									</div>
								</div>
								<div className="games-list--item IM体育">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['IM体育']?.balance || 0}</span> 元</div>
									</div>
								</div>
								<div className="games-list--item 沙巴体育">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['沙巴体育']?.balance || 0}</span> 元</div>
									</div>
								</div>
							</div>
						</div>
						<div className="games-list--category">
							<h3>真人娱乐场</h3>
							<div className="games-list--items">
								<div className="games-list--item AG真人">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['AG真人']?.balance || 0}</span> 元</div>
									</div>
								</div>
								<div className="games-list--item EB真人">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['EB真人']?.balance || 0}</span> 元</div>
									</div>
								</div>
							</div>
						</div>
						<div className="games-list--category">
							<h3>电子竞技博彩</h3>
							<div className="games-list--items">
								<div className="games-list--item IM电竞">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['IM电竞']?.balance || 0}</span> 元</div>
									</div>
								</div>
							</div>
						</div>
						<div className="games-list--category">
							<h3>老虎机游戏</h3>
							<div className="games-list--items">
								<div className="games-list--item CQ电子">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['CQ电子']?.balance || 0}</span> 元</div>
									</div>
								</div>
								<div className="games-list--item PT电子">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['PT电子']?.balance || 0}</span> 元</div>
									</div>
								</div>
								<div className="games-list--item MG电子">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['MG电子']?.balance || 0}</span> 元</div>
									</div>
								</div>
							</div>
						</div>
						<div className="games-list--category">
							<h3>象棋游戏</h3>
							<div className="games-list--items">
								<div className="games-list--item 开元棋牌">
									<div>
										<div className="logo"></div>
										<div className="balance">余额: <span>{balances.map['开元棋牌']?.balance || 0}</span> 元</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`transfer-overlay${form.overlay ? ' shown' : ''}`}>
				<div className="transfer-overlay--sublayer">
					<div className="transfer-overlay--layer">
						<div className="layer-head">
							<h2>提示</h2>
							<button className="close" onClick={e => {

								setForm(f => ({ ...f, overlay: false }));

								_updateBalances();

							}}>
								<Icon name="close-circle-sharp" />
							</button>
						</div>
						<div className="layer-body">
							<p>转移成功!</p>
							<div className="layer-button">
								<button className="button-stylized" onClick={e => {

									setForm(f => ({ ...f, overlay: false }));

									_updateBalances();

								}}>OK</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);

}

function DashboardPersonal () {

	const _dateParse = (date, js) => {

		const _parsed = (date || '').match(/([\d]{4})年([\d]{1,2})月([\d]{1,2})日/);

		if (!_parsed) {

			if (js) {
				const _dd = new Date();
				return new Date(_dd.getFullYear() - 18, _dd.getMonth(), _dd.getDate());
			}

			return {
				year: null,
				month: null,
				day: null,
			};

		}

		const _date = {
			year: + _parsed[1],
			month: + _parsed[2],
			day: + _parsed[3],
		};

		if (js) {
			return new Date(_date.year, _date.month - 1, _date.day);
		}

		return _date;

	}

	const { userAuth: { data: user }, setUserAuthFN } = useContext(User.Context);

	const [ status, setStatus ] = useState(1);

	const [ form, setForm ] = useState({
		email: user.email || '',
		name: user.realName || '',
		birthday: _dateParse(user.birthday, true),
		number: user.telephone || '',
		qq: user.qq || '',
		wechat: user.wechat || '',
	});

	const [ subform, setSubform ] = useState({
		email: !!user.email,
		name: !!user.realName,
		birthday: !!user.birthday,
		number: !!user.telephone,
		qq: !!user.qq,
	});

	const [ message, setMessage ] = useState({
		className: null,
		source: null,
		message: null,
	});

	const fields = [
		{
			field: {
				label: '邮箱',
			},
			input: {
				id: 'email',
				name: 'email',
				type: 'email',
				placeholder: '邮箱',
			},
		},
		{
			field: {
				label: '真实姓名',
			},
			input: {
				id: 'name',
				name: 'name',
				type: 'text',
				placeholder: '真实姓名',
			},
		},
		{
			field: {
				label: '出生年月',
			},
			input: {
				id: 'birthday',
				name: 'birthday',
				type: 'text',
				placeholder: '出生年月',
			},
		},
		{
			field: {
				label: '手机号',
			},
			input: {
				id: 'number',
				name: 'number',
				type: 'text',
				placeholder: '手机号',
			},
		},
		{
			field: {
				label: 'QQ',
			},
			input: {
				id: 'qq',
				name: 'qq',
				type: 'text',
				placeholder: 'QQ',
			},
		},
	];

	const notify = (state, source, message) => {

		setMessage({
			className: state ? 'valid' : 'invalid',
			source,
			message,
		});

	}

	const onChange = e => {

		const { name, value } = e.target;

		setForm(f => ({
			...f,
			[name]: value,
		}));


	}

	const update = () => {

		const _dateFormat = (date) => {
			const _year = date.getFullYear();
			const _month = date.getMonth() + 1;
			const _day = date.getDate();
			return `${_year}年${_month}月${_day}日`;
		}

		setStatus(0);

		let shouldUpdate = false;
		for (const i in subform) {
			if (!subform[i]) {
				shouldUpdate = true;
				break;
			}
		}

		if (!shouldUpdate) {
			setStatus(1);
			return void notify(false, '', '联系CS更改个人信息');
		}

		console.info('You\'re updating profile information:', form);

		User.update({
			...User.read(),
			...form,
			birthday: _dateFormat(form.birthday),
			realname: form.name,
			phone: form.number,
		}).promise.then(r => {

			console.info('✅ You have successfully updated profile information:', r.info);

			setStatus(1);

			notify(true, 'password', r.info);

			const _sf = {};

			for (const i in fields) {
				const f = fields[i];
				_sf[f.input.name] = !!form[f.input.name];
			}

			setSubform(_sf);

			User.session({
				...User.read()
			}).promise.then(r => setUserAuthFN(1, r.info));

		}, e => {

			console.warn('Unable to update profile information:', e);

			setStatus(1);

		});

	}

	return (
		<div className={`dashboard-personal with-loader${!status ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<h2>个人资料</h2>
			{message.message ? (<div className={`message ${message.className}`}>{message.message}</div>) : null}
			<div className="fields">
				{fields.map((f, i) => (
					<React.Fragment key={i}>
						{f.input.id === 'birthday' ? (
						<div className="form-field">
							<label htmlFor={f.input.id}>{f.field.label}</label>
							<div className="form-field--input-wrap with-arrow">
								<DatePicker
									id={f.input.id}
									className="input-like"
									placeholder={f.input.placeholder}
									dateFormat="yyyy年M月d日"
									maxDate={moment().subtract(18, 'years').toDate()}
									selected={form[f.input.name]}
									disabled={subform[f.input.name]}
									onChange={d => setForm(f => ({ ...f, birthday: d, }))} />
							</div>
						</div>
						) : (
						<FormField
							field={f.field}
							input={{
								...f.input,
								onChange,
								value: form[f.input.name],
								disabled: subform[f.input.name],
							}} />
						)}
					</React.Fragment>
				))}
			</div>
			<div className="submit">
				<button className="button-stylized" onClick={update}>保存</button>
			</div>
		</div>
	);

}

const PasswordRegular = ({ setStatus }) => {

	const [ form, setForm ] = useState({
		password: '',
		password_new: '',
		password_newok: '',
	});

	const [ message, setMessage ] = useState({
		className: null,
		source: null,
		message: null,
	});

	const fields = [
		{
			field: {
				label: '原密码',
			},
			input: {
				id: 'password',
				name: 'password',
				type: 'password',
				placeholder: '原密码',
			},
		},
		{
			field: {
				label: '新密码',
			},
			input: {
				id: 'password_new',
				name: 'password_new',
				type: 'password',
				placeholder: '新密码',
			},
		},
		{
			field: {
				label: '验证新密码',
			},
			input: {
				id: 'password_newok',
				name: 'password_newok',
				type: 'password',
				placeholder: '验证新密码',
			},
		},
	];

	const notify = (state, source, message) => {

		setMessage({
			className: state ? 'valid' : 'invalid',
			source,
			message,
		});

	}

	const onChange = e => {

		const { name, value } = e.target;

		if (message.message && message.source === name) {
			setMessage({
				className: null,
				source: null,
				message: null,
			});
		}

		setForm(f => ({
			...f,
			[name]: value,
		}));

	}

	const update = () => {

		if (!form.password) {
			return void notify(false, 'password', '未输入当前密码!');
		}

		if (!form.password_new) {
			return void notify(false, 'password_new', '未输入新密码!');
		}

		if (form.password_new !== form.password_newok) {
			return void notify(false, 'password_new', '输入的密码不匹配!');
		}

		setStatus(0);

		console.info('You\'re updating account password:', form);

		User.updatePassword({
			...User.read(),
			...form,
		}).promise.then(r => {

			console.info('✅ You have successfully updated account password:', r.info);

			notify(true, 'password', r.info);

			setStatus(1);

		}, e => {

			console.warn('Unable to update account password:', e);

			notify(false, 'password', e);

			setStatus(1);

		});

	}

	return (
		<div className="password-section regular">
			<h2>修改登录密码</h2>
			<div className="fields">
				{message.message ? (<div className={`message ${message.className}`}>{message.message}</div>) : null}
				{fields.map((f, i) => (
					<FormField
						key={i}
						field={f.field}
						input={{
							...f.input,
							onChange,
						}} />
				))}
			</div>
			<div className="submit">
				<button className="button-stylized" onClick={update}>保存</button>
			</div>
		</div>
	);

}

function DashboardPassword () {

	const [ status, setStatus ] = useState(1);

	return (
		<div className={`dashboard-password with-loader${!status ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<PasswordRegular setStatus={s => setStatus(s)} />
		</div>
	);

}

function DashboardPayment () {

	const { userAuth } = useContext(User.Context);

	const banks = [
		// '中国百银行',
		// '建设银行',
		// '度工商银行',
		// '中信银行',
		// '招商银行',
		// '广东发展银行',
		// '民生银行',
		// '农业银行',
		// '兴业银行',
		// '上海浦东发展银行',
		// '华夏知银行',
		// '交通银行',
		// '光大银道行',
		// '深圳发展银行',
		// '恒丰银行',
		// '渤海银行',
		'中国银行',
		'中国建设银行',
		'中国农业银行',
		'中国工商银行',
		'中国邮政储蓄银行',
		'招商银行',
		'交通银行',
		'中信银行',
		'平安银行',
		'中国光大银行',
		'上海浦东发展银行',
		'广发银行',
		'华夏银行',
		'兴业银行',
		'民生银行',
	];

	const [ status, setStatus ] = useState(1);

	const [ update, setUpdate ] = useState(0);

	const [ cards, setCards ] = useState([]);

	useEffect(() => {

		const req = Card.read({
			...User.read()
		});

		setStatus(0);

		req.promise.then(r => {

			console.log('Got cards:', r);

			setCards(r.info);

			setStatus(1);

		}, e => {

			if (!e.is_aborted) {

				console.warn('Unable to get cards:', e);

				setStatus(1);

			}

		});

		return () => req.cancel();

	}, [ update ]);

	const [ form, setForm ] = useState({
		bank_type: '中国银行',
		bank_province: '',
		bank_city: '',
		realname: userAuth.data.realName || '',
		bank_addr: '',
		bank_no: '',
	});

	const fields = [
		{ id: 'bank_type', label: '开户银行', placeholder: '开户银行' },
		{ id: 'bank_province', label: '开户地区', placeholder: '开户地区' },
		{ id: 'bank_city', label: '开户支行', placeholder: '开户支行' },
		{ id: 'bank_addr', label: '开户支行', placeholder: '开户支行' },
		{ id: 'realname', label: '开户人姓名', placeholder: '开户人姓名' },
		{ id: 'bank_no', label: '银行卡号' },
	];

	const onChange = e => {

		const { name, value } = e.target;

		setForm(f => ({
			...f,
			[name]: value,
		}));

	}

	const submit = () => {

		setStatus(0);

		Card.create({
			...User.read(),
			...form,
		}).promise.then(r => {

			console.info('Successfully bound the card:', r);

			setUpdate(u => u + 1);

			setStatus(1);

		}, e => {

			console.info('Unable to bind the card:', e);

			setStatus(1);

		});

	}

	return (
		<div className={`dashboard-payment with-loader${!status ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			{cards.length ? (
			<div className="cards-list">
				<h2>设置银行卡</h2>
				<div className="cards-list--wrap">
					{cards.map((card, i) => (
					<div key={i} className="card">
						<div className="card-content">
							<h4>{card.debit_bank}</h4>
						</div>
					</div>
					))}
				</div>
			</div>
			) : null}
			<div className="cards-form">
				<h2>添加银行卡</h2>
				<div className="cards-form--wrap">
					<div className="fields">
					{fields.map((f, i) =>
						f.id === 'bank_type' ? (
							<div key={i} className="form-field">
								<label>{f.label}</label>
								<UISelect
									value={form.bank_type}
									options={banks}
									placeholder="幵户银行"
									onSelect={option => {
										setForm(f => ({
											...f,
											bank_type: option,
										}));
									}} />
							</div>
						) : (
							<FormField
								key={i}
								field={{
									label: f.label,
									placeholder: f.placeholder,
								}}
								input={{
									...f,
									name: f.id,
									value: form[f.id], onChange,
								}} />
						)
					)}
					</div>
					<div className="submit">
						<button className="button-stylized" onClick={submit}>保存</button>
					</div>
				</div>
			</div>
		</div>
	);

}

function DashboardTransactions () {

	const query = useQuery();
	const history = useHistory();

	const [ loading, setLoading ] = useState(false);

	const [ type, setType ] = useState(query.get('tab') || 'debit');
	const [ range, setRange ] = useState('today');

	const [ customI, setCustomI ] = useState(0);
	const [ customRange, setCustomRange ] = useState({
		from: moment().subtract(30, 'days').toDate(),
		to: moment().toDate()
	});

	const [ overlayShown, setOverlay ] = useState(false);

	const [ transactions, setTransactions ] = useState([]);
	const [ transactionsFiltered, setTransactionsFiltered ] = useState([]);

	useEffect(() => {

		const user = User.read();

		var req = Service.read({
			record_type: type,
			...user,
		});

		setLoading(true);

		setTransactions([]);

		req.promise.then(r => {

			const _transactions = r.info.map(t => {

				t.timestamp = toDate(t.requestTime, true);

				if (t.endTime) {
					t.timestamp = toDate(t.endTime, true);
				}

				if (t.add_date) {
					t.timestamp = toDate(t.add_date, true);
				}

				return t;

			});

			setTransactions(_transactions);

			setLoading(false);

		}, e => {

			if (!e.is_aborted) {

				console.error('Unable to get transactions:', e);

				setLoading(false);

			}

		});

		return () => req.cancel();

	}, [ history, type ]);

	useEffect(() => {

		const _rangeMap = {
			today: () => {
				const today = moment();
				return [
					today.startOf('day').unix(),
					today.endOf('day').unix()
				];
			},
			yesterday: () => {
				const yesterday = moment().subtract(1, 'days');
				return [
					yesterday.startOf('day').unix(),
					yesterday.endOf('day').unix()
				];
			},
			week: () => {
				return [
					moment().subtract(1, 'weeks').startOf('day').unix(),
					moment().endOf('day').unix()
				];
			},
			month: () => {
				return [
					moment().subtract(30, 'days').startOf('day').unix(),
					moment().endOf('day').unix()
				];
			},
			custom: () => {
				let { from, to } = customRange;
				return [
					moment(from).startOf('day').unix(),
					moment(to).endOf('day').unix()
				];
			},
		};

		const [ from, to ] = _rangeMap[range]();

		const _transactions = transactions.filter(t => {
			return t.timestamp >= from && t.timestamp < to;
		});

		setTransactionsFiltered(_transactions);

	// eslint-disable-next-line
	}, [ range, customI, transactions ]);

	useEffect(() => {

		let _tab = query.get('tab');

		if (![ 'debit', 'deposit', 'transfer', 'washcode' ].includes(_tab)) {
			_tab = 'debit';
		}

		setType(_tab);

	}, [ query, setType ]);

	const setTypeHandle = type => {

		history.push({ search: `?tab=${type}` });

	}

	const setRangeHandle = range => {

		if (range === 'custom') {
			return void setOverlay(true);
		}

		setRange(range);

	}

	const applyCustomRange = () => {

		setOverlay(false);

		setCustomI(customI + 1);

		setRange('custom');

	}

	const TypeButton = ({ type, current, name }) => (
		<button
			onClick={e => setTypeHandle(type)}
			className={`type-select--item${current === type ? ' active' : ''}`}>
			{name}
		</button>
	)

	const Transaction = ({ type, transaction }) => (
		<div className="transaction">
			{type === 'debit' ? (
			<>
				<div className="content">
					<p className="date">{transaction.requestTime}</p>
					<p className="dist">{transaction.bankInfo}</p>
					<p className="amount">{transaction.amount}元</p>
				</div>
				<div className={`status stat-${transaction.status}`}>
					<span>{transaction.status}</span>
				</div>
			</>
			) : null}
			{type === 'deposit' ? (
			<>
				<div className="content">
					<p className="date">{transaction.endTime}</p>
					<p className="dist">{transaction.payType}</p>
					<p className="amount">{transaction.amount}元</p>
				</div>
				<div className={`status stat-${transaction.status}`}>
					<span>{transaction.status}</span>
				</div>
			</>
			) : null}
			{type === 'transfer' ? (
			<>
				<div className="content">
					<p className="date">{transaction.requestTime}</p>
					<p className="dist">{transaction.platName}</p>
					<p className="amount">{transaction.amount}元</p>
				</div>
				<div className={`status stat-${transaction.tranStatus}`}>
					<span>{transaction.tranStatus}</span>
				</div>
			</>
			) : null}
			{type === 'washcode' ? (
			<>
				<div className="content">
					<p className="date">{transaction.add_date}</p>
					<p className="dist">{transaction.game_id}</p>
					<p className="amount">{transaction.money}元</p>
				</div>
				<div className={`status stat-ratio`}>
					<span>{transaction.ratio}</span>
				</div>
			</>
			) : null}
		</div>
	)

	return (
		<div className={`transactions with-loader${loading ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<div className="transactions-wrap">
				<div className="transactions-head">
					<div className="transactions-type">
						<div className="type-select">
							<TypeButton current={type} type="deposit" name="存款记录" />
							{/*<TypeButton current={type} type="debit" name="提款记录" />*/}
							<TypeButton current={type} type="transfer" name="转账记录" />
							<TypeButton current={type} type="washcode" name="反水记录" />
						</div>
					</div>
					<div className="transactions-range">
						<UITabs tabs={[
							{ index: 'today', name: '今天' },
							{ index: 'yesterday', name: '昨天' },
							{ index: 'week', name: '本周' },
							{ index: 'month', name: '本月' },
							{ index: 'custom', name: '自选' },
						]} tab={range} onSet={setRangeHandle} />
					</div>
				</div>
				<div className="transactions-list">
				{transactionsFiltered.map((transaction, i) => 
					<Transaction type={type} key={i} transaction={transaction} />
				)}
				</div>
			</div>
			{/* <div className={`transactions-overlay${overlayShown ? ' shown' : ''}`} onClick={e => setOverlay(false)}> */}
			<div className={`transactions-overlay${overlayShown ? ' shown' : ''}`}>
				<div className="transactions-overlay--inner">
					<div className="transactions-overlay--wrap">
						<div className="custom-range-form">
							<h2>选择时间</h2>
							<div className="form-wrap">
								<div className="field">
									<label htmlFor="date-from">开始日期</label>
									<DatePicker
										id="date-from"
										placeholder="开始日期"
										dateFormat="yyyy-MM-dd"
										selected={customRange.from}
										onChange={date => setCustomRange({ ...customRange, from: date, })} />
								</div>
								<div className="field">
									<label htmlFor="date-to">结束日期</label>
									<DatePicker
										id="date-from"
										placeholder="开始日期"
										dateFormat="yyyy-MM-dd"
										selected={customRange.to}
										minDate={customRange.from}
										onChange={date => setCustomRange({ ...customRange, to: date, })} />
								</div>
							</div>
							<div className="form-buttons">
								<button className="cancel" onClick={e => setOverlay(false)}>取消</button>
								<button className="update" onClick={e => applyCustomRange()}>确认</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

function DashboardDeposit () {

	const auth = getAuthKey();
	const { account } = User.read();

	const history = useHistory();
	const { search } = useLocation();
	const [ noback ] = useState(search.includes('a=1'));
	
	useEffect(() => {

		if (noback) {
			history.replace({ search: '' });
		}

	}, [ history, noback ]);

	useEffect(() => {

		console.log(noback);

		if (noback) {
			window.open(`https://u2daszapp.u2d8899.com/newpwa/deposit.php?account=${account}&auth=${auth}&type=mphone`,'_blank')
		} else {
			history.goBack();
		}

	}, [ auth, account, noback, history ]);

	return null;

	// return (
	// 	<div className="deposit">
	// 		<iframe 
	// 			style={{ height: 800, overflow: 'auto' }}
	// 			title={`IFRAME-N${auth}`}
	// 			src={`https://u2daszapp.u2d8899.com/newpwa/deposit.php?account=${account}&auth=${auth}&type=mphone`}>
	// 		</iframe>
	// 	</div>
	// );

}

function DashboardBettingHistory () {

	const [ status, setStatus ] = useState(1);

	const [ game, setGame ] = useState(null);
	const [ history, setHistory ] = useState([]);

	const [ activeItem, setActiveItem ] = useState(null);

	const Filter = {
		bti (i) {

			return {
				created_ts: i.creat_date,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '投注金额', value: i.bet, },
					{ name: '赢/输', value: i.win, },
					{ name: '状态', value: i.status, },
					{ name: '结算状态', value: i.line_type_name, },
					{ name: '投注类型', value: i.bet_type_name, },
					{ name: '细节', value: i.branch_name, },
					{ name: '创立日期', value: i.creat_date, },
					{ name: '票据编号', value: i.game_board, },
				],
			};

		},
		im (i) {

			return {
				created_ts: i.creat_time,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '投注金额', value: i.bet },
					{ name: '赢/输', value: i.win },
					{ name: '主队', value: i.hometeamname },
					{ name: '客队', value: i.awayteamname },
					{ name: '投注类型', value: i.bettype },
					{ name: '活动名称', value: i.eventname },
					{ name: '更新时间', value: i.update_time },
					{ name: '票据编号', value: i.id },
				],
			};

		},
		ag (i) {

			return {
				created_ts: i.created_time,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '游戏名称', value: i.game_name, },
					{ name: '投注金额', value: i.bet, },
					{ name: '赢/输', value: i.win, },
					{ name: '票据编号', value: i.game_board, },
					{ name: '创立日期', value: i.created_time, },
				],
			};

		},
	};

	const _setGame = game => {

		if (!game.betting_key) {
			console.warn('No betting key provided for this game:', game);
			return;
		}

		setStatus(0);
		setHistory([]);

		Game.getBettingHistory({
			...User.read(),
			type: game.betting_key,
		}).promise.then(r => {

			setGame(game);

			console.log(r);

			const history = r.info.list.map(Filter[game.betting_key]);

			setHistory(history);

			setStatus(1);

		}, e => {

			console.warn('Unable to get betting history records:', e);

			setHistory([]);

			setStatus(1);

		});

	}

	return (
		<div className={`dashboard-betting-history with-loader${!status ? ' loading' : ''}`}>
			{game ? (
			<button className="back-button" onClick={() => { setGame(null); setActiveItem(null); }}>
				<Icon name="arrow-left" />
			</button>
			) : null}
			<div className="load-spin"></div>
			{game ? (
			<div className="game-history">
				{history.map((item, i) => (
				<div className={`game-history--item${i === activeItem ? ' opened' : ''}`} key={i} onClick={() => setActiveItem((activeItem !== null ? null : i))}>
					<div className="game-history--item-wrap">
						<div className="content">
							<p className="content--item timestamp">{item.created_ts}</p>
							<p className="content--item name">{item.name}</p>
							<p className="content--item amount">{item.amount}</p>
						</div>
						<div className={`status status--${item.status ? 'green' : 'red'}`}>
							<p>{item.status ? '赢得' : '失利'}</p>
						</div>
					</div>
					{i === activeItem ? (
					<div className="game-history--item-subwrap">
						<table>
							<tbody>
								{item.sub.map((param, i) => (
								<tr key={i}>
									<td>{param.name}</td>
									<td>{param.value}</td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
					) : null}
				</div>
				))}
			</div>
			) : (
			<div className="games-list">
				<div className="games-list--category">
					<h3>体育博彩</h3>
					<div className="games-list--items">
						<div className="games-list--item BTI体育" onClick={e => _setGame({ betting_key: 'bti' })}>
							<div>
								<div className="logo"></div>
							</div>
						</div>
						<div className="games-list--item IM体育" onClick={e => _setGame({ betting_key: 'im' })}>
							<div>
								<div className="logo"></div>
							</div>
						</div>
						<div className="games-list--item 沙巴体育">
							<div>
								<div className="logo"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="games-list--category">
					<h3>真人娱乐场</h3>
					<div className="games-list--items">
						<div className="games-list--item AG真人" onClick={e => _setGame({ betting_key: 'bti' })}>
							<div>
								<div className="logo"></div>
							</div>
						</div>
						<div className="games-list--item EB真人">
							<div>
								<div className="logo"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="games-list--category">
					<h3>电子竞技博彩</h3>
					<div className="games-list--items">
						<div className="games-list--item IM电竞">
							<div>
								<div className="logo"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="games-list--category">
					<h3>老虎机游戏</h3>
					<div className="games-list--items">
						<div className="games-list--item CQ电子">
							<div>
								<div className="logo"></div>
							</div>
						</div>
						<div className="games-list--item PT电子">
							<div>
								<div className="logo"></div>
							</div>
						</div>
						<div className="games-list--item MG电子">
							<div>
								<div className="logo"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="games-list--category">
					<h3>象棋游戏</h3>
					<div className="games-list--items">
						<div className="games-list--item 开元棋牌">
							<div>
								<div className="logo"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)}
		</div>
	);

}

const Withdraws = ({ update, alert }) => {

	const [ withdraws, setWithdraws ] = useState({
		status: 0,
		list: [],
	});

	useEffect(() => {

		const fetch = async () => {

			try {

				const r = await Service.read({
					record_type: 'debit',
					...User.read(),
				}).promise;

				setWithdraws({
					status: 1,
					list: r.info.map(t => ({ ...t, ts: toDate(t.requestTime, true) })),
				});

			} catch (e) {

				if (!e.is_aborted) {
					console.warn(e);
				}

			}

		}

		fetch();

	}, [ update ]);

	const [ range, setRange ] = useState('today');

	const [ customI, setCustomI ] = useState(0);

	const [ customRange, setCustomRange ] = useState({
		from: moment().subtract(30, 'days').toDate(),
		to: moment().toDate()
	});

	const [ overlayShown, setOverlay ] = useState(false);

	const __withdraws = useMemo(() => {

		const _rangeMap = {
			today: () => {
				const today = moment();
				return [
					today.startOf('day').unix(),
					today.endOf('day').unix()
				];
			},
			yesterday: () => {
				const yesterday = moment().subtract(1, 'days');
				return [
					yesterday.startOf('day').unix(),
					yesterday.endOf('day').unix()
				];
			},
			week: () => {
				return [
					moment().subtract(1, 'weeks').startOf('day').unix(),
					moment().endOf('day').unix()
				];
			},
			month: () => {
				return [
					moment().subtract(30, 'days').startOf('day').unix(),
					moment().endOf('day').unix()
				];
			},
			custom: () => {
				let { from, to } = customRange;
				return [
					moment(from).startOf('day').unix(),
					moment(to).endOf('day').unix()
				];
			},
		};

		const [ from, to ] = _rangeMap[range]();

		return withdraws.list.filter(t => t.ts >= from && t.ts < to);

	}, [ withdraws.list, customRange, range ]);

	const UI = {
		async cancel (w) {

			try {

				const r = await User.withdrawCancel({ id: w.id }).promise;

				console.info(r);

				setWithdraws(ws => ({
					...ws,
					list: ws.list.map(ws => ws.id === w.id ? { ...w, status: '失败' } : ws),
				}));

				alert.showAlert('系统提示', r.info);

			} catch (e) {

				console.warn(e);

				alert.showAlert('系统提示', e);

			}

		},
		toggle (w) {

			setWithdraws(ws => ({
				...ws,
				list: ws.list.map(ws => ws.id === w.id ? { ...w, shown: !w.shown } : ws),
			}));

		},
		applyCustomRange () {

			setOverlay(false);

			setCustomI(customI + 1);

			setRange('custom');

		},
	};

	const _withdraws = __withdraws.map((withdraw, i) => (
		<div
			key={i}
			onClick={() => UI.toggle(withdraw)}
			className={cx('transaction-outer', { shown: withdraw.shown })}>
			<div className="transaction">
				<div className="content">
					<p className="dist">{withdraw.cardNumber}</p>
					<p className="amount">{withdraw.amount}元</p>
					<p className="date">{withdraw.requestTime}</p>
					{withdraw.status === '未审核' ? (
					<button onClick={() => UI.cancel(withdraw)}>取消提款</button>
					) : null}
				</div>
				<div className={`status stat-${withdraw.status}`}>
					<span>{withdraw.status}</span>
				</div>
			</div>
			<div className="transaction-details">
				<table>
					<tbody>
						<tr>
							<td>银行:</td>
							<td>{withdraw.status}</td>
						</tr>
						<tr>
							<td>金额:</td>
							<td>{withdraw.amount}</td>
						</tr>
						<tr>
							<td>时间:</td>
							<td>{withdraw.requestTime}</td>
						</tr>
						{withdraw.verifyComment ? (
						<tr>
							<td>备注:</td>
							<td>{withdraw.verifyComment}</td>
						</tr>
						) : null}
					</tbody>
				</table>
			</div>
		</div>
	));

	return (
		<div className="withdraws transactions-sa desktop">
			<h1>提款记录</h1>
			<div className="transactions-range">
				<UITabs
					tab={range}
					onSet={r => r !== 'custom' ? setRange(r) : setOverlay(true)}
					tabs={[
						{ index: 'today', name: '今天' },
						{ index: 'yesterday', name: '昨天' },
						{ index: 'week', name: '本周' },
						{ index: 'month', name: '本月' },
						{ index: 'custom', name: '自选' },
					]} />
			</div>
			<div className="transactions-list">
				{_withdraws}
			</div>
			<div className={`transactions-overlay${overlayShown ? ' shown' : ''}`}>
				<div className="transactions-overlay--inner">
					<div className="transactions-overlay--wrap">
						<div className="custom-range-form">
							<h2>选择时间</h2>
							<div className="form-wrap">
								<div className="field">
									<label htmlFor="date-from">开始日期</label>
									<DatePicker
										id="date-from"
										placeholder="开始日期"
										dateFormat="yyyy-MM-dd"
										selected={customRange.from}
										onChange={date => setCustomRange({ ...customRange, from: date, })} />
								</div>
								<div className="field">
									<label htmlFor="date-to">结束日期</label>
									<DatePicker
										id="date-from"
										placeholder="开始日期"
										dateFormat="yyyy-MM-dd"
										selected={customRange.to}
										minDate={customRange.from}
										onChange={date => setCustomRange({ ...customRange, to: date, })} />
								</div>
							</div>
							<div className="form-buttons">
								<button className="cancel" onClick={e => setOverlay(false)}>取消</button>
								<button className="update" onClick={e => UI.applyCustomRange()}>确认</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

function DashboardWithdraw () {

	const [ status, setStatus ] = useState(1);

	const [ update, setUpdate ] = useState(0);

	const [ cards, setCards ] = useState([]);
	const [ cardsMap, setCardsMap ] = useState({});

	const [ form, setForm ] = useState({
		debit_bank: '',
		amount: '',
	});

	const [ message, setMessage ] = useState({
		className: null,
		source: null,
		message: null,
	});

	useEffect(() => {

		const req = Card.read({
			...User.read()
		});

		setStatus(0);

		req.promise.then(r => {

			console.log('Got cards:', r);

			const _cardsMap = {};

			const _cards = r.info.map(c => {

				if (!_cardsMap[c.debit_bank]) {
					_cardsMap[c.debit_bank] = c.id;
				}

				return c.debit_bank;

			});

			setCardsMap(_cardsMap);

			if (!_cards.length) {
				_cards.push('');
			}

			setForm(f => ({
				...f,
				debit_bank: _cards[0] || '',
			}));

			setCards(_cards);

			setStatus(1);

		}, e => {

			console.warn('Unable to get cards:', e);

			setStatus(1);

		});

		return () => req.cancel();

	}, []);

	const fields = [
		{ id: 'debit_bank', label: '银行卡号', placeholder: '卡账户' },
		{ id: 'amount', label: '金额', placeholder: '最低100元' },
	];

	const onChange = e => {

		const { name, value } = e.target;

		if (message.message && message.source === name) {
			setMessage({
				className: null,
				source: null,
				message: null,
			});
		}

		setForm(f => ({
			...f,
			[name]: value,
		}));

	}

	const [ alert, setAlert ] = useState({
		shown: false,
		title: '',
		message: '',
		onClose: () => hideAlert(),
	});

	const showAlert = (title, message) => {

		setAlert(a => ({ ...a, shown: true, title, message }));

	}

	const hideAlert = () => {

		setAlert(a => ({ ...a, shown: false }));

	}

	const withdraw = () => {

		const { debit_bank, amount } = form;

		if (!debit_bank) {
			return void showAlert('系统提示', '必须选择一张卡');
		}

		const _amount = + amount;

		if (!_amount || isNaN(_amount)) {
			return void showAlert('系统提示', '取款金额不能为空');
		}

		if (_amount < 100 || _amount > 60000) {
			return void showAlert('系统提示', '取款金额小于最低取款限额');
		}

		console.info(`You're about to withdraw ${amount}¥`);

		setStatus(0);

		const _form = { ...form };
					_form.debit_bank = cardsMap[debit_bank] || '';

		User.withdraw({
			...User.read(),
			..._form,
		}).promise.then(r => {

			console.log(`You've successfully withdrawn:`, r);

			showAlert('系统提示', r.info);

			setUpdate(u => u + 1);

			setStatus(1);

		}, e => {

			console.warn('Unable to withdraw:', e);

			showAlert('系统提示', e);

			setStatus(1);

		});

	}

	return (
		<div className={`dashboard-withdraw with-loader${!status ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<h2>提款</h2>
			<div className="fields">
				{message.message ? (<div className={`message ${message.className}`}>{message.message}</div>) : null}
				{fields.map((f, i) =>
					f.id === 'debit_bank' ? (
					<div key={i} className="form-field">
						<label>{f.label}</label>
						<UISelect
							value={form.debit_bank}
							options={cards}
							placeholder={f.placeholder}
							onSelect={option => {
								setForm(f => ({
									...f,
									debit_bank: option,
								}));
							}} />
					</div>
					) : (
					<FormField
						key={i}
						field={{
							label: f.label,
							placeholder: f.placeholder,
						}}
						input={{
							...f,
							name: f.id,
							value: form[f.id], onChange,
						}} />
					)
				)}
			</div>
			<div className="submit">
				<button className="button-stylized" onClick={withdraw}>提交</button>
			</div>
			<div className="withdraw-list">
				<Withdraws update={update} alert={{ showAlert, hideAlert }} />
			</div>
			<UIAlertSA {...alert} />
		</div>
	);

}

function SubNav (props) {

	const { userAuth } = useContext(User.Context);

	return (
		<div className="sub-nav">
			<div className="sub-nav--user-wrap">
				<p className="user-name">{userAuth.data.account}</p>
				<p className="user-balance">钱包: <span>{userAuth.data.balance}</span> 元</p>
			</div>
			<div className="sub-nav--tabs">
				<UITabs tabs={[
					{ index: 'transfer', name: '转账钱包' },
					{ index: 'personal', name: '个人资料' },
					{ index: 'password', name: '安全中心' },
					{ index: 'payment', name: '设置银行卡' },
					{ index: 'betting-history', name: '投注历史' },
				]} tab={props.tab} onSet={props.onSet} />
			</div>
		</div>
	);

}

function Dashboard () {

	const history = useHistory();
	const [ tab, setTab ] = useState(useParams().tab);
	
	const auth = getAuthKey();
	const { account } = User.read();

	const { search } = useLocation();

	if (search === "?a=1") {
		window.open(`https://u2daszapp.u2d8899.com/newpwa/deposit.php?account=${account}&auth=${auth}&type=mphone`,'_blank')
	}

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('dashboard-page');

		return () => document.body.classList.remove('dashboard-page');

	}, []);

	useEffect(() => {
		if(tab === "deposit") {
			window.open(`https://u2daszapp.u2d8899.com/newpwa/deposit.php?account=${account}&auth=${auth}&type=mphone`,'_blank')
		}

		history.push(`/dashboard/${tab}`);

	}, [ account, auth, tab, history ]);

	return (
		<div className="dashboard">
			<div className="decor-n0"></div>
			<div className="decor-n1"></div>
			<div className="dashboard-wrap dashboard-sub-nav">
				<SubNav tab={tab} onSet={setTab} />
			</div>
			<div className="dashboard-wrap">
				<div className="dashboard-inner">
					<div className="dashboard-tabs">
						<UITabs tabs={[
							{ index: 'deposit', name: '存款' },
							{ index: 'transactions', name: '账目' },
							{ index: 'withdraw', name: '提款', },
						]} tab={tab} onSet={setTab} />
					</div>
					{tab === 'deposit' ? <DashboardDeposit /> : null}
					{tab === 'transactions' ? <DashboardTransactions /> : null}
					{tab === 'transfer' ? <DashboardTransfer /> : null}
					{tab === 'personal' ? <DashboardPersonal /> : null}
					{tab === 'password' ? <DashboardPassword /> : null}
					{tab === 'payment' ? <DashboardPayment /> : null}
					{tab === 'betting-history' ? <DashboardBettingHistory /> : null}
					{tab === 'withdraw' ? <DashboardWithdraw /> : null}
				</div>
			</div>
		</div>
	);

}

export default withAuth(Dashboard, 1);
