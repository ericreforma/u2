import api from './api';

import { User } from './';
import { getAuthKey } from '../util/';

const games = [
	{ id: 1206, name: 'BTI体育', betting_key: 'bti' },
	{ id: 1201, name: 'IM体育', betting_key: 'im' },
	{ id: 1211, name: '沙巴体育' },
	{ id: 1204, name: 'AG真人', betting_key: 'ag' },
	{ id: 1209, name: 'EB真人' },
	{ id: 1208, name: 'IM电竞', },
	{ id: 1205, name: '开元棋牌' },
	{ id: 1207, name: 'CQ电子' },
	{ id: 1202, name: 'PT电子' },
	{ id: 1203, name: 'MG电子' },
];

export default {

	list: () => games,

	activate: params => api.post('newpwa/ajax_data.php', {
		type: 'active',
		auth: getAuthKey(),
		...params,
	}),

	login: params => api.post('newpwa/center.php', {
		submit_type: 'game_mobile_login',
		auth: getAuthKey(),
		...params,
	}),

	// balance: params => {

	// 	const path = 'newpwa/ajax_data.php/index.php';

	// 	const _params = {
	// 		type: 'get_balance',
	// 		auth: getAuthKey(),
	// 		...params
	// 	};

	// 	const req = api.post(path, {
	// 		gameid: params.id,
	// 		..._params,
	// 	}, {
	// 		done: (response, resolve) => resolve({ game, balance: + response.info }),
	// 		fail: (response, reject) => reject(`Unable to get game ${params.id} balance: ${response}`)
	// 	});

	// },

	balances: params => {

		const path = 'newpwa/ajax_data.php/index.php';

		const _params = {
			type: 'get_balance',
			auth: getAuthKey(),
			...params
		};

		return new Promise((resolve, reject) => {

			const promises = games.map(game => {

				const req = api.post(path, {
					gameid: game.id,
					..._params,
				}, {
					done: (response, resolve) => resolve({ game, balance: + response.info }),
					// fail: (response, reject) => reject(`Unable to get game ${game.id} (${game.name}) balance: ${response}`)
					fail: (response, reject, resolve) => resolve({ game, balance: 0, error: `Unable to get game ${game.id} (${game.name}) balance: ${response}` })
				});

				return req.promise;

			});

			Promise.all(promises).then(values => resolve(values));

		});

	},

	transfer: params => {

		const _transfer = _params => api.post('newpwa/center.php/index.php', {
			submit_type: 'transfer',
			auth: getAuthKey(),
			..._params
		})

		if (params.from === 0) {
			return _transfer({ ...params, transfer_type: `${params.to}01` }).promise;
		}

		if (params.to === 0) {
			return _transfer({ ...params, transfer_type: `${params.from}02` }).promise;
		}

		return new Promise((resolve, reject) => {

			_transfer({
				...params,
				transfer_type: `${params.from}02`,
			}).promise.then(r => {

				console.log(r);

				_transfer({
					...params,
					transfer_type: `${params.to}01`,
				}).promise.then(r => {

					console.log(r);

					resolve({ r, message: 'Money transfer completed successfully' });

				}, e => reject({ e, message: 'Failed to send money to the game' }));

			}, e => reject({ e, message: 'Failed to withdraw money from the game' }));

		});

	},

	transferToWallet: () => api.post('newpwa/center.php/index.php', {
		submit_type: 'all_transfer_out',
		...User.read(),
		auth: getAuthKey(),
	}),

	getBettingHistory: params => api.post('newpwa/record.php/index.php', {
		auth: getAuthKey(),
		...params,
	}),

};
