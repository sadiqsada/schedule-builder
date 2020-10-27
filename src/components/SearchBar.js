import React, { useState } from 'react';
import { Container, Grid, MenuItem, Select, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import firebase from './Firebase/firebase';
import ClassGrid from './ClassGrid';

const useStyles = makeStyles({
    notSearchItem: {
        marginTop: "26px"
    },
    searchItem: {
        marginTop: "10px",
        marginBottom: "30px"
    }
});

function SearchBar() {
    const [searchTag, setSearchTag] = useState("All Fields");
    const [searchField, setSearchField] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const classes = useStyles();

    const handleTagChange = (event) => {
        setSearchTag(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearchField(event.target.value);
    }
    
    const handleSubmit = () => {
        const database = firebase.database();
        let tempSearchResults = [];
        let count = 0;

        if(searchTag === "Instructor") {
            for(let i = 1; i <= 100; i++) {
                let keyString = "course " + i;
                let ref = database.ref("Classes").child(keyString);
                ref.once('value').then(snap => {
                    count++;
                    let val = snap.val().instructor;
                    val = val.toLowerCase();
                    val = val.replace(/\s+/g, '');
                    if(val.includes(searchField.toLowerCase().replace(/\s+/g, ''))) {
                        tempSearchResults.push(snap.val());
                    }
                    if(count === 100) {
                        setSearchResults(tempSearchResults);
                        count = 0;
                        tempSearchResults = [];
                    }
                });
            }
        }
        else if(searchTag === "Subject") {
            for(let i = 1; i <= 100; i++) {
                let keyString = "course " + i;
                let ref = database.ref("Classes").child(keyString);
                ref.once('value').then(snap => {
                    count++;
                    let val = snap.val().department;
                    val = val.toLowerCase();
                    val = val.replace(/\s+/g, '');
                    if(val.includes(searchField.toLowerCase().replace(/\s+/g, ''))) {
                        tempSearchResults.push(snap.val());
                    }
                    if(count === 100) {
                        setSearchResults(tempSearchResults);
                        count = 0;
                        tempSearchResults = [];
                    }
                });
            }
        }
        else if(searchTag === "Course Title") {
            for(let i = 1; i <= 100; i++) {
                let keyString = "course " + i;
                let ref = database.ref("Classes").child(keyString);
                ref.once('value').then(snap => {
                    count++;
                    let val = snap.val().classTitle;
                    val = val.toLowerCase();
                    val = val.replace(/\s+/g, '');
                    if(val.includes(searchField.toLowerCase().replace(/\s+/g, ''))) {
                        tempSearchResults.push(snap.val());
                    }
                    if(count === 100) {
                        setSearchResults(tempSearchResults);
                        count = 0;
                        tempSearchResults = [];
                    }
                });
            }
        }
        else if(searchTag === "Course") {
            for(let i = 1; i <= 100; i++) {
                let keyString = "course " + i;
                let ref = database.ref("Classes").child(keyString);
                ref.once('value').then(snap => {
                    count++;
                    let val1 = snap.val().department;
                    let val2 = snap.val().classCode;
                    let val = val1 + val2;
                    val = val.toLowerCase();
                    val = val.replace(/\s+/g, '');
                    if(val.includes(searchField.toLowerCase().replace(/\s+/g, ''))) {
                        tempSearchResults.push(snap.val());
                    }
                    if(count === 100) {
                        setSearchResults(tempSearchResults);
                        count = 0;
                        tempSearchResults = [];
                    }
                });
            }
        }
        else if(searchTag === "All Fields") {
            for(let i = 1; i <= 100; i++) {
                let keyString = "course " + i;
                let ref = database.ref("Classes").child(keyString);
                ref.once('value').then(snap => {
                    count++;
                    let val1 = snap.val().department;
                    let val2 = snap.val().classCode;
                    let val3 = snap.val().classTitle;
                    let val4 = snap.val().instructor;
                    let val5 = snap.val().startTime;
                    let val6 = snap.val().endTime;
                    let val7 = snap.val().days;
                    let val = val1 + val2 + val3 + val4 + val5 + val6 + val7;
                    val = val.toLowerCase();
                    val = val.replace(/\s+/g, '');
                    if(val.includes(searchField.toLowerCase().replace(/\s+/g, ''))) {
                        tempSearchResults.push(snap.val());
                    }
                    if(count === 100) {
                        setSearchResults(tempSearchResults);
                        count = 0;
                        tempSearchResults = [];
                    }
                });
            }
        }
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Grid
                    container
                    spacing={4}
                    display="flex"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={6} className={classes.searchItem}>
                        <TextField onChange={handleSearchChange} value={searchField} id="standard-basic" label="Search" fullWidth />
                    </Grid>
                    <Grid item xs={4} className={classes.notSearchItem}>
                        <Select
                            value={searchTag}
                            onChange={handleTagChange}
                            fullWidth
                        >
                            <MenuItem value="All Fields">All Fields</MenuItem>
                            <MenuItem value="Subject">Subject</MenuItem>
                            <MenuItem value="Course Title">Course Title</MenuItem>
                            <MenuItem value="Instructor">Instructor</MenuItem>
                            <MenuItem value="Course">Course</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={2} className={classes.notSearchItem}>
                        <Button onClick={handleSubmit} color="primary" variant="contained">Find</Button>
                    </Grid>
                </Grid>
                <ClassGrid data={searchResults}/>
            </Container>
        </div>
    );
}

export default SearchBar;