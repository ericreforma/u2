import React from 'react';
import cx from 'classnames';

import '../assets/scss/FormField.scss';

function FormField (props) {

	const { field, input } = props;

	let is_valid = true;
	if (props.isValid !== undefined) {
		is_valid = props.isValid;
	}

	return (
		<div className={cx('form-field', { 'form-field--invalid': !is_valid })}>
			{field.label ? (
			<label htmlFor={input.id}>{field.label}</label>
			) : null}
			<div className={cx('form-field--input-wrap', { 'with-arrow': field.select })}>
			{field.select ? (
				<div
					className={cx('input-like', {
						'has-value': input.value,
						'disabled': input.disabled
					})}
					onClick={e => !input.disabled && field.onClick(e)}>
					{field.value ? field.value() : (input.value || input.placeholder)}
				</div>
			) : field.displayOnly ? (
				<p className="input-p">{input.value}</p>
			) : (
				<input {...input} />
			)}
			</div>
		</div>
	);

}

export default FormField;
