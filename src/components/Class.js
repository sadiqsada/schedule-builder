import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './Firebase/firebase';
import { useHistory } from 'react-router-dom';

const db = firebase.database();

const useStyles = makeStyles({
    root: {
        background: "#192A56",
        height: "16vh"
    },

    classInfo: {
        color: "white",
    },

    addButton: {
        marginTop: "15px",
        marginLeft: "1em"
    }
});

function Class(props) {
    const classes = useStyles();
    const history = useHistory();
    
    const handleAdd = () => {
        db.ref("Classes").once("value").then(snap => {
            snap.forEach(childSnap => {
                let currentChild = childSnap.val();
                if(currentChild.department === props.department && currentChild.classCode === props.classCode
                  && currentChild.number === props.classNumber) {
                    let newRef = db.ref("Schedule").push();
                    newRef.set(currentChild);
                }
            });
        });

        history.push("/schedule");
    }

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
                <div className={classes.classInfo}> {props.count} </div>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.classInfo}>{props.department} {props.classCode}, {props.classNumber}</div>
            </Grid>
            <Grid item xs={6}>
                <Typography className={classes.classInfo}>
                    <span>{props.classTitle}</span>
                    <br />
                    <span>Instructor: </span><span>{props.instructor}</span>
                    <br />
                    <span>Time:</span> <span>{props.startTime} - {props.endTime}</span> 
                    <br />
                    <span>Days:</span> <span>{props.days}</span>
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Button className={classes.addButton} color="primary" variant="contained" onClick={handleAdd}>Add</Button>
            </Grid>
        </Grid>
    );
}

export default Class;