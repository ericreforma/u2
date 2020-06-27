import qs from 'query-string';

const baseURL = 'https://u2daszapp.u2d8899.com/';

function request (method, path, data, params = {}) {

	let is_aborted = false;

	const controller = new AbortController();

	const promise = new Promise((resolve, reject) => {

		let url = `${baseURL}${path}`;

		let req = {
			method,
			headers: {},
			signal: controller.signal,
		};

		if (data && Object.keys(data).length && method === 'get') {
			url += `?${qs.stringify(data)}`;
		}

		if (data && Object.keys(data).length && method === 'post') {
			// req.body = JSON.stringify(data);
			// req.headers['Content-Type'] = 'application/json; charset=utf-8';
			req.body = qs.stringify(data);
			req.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		}

		fetch(url, req).then(r => {

			r.json().then(r => {

				if ((+ r.status) !== 1) {
					return void (params.fail ? params.fail(r.info, reject, resolve) : reject(r.info));
				}

				params.done ? params.done(r, resolve, reject) : resolve(r);

			}, e => {

				const error = {
					is_aborted,
					level: 1,
					e,
				};

				params.fail ? params.fail(error, reject) : reject(error);

			});

		}, e => {

			const error = {
				is_aborted,
				level: 0,
				e,
			};

			params.fail ? params.fail(error, reject) : reject(error);

		});

	});

	return {
		promise,
		cancel: () => {

			is_aborted = true;

			controller.abort();

		},
	};

}

export default {

	request,

	get: (path, data, params) => request('get', path, data, params),

	post: (path, data, params) => request('post', path, data, params),

};
