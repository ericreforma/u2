import React, { useEffect } from 'react';

import { withAuth } from '../util/';
import { AppDownload } from '../component/';

function Applications () {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<AppDownload />
	);

}

export default withAuth(Applications, 0);
