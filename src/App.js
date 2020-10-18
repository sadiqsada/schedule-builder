import React from 'react';
import SearchBar from './components/SearchBar';
import Class from './components/Class';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	classGrid: {
		width: "70%",
		marginLeft: "10%",
		minHeight: "100vh"
	}
});

function App() {
	const classes = useStyles();
	return (
		<Container>
			<SearchBar />
			<Grid container className={classes.classGrid}>
				<Class />
			</Grid>
		</Container>
	);
}

export default App;
