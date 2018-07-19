import React, { Component } from 'react';
import Card from "@material-ui/core/es/Card/Card";
import TextField from "@material-ui/core/es/TextField/TextField";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme => ({
    card: {
        maxWidth: 820,
        marginLeft: 150,
        margin: 10,
    },
    textField: {
        left: 50,
        width: 200,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class MarketSearchForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            Location: '',
            Category: '',
            MinMax: 0,
            Search: ''
        }
    }

    render(){
        const { classes } = this.props;
        return(
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
                    className={classes.textField}
                    style={{width: 100}}
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
                <IconButton style={{left: 50}}>
                    <SearchIcon/>
                </IconButton>
            </Card>
        )
    }
}

MarketSearchForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MarketSearchForm);