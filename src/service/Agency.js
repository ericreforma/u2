import api from './api';

import User from './User';
import { getAuthKey } from '../util/';

const path = `newpwa/agent/agent_link.php`;
const data = params => ({
	...User.read(),
	auth: getAuthKey(),
	...params,
});

const Agency = {

	qr: () => api.post(path, data({})),

	report: params => api.post('newpwa/agent/agent_commission.php', data(params)),

	members: () => api.post('newpwa/agent/agent_center.php', data({})),

};

export default Agency;
