import React from 'react';

import { User } from '../../service/';

function LogoutSA (props) {

	const logout = async () => {

		await User.logout();

		window.location.reload();

	}

	return (
		<button {...props} onClick={logout}>退出登录</button>
	);

}

export default LogoutSA;
