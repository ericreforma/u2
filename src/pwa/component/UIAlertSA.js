import React from 'react';
import useClickOutside from 'click-outside-hook';
import cx from 'classnames';

import { Icon } from '../../component/';

import '../assets/scss/UIAlertSA.scss';

const UIAlertSA = props => {

	const { shown, title, message, onClose } = props;

	const ref = useClickOutside(onClose);

	if (!shown) {
		return null;
	}

	return (
		<div className={cx('ui-alert-sa', { shown: shown })}>
			<div className="ui-alert-sa--sublayer" ref={ref}>
				<div className="ui-alert-sa--layer">
					<div className="ui-alert-sa--head">
						<h1>{title}</h1>
						<button onClick={onClose}>
							<Icon name="close-circle-sharp" />
						</button>
					</div>
					<div className="ui-alert-sa--body">
						<p>{message}</p>
						<div className="button-wrap">
							<button className="button-stylized" onClick={onClose}>OK</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default UIAlertSA;
