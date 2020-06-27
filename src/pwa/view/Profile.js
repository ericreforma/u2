import React, { useContext } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import * as Section from './profile/';
import { User } from '../../service/';
import { withAuth } from '../util/';

import '../assets/scss/ProfileSA.scss';

function Menu () {

	const { userAuth } = useContext(User.Context);

	const MenuItem = ({ to, onClick, name, className }) => {

		if (onClick && !to) {
			return (
				<button className={`profile-sa-menu--item item-${className}`} onClick={onClick}>
					<i></i>
					<p>{name}</p>
				</button>
			);
		}

		return (
			<Link className={`profile-sa-menu--item item-${className}`} to={to}>
				<i></i>
				<p>{name}</p>
			</Link>
		);

	}

	const logout = async () => {

		await User.logout();

		window.location.reload();

	}

	return (
		<div className="profile-sa">
			<div className="profile-sa-content">
				<div className="profile-sa-menu">
					<MenuItem className="n9" to="/profile/deposit?a=1" name="存款" />
					<MenuItem className="n1" to="/profile/transfer" name="转账钱包" />
					<MenuItem className="n8" to="/profile/withdraw" name="提款" />
					<MenuItem className="n2" to="/profile/personal" name="个人资料" />
					<MenuItem className="n3" to="/profile/password" name="安全中心" />
					<MenuItem className="n4" to="/profile/payment" name="设置银行卡" />
					<MenuItem className="n5" to="/profile/betting-history" name="投注历史" />
					<MenuItem className="n6" to="/profile/transactions/deposit" name="账目" />
					<MenuItem className="n7" to="/about" name="关于我们" />
					<MenuItem className="n10" onClick={logout} name="退出登录" />
					{userAuth.data.is_agent === '1' ? (
					<>
						<MenuItem className="n11" to="/profile/agency/qr" name="代理推广" />
						<MenuItem className="n12" to="/profile/agency/agent-report" name="代理商报告" />
						<MenuItem className="n13" to="/profile/agency/comission-report" name="佣金报告" />
						<MenuItem className="n14" to="/profile/agency/members" name="会员名单" />
					</>
					) : null}
				</div>
			</div>
		</div>
	);

}

function Profile () {

	const { userAuth } = useContext(User.Context);

	return (
		<Switch>
			<Route exact path="/profile" component={Menu} />
			<Route path="/profile/deposit" component={Section.Deposit} />
			<Route path="/profile/transfer" component={Section.Transfer} />
			<Route path="/profile/withdraw" component={Section.Withdraw} />
			<Route path="/profile/personal" component={Section.Personal} />
			<Route path="/profile/password" component={Section.Password} />
			<Route path="/profile/payment" component={Section.Card} />
			<Route path="/profile/betting-history" component={Section.Betting} />
			<Route path="/profile/transactions/:type" component={Section.Transactions} />
			{userAuth.data.is_agent === '1' ? (
			<>
				<Route path="/profile/agency/qr" component={Section.QR} />
				<Route path="/profile/agency/agent-report" component={Section.AgentReport} />
				<Route path="/profile/agency/comission-report" component={Section.ComissionReport} />
				<Route path="/profile/agency/members" component={Section.Members} />
			</>
			) : null}
			<Redirect to="/profile" />
		</Switch>
	);

}

export default withAuth(Profile, 1);
