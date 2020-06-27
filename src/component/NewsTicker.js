import React, { useEffect, useState } from 'react';
import Ticker from 'react-ticker';

import { Promotions } from '../service/';
import { TickerOverSA } from '../pwa/component/';

import '../assets/scss/Ticker.scss';

function NewsTicker () {

	const [ tickerOver, setTickerOver ] = useState(false);
	const [ ticker, setTicker ] = useState({
		text: '',
		news: [],
	});

	useEffect(() => {

		const q = Promotions.getAnnouncements({ num: 1 });

		q.promise.then(r => {

			setTicker(t => ({
				...t,
				text: r.info.map(n => n.content).join(' '),
				news: r.info.map(n => ({ title: n.content, text: n.edit_time })),
			}));

		}, e => {

			if (!e.is_aborted) {
				console.warn(e);
			}

		});

		return () => q.cancel();

	}, []);

	return (
		<>
			<div className="ticker" onClick={() => setTickerOver(true)}>
				{ticker.text ? (
				<Ticker speed={1}>
				{() => <p>{ticker.text}</p>}
				</Ticker>
				) : null}
			</div>
			{tickerOver ? <TickerOverSA onClose={() => setTickerOver(false)} news={ticker.news} /> : null}
		</>
	);

}

export default NewsTicker;
