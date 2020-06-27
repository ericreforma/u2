import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StickyProvider, Sticky } from 'react-stickup';

import { withAuth } from '../util/';
import { Promotions as Service } from '../service/';

import '../assets/scss/Promotions.scss';

function Promotions () {

	const container = useRef(null);
	const [ promotions, setPromotions ] = useState([]);

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('promotions-page');

		return () => document.body.classList.remove('promotions-page');

	}, []);

	useEffect(() => {

		const req = Service.read_updated();

		req.promise.then(r => {

			console.log(r);

			setPromotions(r.info);

		}, e => {});

		return () => req.cancel();

	}, []);

	return (
		<StickyProvider>
			<div className="promotions" ref={container}>
				<div className="decor-n0"></div>
				<div className="decor-n1"></div>
				<div className="promotions-flex-wrap">
					<Sticky container={container} defaultOffsetTop={180} overflowScroll="end" stickyProps={{ className: 'decor-n2' }}>
						<div></div>
					</Sticky>
					<div className="promotions-inner">
						{promotions.map((promotion, i) => (
						<Link className="banner" to={`/promotion/${promotion.id}`} key={i}>
							<div className="banner-inner">
								<div className="banner-title">
									<h4>{promotion.title}</h4>
								</div>
								<div className="banner-img">
									<img src={`https://${promotion.bannerurl}`} alt={promotion.title} />
								</div>
								<div className="banner-body">
									<p>离活动结束: {promotion.endTime}</p>
									<button>更多内容</button>
								</div>
							</div>
						</Link>
						))}
					</div>
					<Sticky container={container} defaultOffsetTop={180} overflowScroll="end" stickyProps={{ className: 'decor-n3' }}>
						<div></div>
					</Sticky>
				</div>
			</div>
		</StickyProvider>
	);

}

export default withAuth(Promotions, 0);
