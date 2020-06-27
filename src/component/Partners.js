import React from 'react';

import '../assets/scss/Partners.scss';

function Partners () {

	const partners = [...Array(10).keys()].map(i => (
		<div key={i} className={`partner--item n${(i + 1)}`}></div>
	));

	return (
		<div className="partners">
			<div className="partners-inner">{partners}</div>
		</div>
	);

}

export default Partners;
