import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-scroll';

import { BlockHead } from '../../component/';
import { useWindowDimensions } from '../../util';

import '../assets/scss/ContentSA.scss';
import { head } from '../assets/scss/variables.scss';

const ContentSAItems = [
	[
		{ id: 1206, bg: 'BTI_bg', title: '体育博彩', title2: 'BTI体育', name: 'BTI体育', category: 'Sports Betting', color: 'red', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
		{ id: 1201, bg: 'IM-sports_bg', title: '体育博彩', title2: 'IM体育', name: 'IM体育', category: 'Sports Betting', color: 'blue', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
		{ id: 1211, bg: 'sports_bg',title: '体育博彩', title2: '沙巴体育', name: '沙巴体育', category: 'Sports Betting', color: 'red', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
	],
	[
		{ id: 1204, bg: 'AG_bg', title: '真人娱乐场', title2: 'AG真人', name: 'AG真人', category: 'live Casino', color: 'green', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
		{ id: 1209, bg: 'EB_bg', title: '真人娱乐场', title2: 'EB真人', name: 'EB真人', category: 'live Casino', color: 'blue', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
	],
	[
		{ id: 1208, bg: 'IM-esports_bg', title: '电子竞技博彩', title2: 'IM电竞', name: 'IM电竞', category: 'E-Sports Betting', color: 'red', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
	],
	[
		{ id: 1205, bg: 'poker_bg', title: '象棋游戏', title2: '开元棋牌', name: '开元棋牌', category: 'Chess Games', color: 'red', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
	],
	[
		{ id: 1207, bg: 'CQ_bg', title: '老虎机游戏', title2: 'CQ电子', name: 'CQ电子', category: 'Slots Game', color: 'green', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
		{ id: 1202, bg: 'PT_bg', title: '老虎机游戏', title2: 'PT电子', name: 'PT电子', category: 'Slots Game', color: 'red', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
		{ id: 1203, bg: 'MG_bg', title: '老虎机游戏', title2: 'MG电子', name: 'MG电子', category: 'Slots Game', color: 'blue', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor', },
	],
];

function ContentSA () {

	const history = useHistory();

	const wd = useWindowDimensions();

	const [ tab, setTab ] = useState(0);

	const [ tsState, setTsState ] = useState({
		width: 0,
		offset: 0,
	});

	useEffect(() => {

		try {

			const _tab = document.querySelector(`a.tab-n${tab}`);

			if (!_tab) {
				return () => {}
			}

			const { offsetWidth, offsetLeft } = _tab;

			setTsState({
				width: offsetWidth,
				offset: offsetLeft,
			});

		} catch (e) {
			console.warn(e);
		}

	// eslint-disable-next-line
	}, [ wd.width ]);

	function _setTab (t, e) {

		const { offsetWidth, offsetLeft } = e.target;

		setTab(t);

		setTsState({
			width: offsetWidth,
			offset: offsetLeft,
		});

	}

	function handleSetActive (id) {

		const tab = id.split('group-n')[1];
		const link = document.querySelectorAll('.tab')[tab];

		_setTab(tab, {
			target: link,
		});

	}

	function setGame (e, { id, name }) {

		history.push({
			pathname: `/game/${id}/${name}`,
      search: '?from_home=1',
		});

	}

	if (wd.width >= 620) {
		return (
			<div className="content-sa">
				<div className="content-sa-items">
				{ContentSAItems.map((group, i) => (
					<React.Fragment key={i}>
						{group.map((item, i2) => (
							<div
								key={i2}
								className={`sa-group--item item-${item.color} g-n${i}i-n${i2}`}
								onClick={e => setGame(e, item)}>
									<object data={`${process.env.PUBLIC_URL}/static/media/${item.bg}.svg`} type="image/svg+xml">
									</object>
								{/* <div className="content">
									<BlockHead name={item.title2} text={item.category} />
									<p className="block-text">{item.title}</p>
									<button>立即游戏</button>
								</div>
								<div className="logo">
									<i></i>
								</div> */}
							</div>
						))}
					</React.Fragment>
				))}
				</div>
			</div>
		);
	}

	return (
		<div className="content-sa">
			<div className="content-sa-tabs">
				<div className={`tabs2 tab-n${tab}`}>
					{/* className={`tab${tab === i ? ' active' : ''}`} onClick={e => _setTab(i, e)} */}
					{['体育', '真人', '电竞', '棋牌', '电子'].map((t, i) => (
					<Link
						key={i}
						to={`group-n${i}`}
						className={`tab tab-n${i}`}
						spy={true}
						smooth={true}
						duration={200}
						offset={-((+head) + 76)}
						onSetActive={handleSetActive}>
						{t}
					</Link>
					))}
					<div
						className="tab--switch"
						style={{
							transform: `translateX(${tsState.offset + 3}px)`,
							width: `${tsState.width}px`
						}}>
					</div>
				</div>
			</div>
			<div className="content-sa-items">
				{ContentSAItems.map((group, i) => (
				<div className="content-sa-group" id={`group-n${i}`} key={i}>
					{group.map((item, i2) => (
					<div
						key={i2}
						className={`sa-group--item g-n${i}i-n${i2} sa-group--item-${item.id}`}
						onClick={e => setGame(e, item)}>
							<object data={`${process.env.PUBLIC_URL}/static/media/${item.bg}.svg`} type="image/svg+xml">
							</object>
						{/* <div className="content">
							<BlockHead name={item.title2} text={item.category} />
							<p className="block-text">{item.title}</p>
							<button>立即游戏</button>
						</div>
						<div className="logo">
							<i></i>
						</div> */}
					</div>
					))}
				</div>
				))}
			</div>
		</div>
	);

}

export default ContentSA;
