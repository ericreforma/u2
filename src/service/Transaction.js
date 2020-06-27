import api from './api';

import { getAuthKey } from '../util/';

export default {

	read: params => api.post('newpwa/ajax_data.php/index.php', {
		type: 'record_list',
		auth: getAuthKey(),
		...params,
	}),

};
