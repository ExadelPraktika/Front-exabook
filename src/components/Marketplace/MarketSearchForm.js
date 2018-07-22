import React, { Component } from 'react';
import Card from "@material-ui/core/es/Card/Card";
import TextField from "@material-ui/core/es/TextField/TextField";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";

const styles = theme => ({
    textField: {
        margin: 10,
        width: 300,
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
    handleSearchClose = () => {
      this.props.handleClose();
    };

    render(){
        const { classes } = this.props;
        return(
            <Card>
              <div>
                <TextField
                  id="location"
                  label="Location"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="category"
                  label="Category"
                  type="category"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="limit"
                  label="Minimum price"
                  type="number"
                  style={{
                    margin: 10,
                    width: 150,
                  }}
                  inputProps={{
                    step: 10,
                  }}
                />
                <TextField
                  id="limit"
                  label="Max price"
                  type="number"
                  style={{
                    margin: 10,
                    width: 150,
                  }}
                  inputProps={{
                    step: 10,
                  }}
                />
              </div>
              <div>
                <TextField
                  id="search"
                  label="Search field"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                  <Button
                    className={classes.textField}
                    onClick={this.handleSearchClose}
                  >
                    <Typography variant={'button'}>
                      Search
                    </Typography>
                  </Button>
              </div>
            </Card>
        )
    }
}

MarketSearchForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MarketSearchForm);