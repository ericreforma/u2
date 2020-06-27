import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../../component/';

const Wrap = (props) => {

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	const { className, isLoading, name, centerName, faq = true } = props;

	return (
		<div className={`profile-wrap-sa ${className} with-loader${isLoading ? ' loading' : ''}`}>
			<div className="load-spin"></div>
			<div className="profile-wrap-sa-head">
				{props.sublevel && props.sublevel[0] ? (
				<button onClick={() => props.sublevel[1]()}>
					<Icon name="arrow-left" />
					{props.sublevel[2] || name ? <span>{props.sublevel[2] || name}</span> : null}
				</button>
				) : (
				<Link to="/profile">
					<Icon name="arrow-left" />
					<span>{name}</span>
				</Link>
				)}
				{centerName ? <div className="center-name">{centerName}</div> : null}
				{faq ? (
				<button className="faq-button">
					<Icon name="faq" />
				</button>
				) : null}
			</div>
			<div className="profile-wrap-sa-content">
				<div className="content-inner">
					{props.children}
				</div>
			</div>
		</div>
	);

}

export default Wrap;
