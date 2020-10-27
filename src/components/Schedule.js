import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import ClassCell from './ClassCell';
import firebase from './Firebase/firebase';

const useStyles = makeStyles({ 
    root: {
        backgroundColor: "#192A56",
        minHeight: "92vh"
    },
    rowGridInit: {
        height: "8vh",
        display: "flex",
        direction: "row",
        backgroundColor: "#AE1438",
        justify: "center",
        alignItems: "center"
    },
    rowGrid: {
        height: "84vh",
        width: "100vw",
        display: "flex",
        direction: "column"
    },
    rowItem: {
        // backgroundColor: "#AE1438",
        backgroundColor: "#757de8",
        textAlign: "center",
        fontWeight: 500,
        border: "1px solid black"
    },
    columnGridInit: {
        height: "8vh",
        marginTop: "2.5vh",
        textAlign: "center",
        fontSize: "1.5rem",
        fontWeight: 500,
        color: "white"
    },
    columnGrid: {
        height: "84vh",
    },
});

function sortClassesHelper(amList) {
    // sort the classes separately
    let amIntList = [];
    amList.forEach(classItem => {
        let classArr = classItem.startTime.split(" ");
        let startTime = classArr[0].split(":"); // ["10", "20"], getting rid of the colon in between
        startTime = startTime[0] + startTime[1]; // "1020"
        startTime = parseInt(startTime) // 1020
        amIntList.push(startTime);
    });

    // sort list
    for(let i = 0; i < amIntList.length - 1; i++) {
        for(let j = 1; j < amIntList.length; j++) {
            if(amIntList[i] > amIntList[j]) {
                [amIntList[j], amIntList[i]] = [amIntList[i], amIntList[j]]; // swapping
                [amList[j], amList[i]] = [amList[i], amList[j]]; // swapping initial list
            }
        }
    }

    return amList;
}

function sortClasses(state) {
    // first, separate the state into am classes and pm classes
    let amList = [];
    let pmList = [];
    state.forEach(classItem => {
        let classArr = classItem.startTime.split(" ");
        let section = classArr[1]; // taking the am/pm part
        if(section === "AM") amList.push(classItem);
        if(section === "PM") pmList.push(classItem);
    });

    amList = sortClassesHelper(amList); 
    pmList = sortClassesHelper(pmList);

    state = amList.concat(pmList);
    return state;
}


function Schedule() {
    const classes = useStyles();

    const [gridState, setGridState] = useState({
        monState: [],
        tueState: [],
        wedState: [],
        thuState: [],
        friState: []
    })

    useEffect(() => {
        const ref = firebase.database().ref("Schedule");
        const listener = ref.on('value', snap => {
            let tempMonState = [];
            let tempTueState = [];
            let tempWedState = [];
            let tempThuState = [];
            let tempFriState = [];
            snap.forEach(childSnap => {
                let currentClass = childSnap.val();
                let days = currentClass.days;
                if(days.includes("M")) tempMonState.push(currentClass);
                if(days.includes("TU")) tempTueState.push(currentClass);
                if(days.includes("W")) tempWedState.push(currentClass);
                if(days.includes("TH")) tempThuState.push(currentClass);
                if(days.includes("F")) tempFriState.push(currentClass);
            });

            tempMonState = sortClasses(tempMonState);
            tempTueState = sortClasses(tempTueState);
            tempWedState = sortClasses(tempWedState);
            tempThuState = sortClasses(tempThuState);
            tempFriState = sortClasses(tempFriState);

            setGridState({
                monState: tempMonState,
                tueState: tempTueState,
                wedState: tempWedState,
                thuState: tempThuState,
                friState: tempFriState
            });
        });
        return () => ref.off('value', listener);
    }, [firebase.database()]);

    return (
        <div>
            <Navbar />
            <Grid
                className = {classes.root}
            >
                <Grid className={classes.rowGridInit} item xs={12}>
                    <Grid className={classes.columnGridInit} item xs={1}>
                        
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={2}>
                        Monday
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={2}>
                        Tuesday
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={2}>
                        Wednesday
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={2}>
                        Thursday
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={2}>
                        Friday
                    </Grid>
                    <Grid className={classes.columnGridInit} item xs={1}>
                        
                    </Grid>
                </Grid>
                <Grid item className={classes.rowGrid} xs={12}>
                    <Grid item className={classes.columnGrid} xs={1}>

                    </Grid>

                    <Grid item className={classes.columnGrid} xs={2}>
                        {gridState.monState.map(classItem => 
                            <Grid key={classItem.classCode} item className={classes.rowItem}>
                                <ClassCell data={classItem} />
                            </Grid>
                        )};
                    </Grid> 
                    <Grid item className={classes.columnGrid} xs={2}>
                        {gridState.tueState.map(classItem => 
                            <Grid key={classItem.classCode} item className={classes.rowItem}>
                                <ClassCell data={classItem} />
                            </Grid>
                        )};
                    </Grid> 
                    <Grid item className={classes.columnGrid} xs={2}>
                        {gridState.wedState.map(classItem => 
                            <Grid key={classItem.classCode} item className={classes.rowItem}>
                                <ClassCell data={classItem} />
                            </Grid>
                        )};
                    </Grid> 
                    <Grid item className={classes.columnGrid} xs={2}>
                        {gridState.thuState.map(classItem => 
                            <Grid key={classItem.classCode} item className={classes.rowItem}>
                                <ClassCell data={classItem} />
                            </Grid>
                        )};
                    </Grid> 
                    <Grid item className={classes.columnGrid} xs={2}>
                        {gridState.friState.map(classItem => 
                            <Grid key={classItem.classCode} item className={classes.rowItem}>
                                <ClassCell data={classItem} />
                            </Grid>
                        )};
                    </Grid> 

                    <Grid item className={classes.columnGrid} xs={1}>

                    </Grid>

                </Grid>

            </Grid>
        </div>
    )
}

export default Schedule;