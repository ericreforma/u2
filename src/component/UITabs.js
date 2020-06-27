import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import '../assets/scss/UITabs.scss';

function UITabs (props) {

	const { tabs, tab, onSet } = props;

	const [ tabsList, setTabsList ] = useState([]);

	const [ selector, setSelector ] = useState({
		offset: 0,
		width: 0,
	});

	useEffect(() => {

		const _tabs = tabs.map(t => t.index);

		setTabsList(_tabs);

	}, [ tabs ]);

	const Tab = props => {

		const { tab, index, name, disabled, onSet } = props;

		return (
			<button
				name={index}
				onClick={onSet}
				className={cx('ui-tabs--tab', {
					active: tab === index,
					disabled: disabled
				})}>
				{name}
			</button>
		);

	}

	const resize = tab => {

		try {

			const _tab = document.querySelector(`button[name='${tab}']`);

			if (!_tab) {
				return;
			}

			if (!tabsList.includes(tab)) {

				setSelector({
					offset: 0,
					width: 0,
				});

				return;

			}

			const { offsetWidth, offsetLeft } = _tab;

			setSelector({
				offset: offsetLeft + 3,
				width: offsetWidth,
			});

		} catch (e) {
			console.warn(e);
		}

	}

	useEffect(() => {

		resize(tab);

	// eslint-disable-next-line
	}, [ tab, tabsList ]);

	return (
		<div className="ui-tabs">
			{tabs.map((t, i) => <Tab key={i} tab={tab} onSet={e => onSet(t.index, e)} {...t} />)}
			{selector.width > 0 ? (
			<div className="ui-tabs--selector" style={{
				transform: `translateX(${selector.offset}px)`,
				width: selector.width,
			}}></div>
			) : null}
		</div>
	);

}

export default UITabs;
