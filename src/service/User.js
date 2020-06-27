import { createContext } from 'react';
import api from './api';

import { getAuthKey } from '../util/';

const Context = createContext({
	data: {},
	status: 0,
	setData: () => {}
});

export default {

	Context,

	read: () => {

		try {

			const user = JSON.parse(localStorage.getItem('user'));
						user.account = user.username;

			return user;

		} catch (error) {

			return null;

		}

	},

	login: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'login',
		auth: getAuthKey(),
		...params,
	}),

	logout: () => {

		return new Promise((resolve, reject) => {

			localStorage.removeItem('user');

			resolve();

		});

	},

	session: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'get_memberinfo',
		auth: getAuthKey(),
		...params,
	}),

	create: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'regist',
		auth: getAuthKey(),
		...params,
	}),

	update: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'change_information',
		auth: getAuthKey(),
		...params,
	}),

	updatePassword: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'change_password',
		auth: getAuthKey(),
		...params,
	}),

	setFundsPassword: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'set_moneypwd',
		auth: getAuthKey(),
		...params,
	}),

	withdraw: params => api.post('newpwa/center.php/index.php', {
		submit_type: 'debit',
		auth: getAuthKey(),
		...params,
	}),

	withdrawCancel (params) {

		return api.post('newpwa/ajax_data.php/index.php', {
			auth: getAuthKey(),
			type: 'cancel_debit',
			...this.read(),
			...params,
		});

	},

};
