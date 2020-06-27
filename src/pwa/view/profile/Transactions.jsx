import React, { useEffect, useState } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import DatePicker from 'react-mobile-datepicker';
import cx from 'classnames';
import * as moment from 'moment';

import { toDate } from '../../../util/';
import { User, Transaction as Service } from '../../../service/';
import { Icon, UITabs } from '../../../component/';

const Transactions = () => {

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	const { type } = useParams();

	const [ loading, setLoading ] = useState(false);
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

	const [ transactions, setTransactions ] = useState([]);
	const [ transactionsFiltered, setTransactionsFiltered ] = useState([]);

	useEffect(() => {

		var req = Service.read({
			record_type: type,
			...User.read(),
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

			setLoading(false);
			setTransactions(_transactions);

		}, e => {

			if (!e.is_aborted) {
				console.error('Unable to get transactions:', e);
			}

		});

		return () => req.cancel();

	}, [ type ]);

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

		document.body.style.overflow = overlayShown ? 'hidden' : 'auto';

		return () => {
			document.body.style.overflow = 'auto';
		};

	}, [ overlayShown ]);

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
					<p className="dist">{(transaction.platName||'').split('-->').join('\n-->')}</p>
					<p className="amount">{transaction.amount}元</p>
				</div>
				<div className={`status stat-${transaction.tranStatus}`}>
					<span>{transaction.tranStatus}</span>
				</div>
			</>
			) : null}
			{type === 'washcode' ? (
			<>
				<div className="content washcode">
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

	return (
		<div className={cx('transactions-sa', 'with-loader', { loading })}>
			<div className="load-spin"></div>
			<div className="transactions-head">
				<div className="transactions-back-wrap">
					<Link to="/profile">
						<Icon name="arrow-left" />
						<p>交易记录</p>
					</Link>
					<button className="faq">
						<Icon name="faq" />
					</button>
				</div>
				<div className="transactions-menu">
					<NavLink to="/profile/transactions/deposit">存款记录</NavLink>
					{/* <NavLink to="/profile/transactions/debit">提款记录</NavLink> */}
					<NavLink to="/profile/transactions/transfer">转账记录</NavLink>
					<NavLink to="/profile/transactions/washcode">反水记录</NavLink>
				</div>
			</div>
			<div className="transactions-content">
				<div className="transactions-range">
					<UITabs tabs={[
						{ index: 'today', name: '今天' },
						{ index: 'yesterday', name: '昨天' },
						{ index: 'week', name: '本周' },
						{ index: 'month', name: '本月' },
						{ index: 'custom', name: '自选' },
					]} tab={range} onSet={setRangeHandle} />
				</div>
				<div className="transactions-list">
				{transactionsFiltered.map((transaction, i) => 
					<Transaction type={type} key={i} transaction={transaction} />
				)}
				</div>
			</div>
			<div className={cx('transactions-overlay', { shown: overlayShown })}>
				<div className="transactions-overlay--inner">
					<div className="transactions-overlay--wrap">
						<div className="custom-range-form">
							<h2>选择时间</h2>
							<div className="form-wrap">
								<div className="field">
									<label>开始日期</label>
									<DatePickerWrap type="from" header="选择时间" />
								</div>
								<div className="field">
									<label>结束日期</label>
									<DatePickerWrap type="to" min={customRange.from} header="选择结束时间" />
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

export default Transactions;
