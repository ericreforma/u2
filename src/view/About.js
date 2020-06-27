import React, { useEffect } from 'react';

import '../assets/scss/About.scss';
import { withAuth } from '../util/';

const About = () => {

	useEffect(() => {

		window.scrollTo(0, 0);

	}, []);

	return (
		<div className="about-wrap desktop">
			<div className="about-wrap-inner">
				<div className="about-logo">
					<div className="logo"></div>
					<h1>U体育</h1>
				</div>
				<div className="about-content">
					<p>2014年7月，正值2014年巴西世界杯举行之际，UEDbet成功登陆西班牙甲级联赛，成为赫塔菲（加泰）官方合作伙伴。 2014-2015赛季，UEDbet将是唯一一家赞助西甲联赛球队的亚洲公司。</p>
					<p>UEDbet也是除了365(英超斯托克城)、大发(英超阿斯顿维拉)、12bet(英超赫尔城)、乐天堂(英超伯恩利)以外拥有足够条件和实力在2014-2015赞助欧洲五大联赛球队球衣广告的亚洲公司(截止2014-07-25)。</p>
					<p>UED = User Experience Design，中文简称用户体验设计。UED的通常理解，就是“我们做的一切都是为了呈现在您眼前的页面”。</p>
					<p>当我们着手创办UEDbet的时候，我们仔细研究了市面上所有游戏公司，发现他们多是东朝西凑，从未真正考虑用户需要什么， 因此我们把“重新定义各个元素，倾听每个用户的心声，竭力寻求最出色的方式解决真正用户的需求”作为公司的终极目标。</p>
					<p>每一款新的UEDbet产品上线之前都是经过大量测试后证实最适合亚洲人习惯的产品。这是一个对既定现状博彩产品作出强势挑战的团队，也是为极致用户体验而生的团队。UEDbet团队，即将带给你全新体验！</p>
					<p>2015年7月份UEDbet正式成为西甲皇家贝蒂斯球队的胸前赞助商。</p>
					<p>2016年8月19日我们因不可抗力因素，暂时离开了我们亲爱的玩家，谢幕去思考未来。</p>
					<p>2019年2月22日为了我们心爱的玩家我们重整旗鼓回来了，UEDBET品牌全面升级为U体育。</p>
					<p>2019年8月份我们正式的成为了德甲奥格斯堡俱乐部的官方赞助商。</p>
				</div>
				<div className="about-licenses">
					<h2>
						<span>权威赞助伙伴</span>
					</h2>
					<div className="fca-logo"></div>
					<h3>德国甲级联赛<br /> 奥克斯堡官方合作伙伴</h3>
					<h2 style={{ margin: '30px 0 0' }}>
						<span>正规牌照信息</span>
					</h2>
					<div className="licenses-grid">
						<div className="lg--item gc">
							<div className="icon"></div>
							<div className="name">英国GC<br /> 监督委员会</div>
						</div>
						<div className="lg--item mga">
							<div className="icon"></div>
							<div className="name">马耳他博彩牌照<br /> (MGA)认证</div>
						</div>
						<div className="lg--item pc">
							<div className="icon"></div>
							<div className="name">菲律宾(PAGCOR)<br /> 监管博彩执照</div>
						</div>
						<div className="lg--item gc2">
							<div className="icon"></div>
							<div className="name">库拉索(GC)<br /> 网络博彩协会</div>
						</div>
					</div>
					<p style={{ textAlign: 'center' }}>U体育拥有欧洲马耳他博彩管理局（MGA）、英国GC监督委员会（Gambling Commission）和菲律宾政府博彩委员会（Pagcor）颁发的合法执照。荷属安的 列斯群岛博彩执照，是受国际博彩协会认可的合法博彩公司，进行注册并娱 乐前，请确保您年满18周岁！</p>
				</div>
			</div>
		</div>
	);

}

export default withAuth(About, 0);
