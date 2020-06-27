import React from 'react';
import { render } from 'react-dom';

import App from './view/App';
import * as serviceWorker from './serviceWorker';

render(<App />, document.getElementById('root'));

serviceWorker.register();
