import React, { useState } from 'react';

import { Wrap, Service } from './';

const Betting = () => {

	const [ status, setStatus ] = useState(1);

	const [ game, setGame ] = useState(null);
	const [ history, setHistory ] = useState([]);

	const [ activeItem, setActiveItem ] = useState(null);

	const games = Service.Game.list();

	const Filter = {
		bti (i) {

			return {
				created_ts: i.creat_date,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '投注金额', value: i.bet, },
					{ name: '赢/输', value: i.win, },
					{ name: '状态', value: i.status, },
					{ name: '结算状态', value: i.line_type_name, },
					{ name: '投注类型', value: i.bet_type_name, },
					{ name: '细节', value: i.branch_name, },
					{ name: '创立日期', value: i.creat_date, },
					{ name: '票据编号', value: i.game_board, },
				],
			};

		},
		im (i) {

			return {
				created_ts: i.creat_time,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '投注金额', value: i.bet },
					{ name: '赢/输', value: i.win },
					{ name: '主队', value: i.hometeamname },
					{ name: '客队', value: i.awayteamname },
					{ name: '投注类型', value: i.bettype },
					{ name: '活动名称', value: i.eventname },
					{ name: '更新时间', value: i.update_time },
					{ name: '票据编号', value: i.id },
				],
			};

		},
		ag (i) {

			return {
				created_ts: i.created_time,
				name: '',
				amount: `${i.win}元`,
				status: (+ i.win) > 0,
				raw: i,
				sub: [
					{ name: '游戏名称', value: i.game_name, },
					{ name: '投注金额', value: i.bet, },
					{ name: '赢/输', value: i.win, },
					{ name: '票据编号', value: i.game_board, },
					{ name: '创立日期', value: i.created_time, },
				],
			};

		},
	};

	const _setGame = game => {

		if (!game.betting_key) {
			console.warn('No betting key provided for this game:', game);
			return;
		}

		setGame(game);
		setStatus(0);
		setHistory([]);

		Service.Game.getBettingHistory({
			...Service.User.read(),
			type: game.betting_key,
		}).promise.then(r => {

			console.log(r);

			const history = r.info.list.map(Filter[game.betting_key]);

			setHistory(history);

			setStatus(1);

		}, e => {

			console.warn('Unable to get betting history records:', e);

			setHistory([]);

			setStatus(1);

		});

	}

	return (
		<Wrap className="profile-betting-history" name="投注历史" sublevel={[ game, () => { setGame(null); setActiveItem(null); } ]} isLoading={!status}>
			{game ? (
			<div className="game-history">
				{history.map((item, i) => (
				<div className={`game-history--item${i === activeItem ? ' opened' : ''}`} key={i} onClick={() => setActiveItem((activeItem !== null ? null : i))}>
					<div className="game-history--item-wrap">
						<div className="content">
							<p className="content--item timestamp">{item.created_ts}</p>
							<p className="content--item name">{item.name}</p>
							<p className="content--item amount">{item.amount}</p>
						</div>
						<div className={`status status--${item.status ? 'green' : 'red'}`}>
							<p>{item.status ? '赢得' : '失利'}</p>
						</div>
					</div>
					{i === activeItem ? (
					<div className="game-history--item-subwrap">
						<table>
							<tbody>
								{item.sub.map((param, i) => (
								<tr key={i}>
									<td>{param.name}</td>
									<td>{param.value}</td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
					) : null}
				</div>
				))}
			</div>
			) : (
			<div className="games-list">
				{games.filter(g => g.betting_key).map((g, i) => (
				<button key={i} className={`game game--${g.name}`} onClick={e => _setGame(g)}>
					<div className="game-content">
						<div className="logo"></div>
					</div>
				</button>
				))}
			</div>
			)}
		</Wrap>
	);



}

export default Betting;
