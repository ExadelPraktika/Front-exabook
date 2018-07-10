import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/es/Avatar/Avatar";

const styles = {
    root: {
        flexGrow: 1,
    },
    avatar: {
        margin: 10,
        marginLeft: 300
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
    },
    home: {
        marginLeft: 100,
        marginRight: 250
    }
};

const ButtonAppBar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar >
                    <Button color="inherit" style={styles.home}>Home</Button>
                    <Button color="inherit" style={styles.button}>Events</Button>
                    <Button color="inherit" style={styles.button}>Groups</Button>
                    <Button color="inherit" style={styles.button}>Market</Button>
                    <Button color="inherit" style={styles.button}>Map</Button>
                    <div className={classes.row}>
                        <Avatar alt="Unknown" src="https://api.adorable.io/avatars/50/abott@adorable.png" className={classes.avatar} />
                    </div>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);