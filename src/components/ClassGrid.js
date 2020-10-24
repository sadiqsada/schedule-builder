import React from "react";
import Class from "./Class";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	classGrid: {
		width: "70%",
		marginLeft: "10%",
    }
});

function ClassGrid(props) {
	const classes = useStyles();
	let i = 1;
	let classList = props.data;

    return (
        <Grid container className={classes.classGrid}>
			{classList.map(item => (
				<Class
					key = {i}
					count = {i++}
					classTitle = {item.classTitle}
					department = {item.department}
					classCode = {item.classCode}
					classNumber = {item.number}
					instructor = {item.instructor}
					startTime = {item.startTime}
					endTime = {item.endTime}
					days = {item.days}
				/>
			))}
		</Grid>
    );
}

export default ClassGrid;