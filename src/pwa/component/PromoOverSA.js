import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { User, Promotions as Service } from '../../service/';
import { Icon } from '../../component/';

import '../assets/scss/PromoOverSA.scss';

function PromoOverSA ({ onClose }) {

	const [ status, setStatus ] = useState(1);
	const [ promotions, setPromotions ] = useState([]);

	useEffect(() => {

		const req = Service.read_updated({
			...User.read(),
		});

		setStatus(0);

		req.promise.then(r => {

			console.info('Got promotions:', r);

			setStatus(1);

			setPromotions(r.info);

		}, e => {
	
			console.warn('Unable to get promotions:', e);

			setStatus(1);

		});

		return () => req.cancel();

	}, []);

	return (
		<div className={`promo-over-sa with-loader${!status ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<div className="promo-over-sa--head">
				<h2>促销活动</h2>
				<button onClick={onClose}>
					<Icon name="close-circle-sharp" />
				</button>
			</div>
			<div className="promo-over-sa--content">
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

export default PromoOverSA;
