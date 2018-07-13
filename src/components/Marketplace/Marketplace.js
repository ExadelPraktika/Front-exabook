import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/es/Card/Card";
import red from "@material-ui/core/es/colors/red";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import TextField from "@material-ui/core/es/TextField/TextField";
import SearchIcon from '@material-ui/icons/Search';
import Poster from './Poster';

const styles = theme => ({
    grid: {
      marginLeft: 120
    },
    img: {
      width: 400,
      height: 225,
    },
    limiter: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
        left: 10
    },
    card: {
      maxWidth: 820,
      marginLeft: 150,
      margin: 10,
    },
    textField: {
        left: 10,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});


class Marketplace extends Component {
    constructor(props){
        super(props);

        this.state = {
            Location: '',
            Category: '',
            MinMax: 0,
            Search: ''
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <TextField
                        id="location"
                        label="Location"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="category"
                        label="Category"
                        type="category"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="limit"
                        label="Min-Max"
                        type="number"
                        defaultValue="0"
                        className={classes.limiter}
                        inputProps={{
                            step: 10,
                        }}
                    />
                    <TextField
                        id="search"
                        label="Search field"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Card>
                <Grid className = {classes.grid} container spacing = {16}>
                    <Poster/>
                    <Poster/>
                    <Poster/>
                    <Poster/>
                </Grid>
            </div>
        )
    }
}

Marketplace.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Marketplace);