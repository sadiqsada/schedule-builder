import React from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Switch>
			<Route path="/" exact component={SearchBar} />
			<Route path="/schedule" component={Navbar} />
		</Switch>
	);
}

export default App;
