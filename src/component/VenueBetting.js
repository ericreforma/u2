import React, { useState } from 'react';

import { Icon, BlockHead } from '../component/';

import '../assets/scss/Tabs.scss';
import '../assets/scss/VenueBetting.scss';

function VenueBetting () {

	const [ tab, setTab ] = useState(0);

	const [ tabState, setTabState ] = useState({
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	});

	function _setTabState (tab, state) {

		setTabState({
			...tabState,
			[tab]: state,
		});

	}

	return (
		<div className="venue-betting">
			<div className="venue-betting-inner">
				<div className="venue-betting-head">
					<BlockHead name="选择场馆" text="Venues betting" />
				</div>
				<div className="venue-betting-body">
					<div className={`tabs tab-n${tab}`}>
						<div onClick={e => setTab(0)} className={`tab${tab === 0 ? ' active' : ''}`}>体育竞赛</div>
						<div onClick={e => setTab(1)} className={`tab${tab === 1 ? ' active' : ''}`}>真人娱乐</div>
						<div onClick={e => setTab(2)} className={`tab${tab === 2 ? ' active' : ''}`}>电子竞技</div>
						<div onClick={e => setTab(3)} className={`tab${tab === 3 ? ' active' : ''}`}>电子游戏</div>
						<div onClick={e => setTab(4)} className={`tab${tab === 4 ? ' active' : ''}`}>棋牌游戏</div>
						<div className="tab--switch"></div>
					</div>
					<div className={`tabs-content tab-n${tab}`}>
						<div className={`tab-content tab-n0${tab === 0 ? ' active' : ''} tab-state-n${tabState[0]}`}>
							<div className="tab-content-inner">
								<div className="tab-buttons">
									<button onClick={e => _setTabState(0, 0)} className={`switch${tabState[0] === 0 ? ' active' : ''}`}>
										<div className="content">
											<div className="bti-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
									<button onClick={e => _setTabState(0, 1)} className={`switch${tabState[0] === 1 ? ' active' : ''}`}>
										<div className="content">
											<div className="sb-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
									<button onClick={e => _setTabState(0, 2)} className={`switch${tabState[0] === 2 ? ' active' : ''}`}>
										<div className="content">
											<div className="沙巴体育-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
								</div>
								<div className="tab-frames-wrap">
									<div className="tab-frame"></div>
									<div className="tab-frame2"></div>
									<div className="tab-frame3"></div>
								</div>
							</div>
						</div>
						<div className={`tab-content tab-n1${tab === 1 ? ' active' : ''} tab-state-n${tabState[1]}`}>
							<div className="tab-content-inner">
								<div className="tab-buttons">
									<button onClick={e => _setTabState(1, 0)} className={`switch${tabState[1] === 0 ? ' active' : ''}`}>
										<div className="content">
											<div className="ag-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
									<button onClick={e => _setTabState(1, 1)} className={`switch${tabState[1] === 1 ? ' active' : ''}`}>
										<div className="content">
											<div className="ebet-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
								</div>
								<div className="tab-frames-wrap">
									<div className="tab-frame"></div>
									<div className="tab-subframe"></div>
									<div className="tab-frame2"></div>
									<div className="tab-subframe2"></div>
								</div>
							</div>
						</div>
						<div className={`tab-content tab-n2${tab === 2 ? ' active' : ''} tab-state-n${tabState[2]}`}>
							<div className="tab-content-inner">
								<div className="tab-buttons">
									<button className="switch active">
										<div className="content">
											<div className="es-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
								</div>
								<div className="tab-frame"></div>
								<div className="tab-subframe"></div>
							</div>
						</div>
						<div className={`tab-content tab-n3${tab === 3 ? ' active' : ''} tab-state-n${tabState[3]}`}>
							<div className="tab-content-inner">
								<div className="tab-buttons">
									<button onClick={e => _setTabState(3, 0)} className={`switch${tabState[3] === 0 ? ' active' : ''}`}>
										<div className="content">
											<div className="co9-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
									<button onClick={e => _setTabState(3, 1)} className={`switch${tabState[3] === 1 ? ' active' : ''}`}>
										<div className="content">
											<div className="pt-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
									<button onClick={e => _setTabState(3, 2)} className={`switch${tabState[3] === 2 ? ' active' : ''}`}>
										<div className="content">
											<div className="mg-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
								</div>
								<div className="tab-frames-wrap">
									<div className="tab-frame"></div>
									<div className="tab-frame2"></div>
									<div className="tab-frame3"></div>
								</div>
							</div>
						</div>
						<div className={`tab-content tab-n4${tab === 4 ? ' active' : ''} tab-state-n${tabState[4]}`}>
							<div className="tab-content-inner">
								<div className="tab-buttons">
									<button className="switch active">
										<div className="content">
											<div className="ky-logo"></div>
											<Icon name="chervon-right-double" />
										</div>
									</button>
								</div>
								<div className="tab-frame"></div>
								<div className="tab-subframe"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default VenueBetting;
