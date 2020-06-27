import React from 'react';

import { BlockHead } from '../component/';

import '../assets/scss/AppDownload.scss';

function AppDownload () {

	return (
		<div className="app-download">
			<div className="app-download-inner">
				<div className="app-download-head">
					<BlockHead name="APP下载" text="APP download" />
				</div>
				<div className="app-download-body">
					<div className="ad-flex">
						<div className="ad-phone"></div>
						<div className="ad-links">
							<h4>扫描QR码或使用直接链接</h4>
							<div className="ad-links-wrap">
								<div className="ad-link-wrap">
									<div className="ad-link">
										<svg width="127px" height="127px" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M0.625 0.351074V46.2775H12.0844V57.7592H23.5438V46.2775H46.4627V0.351074H0.625ZM46.4627 46.2775V57.7592H57.9221V69.2408H35.0032V80.7224H0.625V126.649H46.4627V80.7224H80.8409V69.2408H69.3815V57.7592H92.3003V46.2775H103.76V57.7592H115.219V46.2775H126.679V0.351074H80.8409V46.2775H46.4627ZM115.219 57.7592V69.2408H126.679V57.7592H115.219ZM115.219 69.2408H103.76V80.7224H115.219V69.2408ZM115.219 80.7224V92.204H126.679V80.7224H115.219ZM115.219 92.204H103.76V80.7224H92.3003V92.204H63.6518V126.649H75.1112V103.686H98.03V115.167H109.489V103.686H115.219V92.204ZM98.03 115.167H86.5706V126.649H98.03V115.167ZM103.76 69.2408V57.7592H92.3003V69.2408H103.76ZM35.0032 69.2408V57.7592H23.5438V69.2408H35.0032ZM12.0844 57.7592H0.625V69.2408H12.0844V57.7592ZM57.9221 0.351074V23.3143H52.1924V34.7959H57.9221V40.5367H69.3815V23.3143H75.1112V11.8327H69.3815V0.351074H57.9221ZM12.0844 11.8327H35.0032V34.7959H12.0844V11.8327ZM92.3003 11.8327H115.219V34.7959H92.3003V11.8327ZM17.8141 17.5735V29.0551H29.2735V17.5735H17.8141ZM98.03 17.5735V29.0551H109.489V17.5735H98.03ZM12.0844 92.204H35.0032V115.167H12.0844V92.204ZM17.8141 97.9448V109.426H29.2735V97.9448H17.8141ZM115.219 115.167V126.649H126.679V115.167H115.219Z" />
										</svg>
									</div>
									<p>扫描二维码</p>
								</div>
								<div className="ad-link-wrap">
									<div className="ad-link">
										<p>请点击<br /> 这里</p>
									</div>
									<p>使用直接链接</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default AppDownload;
