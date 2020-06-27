import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames';

import { User, Inbox } from '../../service/';
import { Icon } from '../../component/';

import '../assets/scss/UserSA.scss';

function UserSA () {

	const history = useHistory();

	const { userAuth } = useContext(User.Context);
	const [ balanceLoad ] = useState(0);
	const [ inboxCount, setInboxCount ] = useState(0);

	useEffect(() => {

		const q = Inbox.count();

		q.promise.then(r => {

			setInboxCount(+ r.info);

		}, e => {

			if (!e.is_aborted) {
				console.info(e);
			}

		});

		return () => q.cancel();

	}, []);

	const UserLink = ({ name, to, className, count }) => (
		<Link to={to} className={`link-${className}`}>
			<i></i>
			<span className='menuname'>{name}</span>
			{count ? <span className="count">{count}</span> : null}
		</Link>
	)

	const refreshBalance = () => {

		history.push('/profile/transfer');

		// setBalanceLoad(1);

		// User.session({
		// 	...User.read()
		// }).promise.then(r => {

		// 	setBalanceLoad(0);

		// 	setUserAuthFN(1, r.info);

		// });

	}

	return (
		<div className={cx('user-sa', 'with-loader', { loading: balanceLoad })}>
			<div className="load-spin"></div>
			<div className="user-sa-content">
				<div className="user-sa-info">

					<p className="user-sa--balance" tabIndex="0" role="button" onClick={() => refreshBalance()}>
						<span className='user-sa-username'>u2testraki</span>
						<span className='user-sa-balanceText'>中心: <span className='user-sa-balanceUnit'>¥</span><span className='user-sa-balanceAmount'>{userAuth.data.balance}44.0</span></span>
						{/* <span>中心¥: {userAuth.data.balance}</span> */}

						{/* <button>
							<Icon name="balance" />
						</button> */}
					</p>
				</div>
			</div>
			<div className="user-sa-links">
				<UserLink name="充值" to="/profile/deposit?a=1" className="deposit" />
				<UserLink name="转账" to="/profile/transfer" className="transfer" />
				<UserLink name="提款" to="/profile/withdraw" className="debit" />
				<UserLink name="信息" to="/inbox" className="inbox" count={inboxCount} />

			</div>
		</div>
	);

}

export default UserSA;
