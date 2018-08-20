import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import { Link } from "react-router-dom";
import ProfileOptions from "../../utils/profileOptions";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    display: "flex",
    flexGrow: 1
  },
  topbar: {
    //justifyContent: "center"
  },
  avatar: {
    marginLeft: '30%'
  },
  button: {
    marginLeft: '3%'
  },
  home: {
      marginLeft: "10%",
      marginRight: "45%"
  }
};

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar style={styles.topbar}>
          <Toolbar>
              <Grid item xs>
                <Button
                  color="inherit"
                  className={classes.home}
                  component={Link}
                  to="/dashboard"
                >
                  Home
                </Button>

                <Button
                  color="inherit"
                  className={classes.button}
                  component={Link}
                  to="/events"
                >
                  Events
                </Button>

                <Button
                  color="inherit"
                  className={classes.button}
                  component={Link}
                  to="/marketplace"
                >
                  Market
                </Button>

                <Button
                  color="inherit"
                  className={classes.button}
                  component={Link}
                  to="/dashboard"
                >
                  Feed
                </Button>
                </Grid>
                <div className={classes.avatar}>
                <ProfileOptions  />
                </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);
