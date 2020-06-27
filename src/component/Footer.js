import React from 'react';
import { Link } from 'react-router-dom';

import { Partners } from '../component/';

import '../assets/scss/Footer.scss';

function Footer () {

	return (
		<>
			<Partners />
			<div className="footer">
				<div className="footer-inner">
					<div className="footer-content">
						<div className="footer-content--row">
							<div className="fca-logo"></div>
						</div>
						<div className="footer-content--row links">
							<Link to="/about">关于我们</Link>
						</div>
						<div className="footer-content--row">
							<p>拥有欧洲马耳他博彩管理局（MGA）和博彩委员会（PAGCOR）颁发的合法执照。</p>
						</div>
						<div className="footer-content--row">
							<p>注册于英属维尔京群岛，是受国际博彩协会认可的合法博彩公司。进行注册并娱乐前，请确保您年满18周岁！</p>
						</div>
						<div className="footer-content--row">
							<p>英属维尔 京群岛<br /> (BVI)认证</p>
							<p>马耳他博 彩牌照<br /> (MGA)认证</p>
							<p>菲律宾 (PAGCOR)<br /> 监管博彩 执照"</p>
						</div>
						<div className="footer-content--row">
							<div className="fsc-logo"></div>
							<div className="mga-logo"></div>
							<div className="pacgor-logo"></div>
						</div>
					</div>
					<div className="footer-copy">
						<p>版权所有 &copy;2020 U体育保留所有权</p>
					</div>
				</div>
			</div>
		</>
	);

}

export default Footer;
