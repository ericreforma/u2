import React from 'react';

import { isProduction } from '../util/';
import { BlockHead } from '../component/';

import '../assets/scss/Video.scss';

function Video () {

	return (
		<div className="video">
			<div className="video-inner">
				<div className="video-head">
					<BlockHead name="视频" text="Video" />
				</div>
				<div className="video-body">
					<div className="video-block">
						<div className="video-block--outer">
							<div className="video-block--inner">
								<div className="video-block--head">
									<div className="logo"></div>
									<div className="text">
										<h4>Portugal</h4>
										<p>Incredible goals: eder wins portugal the european championships</p>
									</div>
								</div>
								<div className="video-block--body">
									<div className="video--container">
										{isProduction() ? (
										<iframe title="video-iframe" allow="autoplay" src="https://embed.dugout.com/v2/?p=eyJrZXkiOiI0eWtDcVFjTiIsInAiOiJkdWdvdXQtbGl2ZSIsInBsIjoiIn0=" width="100%" allowFullScreen=""></iframe>
										) : null}
									</div>
									<div className="video--subtitle">
										<div className="views">
											<p>409.2k views</p>
										</div>
									</div>
									<div className="video--text">
										<p>Take a look back to the 2016 UEFA European Championships when Eder scored for Portugal in the 109th minute to beat France. The only goal of the game ensured Portugal won the European Championships for the first time.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="video-block--balls-n1"></div>
						<div className="video-block--balls-n2"></div>
					</div>
				</div>
			</div>
		</div>
	);

}

export default Video;
