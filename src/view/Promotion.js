import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { StickyProvider, Sticky } from 'react-stickup';

import { withAuth } from '../util/';
import { Promotions as Service } from '../service/';

import '../assets/scss/Promotions.scss';

function Promotion () {

	const container = useRef(null);
	const [ promotion, setPromotion ] = useState(null);

	const { id } = useParams();

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('promotions-page');

		return () => document.body.classList.remove('promotions-page');

	}, []);

	useEffect(() => {

		const req = Service.read_current({
			id,
		});

		req.promise.then(r => {

			console.log(r);

			setPromotion(r.info);

		}, e => {});

		return () => req.cancel();

	}, [ id ]);

	return (
		<StickyProvider>
			<div className="promotions single" ref={container}>
				<div className="decor-n0"></div>
				<div className="decor-n1"></div>
				<div className="promotions-flex-wrap">
					<Sticky container={container} defaultOffsetTop={180} overflowScroll="end" stickyProps={{ className: 'decor-n2' }}>
						<div></div>
					</Sticky>
					<div className="promotions-inner">
						{promotion ? (
							<div className="banner">
								<div className="banner-inner">
									<p dangerouslySetInnerHTML={{ __html: promotion }}></p>
								</div>
							</div>
						) : null}
					</div>
					<Sticky container={container} defaultOffsetTop={180} overflowScroll="end" stickyProps={{ className: 'decor-n3' }}>
						<div></div>
					</Sticky>
				</div>
			</div>
		</StickyProvider>
	);

}

export default withAuth(Promotion, 0);
