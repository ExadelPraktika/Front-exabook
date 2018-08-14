import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

const drawerWidth = 300;
const avatarPic = "https://api.adorable.io/avatars/50/abott@adorable.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "fixed",
    display: "flex"
  },
  drawerPaper: {
    position: "static",
    width: drawerWidth,
    //marginTop: 100
  },
  avatar: {
    height: "50px"
  },
  test: {
    position: "absolute",
    align: "center",
    left: 90,
  }
});

class ClippedDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/*<div className={classes.test}>
          <p>UserName</p>
        </div>*/}
        <div>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <Tab1 />

            <Tab2 />
          </Drawer>
        </div>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClippedDrawer);
