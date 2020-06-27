import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import { UITabs, FormField } from '../component/';
import { User as Service } from '../service/';

import '../assets/scss/Login.scss';

function useQuery () {

	return new URLSearchParams(useLocation().search);

}

function FormSignin (props) {

	const { onLoading } = props;

	const { state: { referrer = '/' } = {} } = useLocation();

	const refUsername = useRef(null);
	const refPassword = useRef(null);

	const [ isValid, setValidity ] = useState(true);
	const [ isLogged, setLogged ] = useState(false);

	const [ user, setUser ] = useState({
		username: null,
		password: null,
	});

	function userChange (e) {

		if (!isValid && e.target.name === 'password') {
			setValidity(true);
		}

		setUser({
			...user,
			[e.target.name]: e.target.value,
		});

	}

	function userLogin () {

		if (!user.username) {
			return void refUsername.current.focus();
		}

		if (!user.password) {
			return void refPassword.current.focus();
		}

		onLoading(true);

		const req = Service.login(user);

		req.promise.then(r => {

			localStorage.setItem('user', JSON.stringify(user));

			onLoading(false);

			setLogged(true);

		}, e => {

			onLoading(false);

			setValidity(false);

			refPassword.current.focus();

		});

	}

	if (isLogged) {
		return <Redirect to={referrer} />
	}

	return (
		<div className="form form--signin">
			<div className="form-inner">
				<div>
					<FormField
						field={{ label: '用户名' }}
						input={{
							id: 'username',
							name: 'username',
							type: 'text',
							placeholder: '用户名',
							required: true,
							onChange: userChange,
							ref: refUsername, }} />
					<FormField
						isValid={isValid}
						field={{ label: '密码' }}
						input={{
							id: 'password',
							name: 'password',
							type: 'password',
							placeholder: '密码',
							required: true,
							onChange: userChange,
							ref: refPassword, }} />
				</div>
				<button className="submit" onClick={userLogin}>登录</button>
			</div>
			<div className="restore-wrap">
				<Link to="/restore">忘记密码了吗 ？</Link>
			</div>
		</div>
	);

}

function FormSignup (props) {

	const { onLoading } = props;

	const refUsername = useRef(null);
	const refPassword = useRef(null);
	const refPasswordOK = useRef(null);
	const refTelephone = useRef(null);
	const refRef = useRef(null);

	const [ isValid, setValidity ] = useState(0);
	const [ isCreated, setCreated ] = useState(false);

	const [ user, setUser ] = useState({
		username: null,
		password: null,
		passwordok: null,
	});

	function userChange (e) {

		if (!isValid && e.target.name === 'username') {
			setValidity(0);
		}

		setUser({
			...user,
			[e.target.name]: e.target.value,
		});

	}

	function userCreate () {

		if (!user.username) {
			return void refUsername.current.focus();
		}

		if (!/^[a-z0-9]{6,12}$/i.test(user.username)) {
			setValidity(1);
			return void refUsername.current.focus();
		} else {
			setValidity(0);
		}

		if (!user.password) {
			return void refPassword.current.focus();
		}

		if (!user.passwordok || user.password !== user.passwordok) {
			return void refPasswordOK.current.focus();
		}

		if (!user.telephone) {
			return void refTelephone.current.focus();
		}

		onLoading(true);

		const req = Service.create(user);

		req.promise.then(r => {

			localStorage.setItem('user', JSON.stringify({
				username: user.username,
				password: user.password,
			}));

			onLoading(false);

			setCreated(true);

		}, e => {

			console.warn(e);

			onLoading(false);

			setValidity(2);

			refUsername.current.focus();

		});

	}

	if (isCreated) {
		return <Redirect to="/" />
	}

	return (
		<div className="form form--signup">
			<div className="form-inner">
				<div>
					<FormField
						isValid={!isValid}
						field={{ label: '用戶名' }}
						input={{
							id: 'username',
							name: 'username',
							type: 'text',
							placeholder: '用戶名',
							required: true,
							onChange: userChange,
							ref: refUsername, }} />
					{isValid === 1 ? <p style={{ color: '#e4451b', marginTop: -15, marginBottom: 20 }}>6-12个字母数字</p> : null}
					{isValid === 2 ? <p style={{ color: '#e4451b', marginTop: -15, marginBottom: 20 }}>注册失败，会员帐号已被注册</p> : null}
					<FormField
						field={{ label: '密码' }}
						input={{
							id: 'password',
							name: 'password',
							type: 'password',
							placeholder: '密码',
							required: true,
							onChange: userChange,
							ref: refPassword, }} />
					<FormField
						field={{ label: '再次输入密码' }}
						input={{
							id: 'passwordok',
							name: 'passwordok',
							type: 'password',
							placeholder: '再次输入密码',
							required: true,
							onChange: userChange,
							ref: refPasswordOK, }} />
					<FormField
						field={{ label: '请输入手机号码' }}
						input={{
							id: 'telephone',
							name: 'telephone',
							type: 'text',
							placeholder: '11位手机号',
							required: true,
							onChange: userChange,
							ref: refTelephone, }} />
					<FormField
						field={{ label: '好友优惠推荐码' }}
						input={{
							id: 'agentName',
							name: 'agentName',
							type: 'text',
							placeholder: '没有可不填',
							required: true,
							onChange: userChange,
							ref: refRef, }} />
				</div>
				<button className="submit" onClick={userCreate}>注册</button>
			</div>
		</div>
	);

}

function Login () {

	const query = useQuery();
	const history = useHistory();

	const [ tab, setTab ] = useState(query.get('tab') || 'signin');
	const [ isLoading, setLoading ] = useState(false);

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('login-page');

		return () => document.body.classList.remove('login-page');

	}, []);

	useEffect(() => {

		history.push({ search: `?tab=${tab}` });

	}, [ history, tab ]);

	return (
		<div className="login-wrap login-form">
			<div className="login-form-wrap">
				<div className="login-form-outer">
					<div className={`login-form-inner with-loader${isLoading ? ' loading' : ''}`}>
						<div className="load-spin"></div>
						<div className="logo"></div>
						<div className="auth-tabs">
							<UITabs tabs={[
								{ index: 'signin', name: '登录' },
								{ index: 'signup', name: '注册' }
							]} tab={tab} onSet={setTab} />
						</div>
						<div className={`auth-forms tab--${tab}`}>
							<FormSignin onLoading={setLoading} />
							<FormSignup onLoading={setLoading} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Login;
