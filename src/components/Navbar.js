import React from "react";
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#3f51b5",
        minHeight: "8vh",
        display: "flex",
        direction: "row",
    },
    gridItem: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#AE1438"
        }
    },

    typography: {
        marginTop: "0.7rem",
        fontSize: "1.4rem",
        color: "white",
    }
});

function Navbar() {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.root}
        >
            <Grid item xs={6} fullWidth className={classes.gridItem}>
                <Typography align="center" className={classes.typography}>Search Classes</Typography>
            </Grid>
            <Grid item xs={6} fullWidth className={classes.gridItem}>
                <Typography align="center" className={classes.typography}>View Schedule</Typography>
            </Grid>
        </Grid>
    );
}

export default Navbar;
