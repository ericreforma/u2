import React from 'react';

import { BlockHead } from '../component/';

import '../assets/scss/Advantages.scss';

function Advantages () {

	return (
		<div className="advantages">
			<div className="advantages-inner">
				<div className="advantages-head">
					<BlockHead name="服务优势" text="Advantage of service" />
				</div>
				<div className="advantages-body">
					<div className="advantages--item n1">
						<div className="icon">
							<div className="circle">
								<p>60</p>
							</div>
						</div>
						<h4>信誉资金托管</h4>
						<p>独立开发,128位加 密技术和严格的 安 全管理体系，让客 户资金得到最完善 的保障。</p>
					</div>
					<div className="advantages--item n2">
						<div className="icon">
							<div className="circle">
								<p>60</p>
							</div>
						</div>
						<h4>60秒极速出款</h4>
						<p>最新技术自主研发 的财务处理系统，极速存、取、转。独家网络优化技 术，为您提供一流的游戏体验。</p>
					</div>
					<div className="advantages--item n3">
						<div className="icon">
							<div className="circle">
								<p>60</p>
							</div>
						</div>
						<h4>三端数据互通</h4>
						<p>支持各种终端设备，完美兼容PC、 移 动端。原生态App让 您随时随地轻松投 注。</p>
					</div>
					<div className="advantages--item n4">
						<div className="icon">
							<div className="circle">
								<p>60</p>
							</div>
						</div>
						<h4>赛事覆盖全面</h4>
						<p>每天提供超过500 场不同类别的精彩 赛事，涵盖世界范 围内主要体育运 动 ，让客户拥有最完 美的游戏体验。</p>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Advantages;
