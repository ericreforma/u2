import React from 'react';

import '../assets/scss/BlockHead.scss';

function BlockHead (props) {

	return (
		<div className="block-head">
			<h2>
				<p>{props.name}</p>
				<span className="text-shadow">{props.name}</span>
			</h2>
			{props.text ? (
				<p>{props.text}</p>
			) : null}
		</div>
	);

}

export default BlockHead;
