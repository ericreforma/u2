import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useWindowDimensions } from '../util/';
import AppPWA from '../pwa/AppPWA';

import { Nav, Footer, LiveChat } from '../component/';
import * as Routes from './';

import { User } from '../service/';

import '../assets/scss/App.scss';

function PageFrame (props) {

	const Component = props.component;

	return (
		<>
			<Nav />
			<Component />
			<LiveChat />
			<Footer />
		</>
	);

}

function App () {

	const [ userAuth, setUserAuth ] = useState({
		status: 0,
		data: {},
	});

	const setUserAuthFN = (status, data) => setUserAuth({ status, data });

	const windowDimensions = useWindowDimensions();

	// 520

	return (
		<User.Context.Provider value={{ userAuth, setUserAuthFN }}>
			{windowDimensions.width > 1300 ? (
			<div className="app">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" render={() => <PageFrame component={Routes.Home} />} />
						<Route exact path="/about" render={() => <PageFrame component={Routes.About} />} />
						<Route exact path="/Inbox" render={() => <PageFrame component={Routes.Inbox} />} />
						<Route exact path="/promotions" render={() => <PageFrame component={Routes.Promotions} />} />
						<Route exact path="/promotion/:id" render={() => <PageFrame component={Routes.Promotion} />} />
						<Route exact path="/applications" render={() => <PageFrame component={Routes.Applications} />} />
						<Route exact path="/game/:id/:name" render={() => <PageFrame component={Routes.Game} />} />
						<Route exact path="/dashboard/:tab" render={() => <PageFrame component={Routes.Dashboard} />} />
						<Route exact path="/login" component={Routes.Login} />
						<Redirect to="/" />
					</Switch>
				</BrowserRouter>
			</div>
			) : (
			<AppPWA />
			)}
		</User.Context.Provider>
	);

}

export default App;
