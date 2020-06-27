import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import * as Views from './view/';
import { MenuSA } from './component/';

import './assets/scss/App.scss';

const PageFrame = (props) => {

	const Component = props.component;

	return (
		<>
			<Component {...props} />
			<MenuSA />
		</>
	);

}

const AppPWA = () => {

	useEffect(() => {

		document.body.classList.add('body-pwa');

		return () => document.body.classList.remove('body-pwa');

	}, []);

	return (
		<div className="app-sa">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={props => <PageFrame {...props} component={Views.Home} />} />
					<Route exact path="/promotions" render={() => <PageFrame component={Views.Promotions} />} />
					<Route exact path="/promotion/:id" render={() => <PageFrame component={Views.Promotion} />} />
					<Route path="/profile" render={() => <PageFrame component={Views.Profile} />} />
					<Route exact path="/login" component={Views.Login} />
					<Route exact path="/game/:id/:name" component={Views.Game} />
					<Route exact path="/inbox" component={Views.Inbox} />
					<Route exact path="/about" component={Views.About} />
					<Redirect to="/" />
				</Switch>
			</BrowserRouter>
		</div>
	);

}

export default AppPWA;
