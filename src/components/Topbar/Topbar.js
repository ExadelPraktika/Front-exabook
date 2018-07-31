import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ProfileOptions from '../../utils/profileOptions'
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
        marginLeft: 60,
        marginRight: 250
    }
};

const TopBar = props => {
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
                        <ProfileOptions className={classes.avatar} />
                    </div>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);