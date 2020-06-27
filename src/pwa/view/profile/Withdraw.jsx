import React, { useState, useEffect, useMemo } from 'react';
import Picker from 'react-mobile-picker';
import DatePicker from 'react-mobile-datepicker';
import cx from 'classnames';
import * as moment from 'moment';

import { Wrap } from './';
import { toDate } from '../../../util/';
import { FormField, UITabs } from '../../../component/';
import { UIAlertSA } from '../../component/';
import { Service } from './';

const Withdraws = ({ update, alert }) => {

	const [ withdraws, setWithdraws ] = useState({
		status: 0,
		list: [],
	});

	useEffect(() => {

		const fetch = async () => {

			try {

				const r = await Service.Transaction.read({
					record_type: 'debit',
					...Service.User.read(),
				}).promise;

				console.log(r)

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

	const [ customRangeOpened, openCustomRange ] = useState({
		from: false,
		to: false,
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

				const r = await Service.User.withdrawCancel({ id: w.id }).promise;

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

	const monthMap = {
		'1': '一月',
		'2': '二月',
		'3': '三月',
		'4': '四月',
		'5': '五月',
		'6': '六月',
		'7': '七月',
		'8': '八月',
		'9': '九月',
		'10': '十月',
		'11': '十一月',
		'12': '十二月',
	};

	const DatePickerWrap = ({ type, header, min }) => (
		<>
			<p onClick={e => openCustomRange({
				...customRangeOpened,
				[type]: true,
			})}>{moment(customRange[type]).format('YYYY-MM-DD')}</p>
			<DatePicker
				theme="ios"
				confirmText="好吧"
				headerFormat={header}
				value={customRange[type]}
				isOpen={customRangeOpened[type]}
				min={min}
				dateConfig={{
					year: {
						format: 'YYYY',
					},
					month: {
						format: v => monthMap[v.getMonth() + 1],
					},
					date: {
						format: 'D',
					},
				}}
				onSelect={date => {
					openCustomRange({
						...customRangeOpened,
						[type]: false,
					});
					setCustomRange({
						...customRange,
						[type]: date,
					});
				}}
				onCancel={e => openCustomRange({
					...customRangeOpened,
					[type]: false,
				})} />
		</>
	)

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
		<div className="withdraws transactions-sa">
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
			<div className={cx('transactions-overlay', { shown: overlayShown })}>
				<div className="transactions-overlay--inner">
					<div className="transactions-overlay--wrap">
						<div className="custom-range-form">
							<h2>选择开始时间</h2>
							<div className="form-wrap">
								<div className="field">
									<label>开始日期</label>
									<DatePickerWrap type="from" header="选择开始时间" />
								</div>
								<div className="field">
									<label>结束日期</label>
									<DatePickerWrap type="to" min={customRange.from} header="选择结束时间" />
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

const Withdraw = () => {

	const [ status, setStatus ] = useState(1);

	const [ update, setUpdate ] = useState(0);

	const [ cards, setCards ] = useState([]);
	const [ cardsMap, setCardsMap ] = useState({});

	const [ form, setForm ] = useState({
		debit_bank: '',
		amount: '',
	});

	const [ cardPicker, toggleCardPicker ] = useState(false);

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

	useEffect(() => {

		const req = Service.Card.read({
			...Service.User.read()
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

		Service.User.withdraw({
			...Service.User.read(),
			..._form,
		}).promise.then(r => {

			console.log(`You've successfully withdrawn:`, r);

			showAlert('系统提示', r.info);

			setStatus(1);

			setUpdate(u => u + 1);

		}, e => {

			console.warn('Unable to withdraw:', e);

			showAlert('系统提示', e);

			setStatus(1);

		});

	}

	return (
		<Wrap className="profile-withdraw" name="马上提款" isLoading={!status}>
			<div className="withdraw-form">
				<div className="fields">
				{fields.map((f, i) =>
					<FormField
						key={i}
						field={{
							label: f.label,
							placeholder: f.placeholder,
							select: f.id === 'debit_bank',
							onClick: () => toggleCardPicker(true),
						}}
						input={{
							...f,
							name: f.id,
							value: form[f.id],
							onChange: e => {
								const { name, value } = e.target;
								setForm(f => ({
									...f,
									[name]: value,
								}));
							},
						}} />
				)}
				</div>
				<div className="submit">
					<button className="button-stylized" onClick={withdraw}>提交</button>
				</div>
			</div>
			<div className={cx('withdraw-list')}>
				<Withdraws update={update} alert={{ showAlert, hideAlert }} />
			</div>
			<div className={cx('card-select-overlay', { shown: cardPicker })}>
				<div className="picker-wrap">
					<div className="picker-head">
						<button onClick={() => toggleCardPicker(false)}>取消</button>
						<p>选择卡</p>
						<button onClick={() => toggleCardPicker(false)}>确定</button>
					</div>
					<div className="picker-body">
						{cardPicker ? (
						<Picker
							height={120}
							valueGroups={{ debit_bank: form.debit_bank }}
							optionGroups={{ debit_bank: cards }}
							onChange={(k, v) => setForm({ ...form, [k]: v, })}/>
						) : null}
					</div>
				</div>
			</div>
			<UIAlertSA {...alert} />
		</Wrap>
	);

}

export default Withdraw;
