import React, { useState } from 'react';
import cx from 'classnames';
import useClickOutside from 'click-outside-hook';

import '../assets/scss/LiveChat.scss';

const FrameURL = 'https://vm.providesupport.com/01kenrfglk04u0n305fdg0321r';

const LiveChat = () => {

	const [ shown, setVisibility ] = useState(false);

	const ref = useClickOutside(() => setVisibility(false));

	return (
		<div ref={ref} className={cx('live-chat-wrap', { shown: shown })}>
			<button className="live-chat-icon" onClick={() => setVisibility(!shown)}>
				<i></i>
			</button>
			<div className="live-chat-chat">
				{shown ? <iframe title="live chat" src={FrameURL} frameBorder="0" /> : null}
			</div>
		</div>
	);

}

export default LiveChat;
