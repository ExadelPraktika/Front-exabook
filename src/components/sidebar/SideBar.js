import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Tab1 from "./Tab1";

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
  },
  avatar: {
    height: "50px"
  }
});

class ClippedDrawer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <Tab1 />
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
