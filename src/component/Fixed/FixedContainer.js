import React, { useRef, useEffect } from 'react';

import './FixedContainer.scss';

function FixedContainer (props) {

	const fixed_container = useRef(null);

	useEffect(() => {

		const fn = e => {

			console.dir(fixed_container.current.offsetHeight);

			// console.log(1, e);

		}

		window.addEventListener('scroll', fn);

		return () => {
			window.removeEventListener('scroll', fn);
		}

	}, []);

	return (
		<div ref={fixed_container} className="fixed-container">
			{props.children}
		</div>
	);

}

export default FixedContainer;
