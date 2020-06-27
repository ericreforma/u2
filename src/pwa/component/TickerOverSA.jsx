import React from 'react';

import { BlockHead, Icon } from '../../component/';

import '../assets/scss/TickerOverSA.scss';

const TickerOverSA = ({ news, onClose }) => {

	const __newsList = news.map((n, i) => (
		<div key={i} className="nt-list--item">
			<h4>{n.title}</h4>
			<p>{n.text}</p>
		</div>
	));

	return (
		<div className="ticker-over-sa shown">
			<div className="ticker-over-sa--sublayer">
				<div className="ticker-over-sa--layer">
					<button className="close" onClick={onClose}>
						<Icon name="close-circle-sharp" />
					</button>
					<div className="nt-head">
						<BlockHead name="新闻" />
						<h1>News</h1>
					</div>
					<div className="nt-body">
						<div className="nt-list">{__newsList}</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default TickerOverSA;
