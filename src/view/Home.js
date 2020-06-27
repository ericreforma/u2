import React, { useEffect } from 'react';

import { withAuth } from '../util/';
import { TopSlider, NewsTicker, Services, AppDownload, VenueBetting, Video, Advantages } from '../component/';

function Home () {

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	return (
		<>
			<TopSlider />
			<NewsTicker />
			<Services />
			<AppDownload />
			<VenueBetting />
			<Video />
			<Advantages />
		</>
	);

}

export default withAuth(Home, 0);
