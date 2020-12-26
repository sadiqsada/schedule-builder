import React from 'react';

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