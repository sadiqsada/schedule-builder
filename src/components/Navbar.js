import React from "react";
import { AppBar, Toolbar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#3f51b5",
        minHeight: "8vh",
        display: "flex",
        direction: "row",
    },

    gridItem: {
        "&:hover": {
            backgroundColor: "#AE1438"
        }
    },

    linkTag: {
        textDecoration: "none",
    },

    typography: {
        marginTop: "0.7rem",
        fontSize: "1.4rem",
        color: "white",
        fontWeight: "500",
        "&:hover": {
            cursor: "pointer",
        }

    }
});

function Navbar() {
    const classes = useStyles();
    return (
        <Grid
            container
            className={classes.root}
        >
            <Grid item xs={6} className={classes.gridItem}>
                <Link className={classes.linkTag} to="/">
                    <Typography align="center" className={classes.typography}>Search Classes</Typography>
                </Link>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
                <Link className={classes.linkTag} to="/schedule">
                  <Typography align="center" className={classes.typography}>View Schedule</Typography>
                </Link>
            </Grid>
        </Grid>
    );
}

export default Navbar;
