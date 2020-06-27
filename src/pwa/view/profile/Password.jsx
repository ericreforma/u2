import React, { useState } from 'react';

import { Wrap, Service } from './';
import { FormField } from '../../../component/';

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

		Service.User.updatePassword({
			...Service.User.read(),
			...form,
		}).promise.then(r => {

			console.info('✅ You have successfully updated account password:', r.info);

			notify(true, 'password', r.info);

			setStatus(1);

		}, e => {

			console.warn('Unable to update account password:', e.info);

			notify(false, 'password', e.info);

			setStatus(1);

		});

	}

	return (
		<>
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
		</>
	);

}

const Password = () => {

	const [ status, setStatus ] = useState(1);

	const [ tab, setTab ] = useState(null);

	return (
		<Wrap className="profile-password" name="安全中心" sublevel={[ tab, () => setTab(null), tab ]} isLoading={!status}>
			{tab ? (
			<>
				{tab === '修改登录密码' ? <PasswordRegular setStatus={s => setStatus(s)} /> : null}
			</>
			) : (
			<div className="password-tabs">
				{[
					'修改登录密码',
				].map((t, i) => (
				<button className="password-tab" onClick={() => setTab(t)} key={i}>
					<div className="password-tab-content">
						<p>{t}</p>
					</div>
				</button>
				))}
			</div>
			)}
		</Wrap>
	);

}

export default Password;
