import React, { useState, useEffect } from 'react';
import Ticker from 'react-ticker';

import { Promotions } from '../../service';
import { withAuth } from '../util/';
import { SliderSA, ContentSA, UserSA, PromoOverSA, TickerOverSA } from '../component/';

import '../assets/scss/HomeSA.scss';

// const ticker_text = 'Lorem ipsum dolor就座，安全奉献精英，sius do eiusmod tempor incididunt ut Labore et d';
// const ticker_news = [
// 	{
// 		title: '在活动期间2月10日到2月16日为一个周期',
// 		text: '在活动期间2月10日到2月16日为一个周期，2月17日到2月23日为一个周期，每个周期累计存款达到要求，在2月20号获得一次免费奖金,2月27号获得一次免费奖金，活动奖金必须投注欧霸杯32强的任意比赛'
// 	},
// 	{
// 		title: '在活动期间2月10日到2月16日为一个周期',
// 		text: '在活动期间2月10日到2月16日为一个周期，2月17日到2月23日为一个周期，每个周期累计存款达到要求，在2月20号获得一次免费奖金,2月27号获得一次免费奖金，活动奖金必须投注欧霸杯32强的任意比赛'
// 	},
// 	{
// 		title: '在活动期间2月10日到2月16日为一个周期',
// 		text: '在活动期间2月10日到2月16日为一个周期，2月17日到2月23日为一个周期，每个周期累计存款达到要求，在2月20号获得一次免费奖金,2月27号获得一次免费奖金，活动奖金必须投注欧霸杯32强的任意比赛'
// 	},
// ];

const Home = ({ location, history }) => {

	const { state } = location;
	const [ promoOver, setPromoOver ] = useState(false);
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

	useEffect(() => {

		if (state?.from_login) {
			setPromoOver(true);
			history.replace();
		}

	}, [ history, state ]);

	useEffect(() => {

		window.scrollTo(0, 0);

		document.body.classList.add('pwa-home-page');

		return () => document.body.classList.remove('pwa-home-page');

	}, []);

	return (
		<>
			<div className="app-sa-head">
				<SliderSA />
				<div className="app-sa-ticker" onClick={() => setTickerOver(true)}>
					{ticker.text ? (
					<Ticker speed={3}>
					{() => <p>{ticker.text}</p>}
					</Ticker>
					) : null}
				</div>
				<UserSA />
			</div>
			<ContentSA />
			{promoOver ? <PromoOverSA onClose={() => setPromoOver(false)} /> : null}
			{tickerOver ? <TickerOverSA onClose={() => setTickerOver(false)} news={ticker.news} /> : null}
		</>
	);

}

export default Home;
