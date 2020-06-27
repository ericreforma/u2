import React, { useState, useContext, useMemo, useCallback } from 'react';
import Picker from 'react-mobile-picker';

import { Wrap, Service } from './';
import { getDates } from '../../../util/';
import { UIAlertSA } from '../../component/';
import { FormField } from '../../../component/';

const Personal = () => {

	const { userAuth: { data: user }, setUserAuthFN } = useContext(Service.User.Context);

	const [ status, setStatus ] = useState(1);

	const _dateParse = useCallback((date) => {

		const _parsed = (date || '').match(/([\d]{4})年([\d]{1,2})月([\d]{1,2})日/);

		if (!_parsed) {
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

		return _date;

	}, []);

	const [ form, setForm ] = useState({
		email: user.email || '',
		name: user.realName || '',
		birthday: _dateParse(user.birthday),
		number: user.telephone || '',
		qq: user.qq || '',
		wechat: user.wechat || '',
	});

	const [ subform, setSubform ] = useState({
		email: !!user.email,
		name: !!user.realName,
		birthday: !!_dateParse(user.birthday).year,
		number: !!user.telephone,
		qq: !!user.qq,
	});

	const [ datePicker, toggleDatePicker ] = useState(false);

	const _dateFormat = useCallback((date) => date.year ? `${date.year}年${date.month}月${date.day}日` : '请选择一个日期', []);

	const _dates = useMemo(() => getDates({ date: form.birthday, year: [ 18, 150 ] }), [ form.birthday ]);

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
				placeholder: '须与银行卡姓名一致',
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

	const onChange = e => {

		const { name, value } = e.target;

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

	const update = () => {

		setStatus(0);

		if (!form.birthday.year) {
			setStatus(1);
			return void showAlert('系统提示', '选择一个日期');
		}

		let shouldUpdate = false;
		for (const i in subform) {
			if (!subform[i]) {
				shouldUpdate = true;
				break;
			}
		}

		if (!shouldUpdate) {
			setStatus(1);
			return void showAlert('系统提示', '联系CS更改个人信息');
		}

		console.info('You\'re updating profile information:', form);

		Service.User.update({
			...Service.User.read(),
			...form,
			birthday: _dateFormat(form.birthday),
			realname: form.name,
			phone: form.number,
		}).promise.then(r => {

			console.info('✅ You have successfully updated profile information:', r.info);

			setStatus(1);

			showAlert('系统提示', '保存成功');

			const _sf = {};

			for (const i in fields) {
				const f = fields[i];
				_sf[f.input.name] = !!form[f.input.name];
			}

			setSubform(_sf);

			Service.User.session({
				...Service.User.read()
			}).promise.then(r => setUserAuthFN(1, r.info));

		}, e => {

			console.warn('Unable to update profile information:', e);

			setStatus(1);

		});

	}

	return (
		<Wrap className="profile-personal" name="个人资料" isLoading={!status}>
			<div className="fields">
				{fields.map((f, i) => (
					<FormField
						key={i}
						field={{
							...f.field,
							select: f.input.id === 'birthday',
							onClick: () => {

								if (!form.birthday.year) {

									const _d = getDates({ date: {}, year: [ 18, 150 ] });

									setForm(f => ({
										...f,
										birthday: {
											year: _d.year[0],
											month: _d.month[0],
											day: _d.day[0],
										},
									}));

								}

								toggleDatePicker(true);

							},
							value: () => _dateFormat(form.birthday),
						}}
						input={{
							...f.input,
							onChange,
							value: form[f.input.name],
							disabled: subform[f.input.name],
						}} />
				))}
			</div>
			<div className="submit">
				<button className="button-stylized" onClick={update}>保存</button>
			</div>
			<div className={`date-select-overlay${datePicker ? ' shown' : ''}`}>
				<div className="picker-wrap">
					<div className="picker-head">
						<button onClick={() => toggleDatePicker(false)}>取消</button>
						<p>选择一个日期</p>
						<button onClick={() => toggleDatePicker(false)}>确定</button>
					</div>
					<div className="picker-body">
						{datePicker ? (
						<Picker
							height={120}
							valueGroups={{ ...form.birthday }}
							optionGroups={{ ..._dates }}
							onChange={(k, v) => setForm({ ...form, birthday: { ...form.birthday, [k]: v } })}/>
						) : null}
					</div>
				</div>
			</div>
			<UIAlertSA {...alert} />
		</Wrap>
	);

}

export default Personal;
