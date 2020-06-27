import React, { useEffect, useState, useContext, useMemo } from 'react';
import Picker from 'react-mobile-picker';
import cx from 'classnames';

import { Wrap } from './';
import { Icon, FormField } from '../../../component/';
import { User, Card as Service } from '../../../service/';
import * as geo from '../../../service/Geo';

const CardAddWrap = (props) => {

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

	const GeoData = useMemo(() => {

		const cities = geo.cities.map(g => g.chinese_title);
		const provinces = geo.provinces.map(p => p.chinese_title);

		const provincesAssoc = {};

		geo.provinces.forEach(province => {
			provincesAssoc[province.title] = province.chinese_title;
		});

		const citiesByProvince = {};

		geo.cities.forEach(city => {
			const p = provincesAssoc[city.province];
			if (!citiesByProvince[p]) {
				citiesByProvince[p] = [];
			}
			citiesByProvince[p].push(city.chinese_title);
		});

		return {
			cities,
			citiesByProvince,
			provinces,
		};

	}, []);

	const [ bankPicker, toggleBankPicker ] = useState(false);
	const [ cityPicker, toggleCityPicker ] = useState(false);

	const [ form, setForm ] = useState({
		bank_type: '中国银行',
		bank_province: '贵州',
		bank_city: '遵义市',
		realname: userAuth.data.realName || '',
		bank_addr: '',
		bank_no: '',
	});

	const fields = [
		{ id: 'bank_type', label: '开户银行', select: toggleBankPicker, placeholder: '开户银行' },
		{ id: 'bank_province', label: '开户地区', select: toggleCityPicker, value: () => `${form.bank_province} ${form.bank_city}`, placeholder: '开户地区' },
		{ id: 'bank_city', label: '开户支行', hidden: true, select: false, },
		{ id: 'bank_addr', label: '开户支行', select: false, placeholder: '开户支行' },
		{ id: 'realname', label: '开户人姓名', select: false, placeholder: '开户人姓名', displayOnly: (userAuth.data.realName ? true : false) },
		{ id: 'bank_no', label: '银行卡号', select: false },
	];

	const onChange = e => {

		const { name, value } = e.target;

		setForm(f => ({
			...f,
			[name]: value,
		}));

	}

	const submit = () => {

		props.onLoading();

		Service.create({
			...User.read(),
			...form,
		}).promise.then(r => {

			console.info('Successfully bound the card:', r);

			props.onFinish();

		}, e => {

			console.info('Unable to bind the card:', e);

		});

	}

	return (
		<div className="card-add-form">
			<div className="card-add-wrap">
				<div className="fields">
					{fields.filter(f => !f.hidden).map((f, i) => (
						<FormField
							key={i}
							field={{
								label: f.label,
								placeholder: f.placeholder,
								select: f.select,
								displayOnly: f.displayOnly,
								value: f.value,
								onClick: () => f.select(true),
							}}
							input={{
								id: f.id,
								label: f.label,
								placeholder: f.placeholder,
								name: f.id,
								value: form[f.id],
								onChange,
							}} />
					))}
				</div>
				<div className="submit">
					<button className="button-stylized" onClick={submit}>保存</button>
				</div>
			</div>
			<div className={cx('card-add-overlay', { shown: bankPicker || cityPicker })}>
				<div className="picker-wrap">
					{bankPicker ? (
					<div className="picker-head">
						<button onClick={() => toggleBankPicker(false)}>取消</button>
						<p>选择银行</p>
						<button onClick={() => toggleBankPicker(false)}>确定</button>
					</div>
					) : null}
					{cityPicker ? (
					<div className="picker-head">
						<button onClick={() => toggleCityPicker(false)}>取消</button>
						<p>选择一个城市</p>
						<button onClick={() => toggleCityPicker(false)}>确定</button>
					</div>
					) : null}
					<div className="picker-body">
						{bankPicker ? (
						<Picker
							height={120}
							valueGroups={{ bank_type: form.bank_type }}
							optionGroups={{ bank_type: banks }}
							onChange={(k, v) => setForm({ ...form, [k]: v })} />
						) : null}
						{cityPicker ? (
						<Picker
							height={120}
							valueGroups={{
								bank_province: form.bank_province,
								bank_city: form.bank_city,
							}}
							optionGroups={{
								bank_province: GeoData.provinces,
								bank_city: GeoData.citiesByProvince[form.bank_province],
							}}
							onChange={(k, v) => {

								const _fs = {
									...form,
									[k]: v,
								};

								if (k === 'bank_province') {
									_fs.bank_city = GeoData.citiesByProvince[v][0];
								}

								setForm(_fs);

							}} />
						) : null}
					</div>
				</div>
			</div>
		</div>
	);

}

const Card = () => {

	const [ status, setStatus ] = useState(1);

	const [ adding, setAdding ] = useState(false);

	const [ update, setUpdate ] = useState(0);

	const [ cards, setCards ] = useState([]);

	useEffect(() => {

		const req = Service.read({
			...User.read()
		});

		setStatus(0);

		req.promise.then(r => {

			console.log('Got cards:', r);

			setCards(r.info);

			setStatus(1);

		}, e => {

			console.warn('Unable to get cards:', e);

			setStatus(1);

		});

		return () => req.cancel();

	}, [ update ]);

	const onFinish = () => {

		setAdding(false);

		setUpdate(u => u + 1);

	}

	return (
		<Wrap className="profile-payment" name="设置银行卡" isLoading={!status}>
			{adding ? (
				<CardAddWrap onLoading={() => setStatus(0)} onFinish={onFinish} />
			) : (
				<div className="cards-list">
					{cards.map((c, i) => (
					<div key={i} className="card">
						<div className="card-content">
							<h4>{c.debit_bank}</h4>
						</div>
					</div>
					))}
					<button className="card" onClick={e => setAdding(true)}>
						<div className="card-content">
							<Icon name="plus" />
						</div>
					</button>
				</div>
			)}
		</Wrap>
	);

}

export default Card;
