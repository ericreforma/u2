import React, { useState } from 'react';
import useClickOutside from 'click-outside-hook';

import '../assets/scss/UISelect.scss';

function UISelect (props) {

	const ref = useClickOutside(() => toggleVisibility(false));

	const { value, options, placeholder, onSelect } = props;

	const [ visible, toggleVisibility ] = useState(false);

	const select = (option, e) => {

		onSelect(option);

		toggleVisibility(false);

	}

	return (
		<div className={`ui-select${visible ? ' opened' : ''}`}>
			<div className="ui-select--input" onClick={e => toggleVisibility(true)}>
				<span className={value ? ' has-value' : null}>{value || placeholder}</span>
			</div>
			<div className={`ui-select--list${visible ? ' shown' : ''}`} ref={ref}>
				{options.map((option, i) => <div key={i} className="list--item" onClick={e => select(option, e)}>{option}</div>)}
			</div>
		</div>
	);

}

export default UISelect;
