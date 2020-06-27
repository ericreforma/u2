import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../util/';
import { User, Promotions as Service } from '../../service/';

import '../assets/scss/PromotionsSA.scss';

function Promotions () {

	const [ promotions, setPromotions ] = useState([]);

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('promotions-page');

		return () => document.body.classList.remove('promotions-page');

	}, []);

	useEffect(() => {

		const req = Service.read_updated({
			...User.read(),
		});

		req.promise.then(r => {

			console.info('Got promotions:', r);

			setPromotions(r.info);

		}, e => {
	
			console.warn('Unable to get promotions:', e);

		});

		return () => req.cancel();

	}, []);

	return (
		<div className="promotions-sa" style={{ padding: '59px 0 0' }}>
			<div className="promotions-sa-head">
				<div className="promotions-sa-title">
					<h1>促销活动</h1>
				</div>
			</div>
			<div className="promotions-sa-content">
				<div className="decor-n0"></div>
				<div className="decor-n1"></div>
				{promotions.map((promotion, i) => (
				<Link className="banner" to={`/promotion/${promotion.id}`} key={i}>
					<div className="banner-inner">
						<div className="banner-title">
							<h4>{promotion.title}</h4>
						</div>
						<img src={`https://${promotion.bannerurl}`} alt={promotion.title} />
						<div className="banner-body">
							<p>离活动结束: {promotion.endTime}</p>
							<button>更多内容</button>
						</div>
					</div>
				</Link>
				))}
			</div>
		</div>
	);

}

export default withAuth(Promotions, 1);
