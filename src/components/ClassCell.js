import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

function ClassCell(props) {
    props = props.data;
    return (
        <div>
            {props.department} {props.classCode}-{props.number}
            <br />
            {props.instructor}
            <br />
            {props.startTime} - {props.endTime}
            <br />
            {props.building} - {props.room}
        </div>
    )
}

export default ClassCell;