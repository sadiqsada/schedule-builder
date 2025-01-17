import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import ClassCell from './ClassCell';
import firebase from './Firebase/firebase';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#192A56',
    minHeight: '92vh',
  },
  rowGridInit: {
    height: '8vh',
    display: 'flex',
    direction: 'row',
    backgroundColor: '#AE1438',
    justify: 'center',
    alignItems: 'center',
  },
  rowGrid: {
    height: '84vh',
    width: '100vw',
    display: 'flex',
    direction: 'column',
  },
  rowItem: {
    // backgroundColor: "#AE1438",
    backgroundColor: '#757de8',
    textAlign: 'center',
    fontWeight: 500,
    border: '1px solid black',
  },
  columnGridInit: {
    height: '8vh',
    marginTop: '2.5vh',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
  },
  columnGrid: {
    height: '84vh',
  },
});

function sortClassesHelper(timeList, state) {
  timeList.sort((item1, item2) => item1 - item2);
  let copyState = [];
  let boolean = [];
  timeList.forEach((time) => {
    let currentTime = time;
    state.forEach((classItem, index) => {
      let classArr = classItem.startTime.split(' ');

      let time = classArr[0];
      let startTime = time.split(':');
      let hours = startTime[0];
      hours = parseInt(hours);
      let minutes = startTime[1];
      minutes = parseInt(minutes);

      let section = classArr[1]; // am/pm
      let intTime = convertToIntTime(hours, minutes, section);

      if (currentTime === intTime && boolean[index] === undefined) {
        copyState.push(classItem);
        boolean[index] = -1;
      }
    });
  });
  state = copyState;
  return state;
}

function sortClasses(state) {
  let timeList = [];

  state.forEach((classItem) => {
    let classArr = classItem.startTime.split(' ');

    let time = classArr[0];
    let startTime = time.split(':');
    let hours = startTime[0];
    hours = parseInt(hours);
    let minutes = startTime[1];
    minutes = parseInt(minutes);

    let section = classArr[1]; // am/pm
    let intTime = convertToIntTime(hours, minutes, section);

    timeList.push(intTime);
  });

  state = sortClassesHelper(timeList, state);
  return state;
}

function convertToIntTime(hours, minutes, section) {
  minutes = minutes + hours * 60;
  if (section === 'AM' && hours === 12) {
    minutes -= 12 * 60;
  }
  if (section === 'PM' && hours < 12) {
    minutes += 12 * 60;
  }
  return minutes;
}

function Schedule() {
  const classes = useStyles();
  const db = firebase.database();

  const [gridState, setGridState] = useState({
    monState: [],
    tueState: [],
    wedState: [],
    thuState: [],
    friState: [],
  });

  useEffect(() => {
    const ref = db.ref('Schedule');
    const listener = ref.on('value', (snap) => {
      let tempMonState = [];
      let tempTueState = [];
      let tempWedState = [];
      let tempThuState = [];
      let tempFriState = [];
      snap.forEach((childSnap) => {
        let currentClass = childSnap.val();
        let days = currentClass.days;
        if (days.includes('M')) tempMonState.push(currentClass);
        if (days.includes('TU')) tempTueState.push(currentClass);
        if (days.includes('W')) tempWedState.push(currentClass);
        if (days.includes('TH')) tempThuState.push(currentClass);
        if (days.includes('F')) tempFriState.push(currentClass);
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
        friState: tempFriState,
      });
    });
    return () => ref.off('value', listener);
  }, [db]);

  return (
    <div>
      <Navbar />
      <Grid className={classes.root}>
        <Grid className={classes.rowGridInit} item xs={12}>
          <Grid className={classes.columnGridInit} item xs={1}></Grid>
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
          <Grid className={classes.columnGridInit} item xs={1}></Grid>
        </Grid>
        <Grid item className={classes.rowGrid} xs={12}>
          <Grid item className={classes.columnGrid} xs={1}></Grid>

          <Grid item className={classes.columnGrid} xs={2}>
            {gridState.monState.map((classItem) => (
              <Grid key={classItem.classCode} item className={classes.rowItem}>
                <ClassCell data={classItem} />
              </Grid>
            ))}
            ;
          </Grid>
          <Grid item className={classes.columnGrid} xs={2}>
            {gridState.tueState.map((classItem) => (
              <Grid key={classItem.classCode} item className={classes.rowItem}>
                <ClassCell data={classItem} />
              </Grid>
            ))}
            ;
          </Grid>
          <Grid item className={classes.columnGrid} xs={2}>
            {gridState.wedState.map((classItem) => (
              <Grid key={classItem.classCode} item className={classes.rowItem}>
                <ClassCell data={classItem} />
              </Grid>
            ))}
            ;
          </Grid>
          <Grid item className={classes.columnGrid} xs={2}>
            {gridState.thuState.map((classItem) => (
              <Grid key={classItem.classCode} item className={classes.rowItem}>
                <ClassCell data={classItem} />
              </Grid>
            ))}
            ;
          </Grid>
          <Grid item className={classes.columnGrid} xs={2}>
            {gridState.friState.map((classItem) => (
              <Grid key={classItem.classCode} item className={classes.rowItem}>
                <ClassCell data={classItem} />
              </Grid>
            ))}
            ;
          </Grid>

          <Grid item className={classes.columnGrid} xs={1}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Schedule;
