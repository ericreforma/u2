import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { User } from '../service/';

function withAuth (Component, session) {

	return function (props) {

		const { pathname } = useLocation();

		const [ status, setStatus ] = useState(0);

		const { setUserAuthFN } = useContext(User.Context);
		const [ user, setUser ] = useState({});

		useEffect(() => {

			try {

				const creds = User.read();

				if (!creds) {

					setUserAuthFN(-1, null);

					setStatus(-1);

					return () => {}

				}

				const req = User.session(creds);

				req.promise.then(r => {

					setUser(r.info);

					setUserAuthFN(1, r.info);

					setStatus(1);

				}, e => {

					setUserAuthFN(-1, {});

					setStatus(-1);

				});

				return () => req.cancel();
			
			} catch (e) {

				localStorage.removeItem('user');

				setUserAuthFN(-1, {});

				setStatus(-1);

			}

		// eslint-disable-next-line
		}, []);

		if (status === 0 && session === 1) {
			return null
		}

		if (status === -1 && session === 1) {
			return <Redirect to={{
				pathname: '/login',
				state: {
					referrer: pathname
				}
			}} />
		}

		return <Component user={user} {...props} />

	}

}

export default withAuth;
