import React from 'react';
import SearchBar from './components/SearchBar';
import Schedule from './components/Schedule';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route path="/" exact component={SearchBar} />
			<Route path="/schedule" component={Schedule} />
		</Switch>
	);
}

export default App;
