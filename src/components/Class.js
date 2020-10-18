import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: "#192A56",
        height: "100px"
    },

    classInfo: {
        color: "white"
    },

    addButton: {
        marginTop: "15px",
        marginLeft: "25px"
    }
});

function Class() {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={2}
            display="flex"
            direction="row"
            justify="center"
            className={classes.root}
        >
            <Grid item xs={1}>
                <div className={classes.classInfo}> 1 </div>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.classInfo}>CSE 114, L02</div>
            </Grid>
            <Grid item xs={6}>
                <div className={classes.classInfo}>
                    <span>Intro to Object-Oriented Programming</span>
                    <br />
                    by <span>Tripathi, Praveen</span>     <span>Credit:</span> <span>4.0</span>
                    <br />
                    <span>Lab:</span> <span>MW 2:40pm - 4:00 pm</span>    <span>Lec:</span> <span>TUTH 8:00am-9:20am</span>
                    <br />
                    <span>Attr:</span> <span>TECH</span>
                </div>
            </Grid>
            <Grid item xs={2}>
                <Button className={classes.addButton} color="primary" variant="contained">Add</Button>
            </Grid>
        </Grid>
    );
}

export default Class;