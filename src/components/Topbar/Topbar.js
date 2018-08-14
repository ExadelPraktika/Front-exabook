import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import {Link} from "react-router-dom";
import ProfileOptions from '../../utils/profileOptions';

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
    },
    topbar: {
        position: 'fixed',
    }
};

class TopBar extends Component {
    render() {
      const {classes} = this.props;
      return (
        <div className={classes.root}>
          <AppBar  style={styles.topbar}>
            <Toolbar>
              <Button color="inherit" className={classes.home} component={Link} to="/dashboard">Home</Button>
              <Button color="inherit" className={classes.button} component={Link} to="/events">Events</Button>
              <Button color="inherit" className={classes.button}>Groups</Button>
              <Button color="inherit" className={classes.button} component={Link} to="/marketplace">Market</Button>
              <Button color="inherit" className={classes.button}>Map</Button>
              <div style={{marginLeft: 30}}>
                <ProfileOptions className={classes.avatar} />
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);