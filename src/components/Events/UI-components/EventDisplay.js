import React from "react";
import { connect } from "react-redux";
import { getEvent } from "../../../actions/eventActions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import CommentBox from "./Comment-Feed/CommentBox";
import CommentFeed from "./Comment-Feed/CommentFeed";
const dateFormat = require("dateformat");

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "600px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    height: "200"
  },
  paper: {
    position: "absolute",
    width: "300",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  div: {
    width: "300",
    height: "600"
  },
  commentContainer: {
    height: "300",
    overflow: "scroll"
  }
});

class EventDisplay extends React.Component {
  state = {
    open: true,
    value: 0,
    scroll: "paper"
  };
  componentDidMount() {
    this.props.getEvent(this.props.eventid);
    console.log("kazkas vyksta");
    console.log("id evento", this.props.eventid);
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes, theme } = this.props;
    const { event } = this.props.event;
    console.log(event);
    console.log(event.comments);
    let eventCreator;
    if (this.props.creator.method === "google") {
      eventCreator = this.props.creator.google.name;
    }
    if (this.props.creator.method === "local") {
      eventCreator = this.props.creator.local.name;
    }
    if (this.props.creator.method === "facebook") {
      eventCreator = this.props.creator.facebook.name;
    }
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label="General Info" />
                  <Tab label="Comment feed" />
                  <Tab label="Item Three" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>Item One</TabContainer>
                <TabContainer
                  dir={theme.direction}
                  className={classes.commentContainer}
                >
                  <CommentBox eventID={event._id} />
                  <List>
                    <CommentFeed
                      className={classes.root2}
                      comments={event.comments}
                      userID={this.props.auth.user._id}
                      eventID={event._id}
                    />
                  </List>
                </TabContainer>
                <TabContainer dir={theme.direction}>Item Three</TabContainer>
              </SwipeableViews>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

EventDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps,{ getEvent })(withStyles(styles, { withTheme: true })(EventDisplay));
