import api from './api';

import { getAuthKey } from '../util/';
import { User } from './';

export default {

	read: () => api.get('newpwa/data/index.php'),

	read_updated: params => api.post('newpwa/ajax_check.php', {
		type: 'get_promotion_list',
		auth: getAuthKey(),
		...params,
	}),

	read_current: params => api.get('newpwa/ajax_check.php/index.php', {
		type: 'get_promotion_content',
		pro_id: params.id,
	}),

	getAnnouncements: ({ num }) => api.post('newpwa/ajax_check.php/index.php', {
		...User.read(),
		num,
		auth: getAuthKey(),
		type: 'get_notice',
	}),

};
