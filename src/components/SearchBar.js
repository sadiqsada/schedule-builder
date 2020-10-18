import React, { useState } from 'react';
import { Grid, MenuItem, Select, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    const classes = useStyles();

    const handleTagChange = (event) => {
        setSearchTag(event.target.value);
    }

    return (
        <Grid
            container
            spacing={4}
            display="flex"
            direction="row"
            justify="center"
        >
            <Grid item xs={6} className={classes.searchItem}>
                <TextField id="standard-basic" label="Search" fullWidth />
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
                <Button color="primary" variant="contained">Find</Button>
            </Grid>
        </Grid>
    );
}

export default SearchBar;