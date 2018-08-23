import React from "react";
import { connect } from "react-redux";
import { getEvent } from "../../../actions/eventActions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import { goingEvent, ungoingEvent } from "../../../actions/eventActions";
import {
  LocationOn,
  LockOutline,
  LocationCity,
  MyLocation,
  SupervisorAccount,
  Schedule
} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import CommentBox from "./Comment-Feed/CommentBox";
import CommentFeed from "./Comment-Feed/CommentFeed";
import Map from "./Map/Map";
import Moment from "react-moment";
import GoingList from "./GoingList/GoingList";

import "moment-timezone";

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
    <Typography component="div" dir={dir} style={{}}>
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
    width: "500px",
    height: "950"
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
  monthName: {
    fontSize: 25,
    color: "red"
  },
  dayNumber: {
    fontSize: 35
  },

  commentContainer: {
    height: "400",
    overflow: "scroll"
  },
  img: {
    width: 500,
    height: 180
  },
  container: {
    flexGrow: 1,
    width: 500
  },
  calender: {
    textAlign: "center",
    paddingRight: "8%",
    paddingTop: "2%"
  },
  calender1: {
    textAlign: "left",
    paddingRight: "8%",
    paddingTop: "1.8%"
  },
  calender2: {
    textAlign: "right",
    paddingRight: "8%",
    paddingTop: "7%"
  },
  calender4: {
    textAlign: "center"
  },
  calender3: {
    paddingTop: "7%"
  },
  title: {
    paddingTop: "2%"
  },
  margintop: {
    marginBottom: 13
  },
  margintop1: {
    marginBottom: 17
  },
  center: {
    textAlign: "center",
    bottom: 0,
    textTransform: "lowercase"
  },
  middle: {
    paddingLeft: "35%"
  },
  button: {
    position: "absolute",
    top: "20%",
    left: "80%"
  }
});

class EventDisplay extends React.Component {
  state = {
    open: true,
    anchorEl: null,
    open1: false,
    value: 0,
    show: false,
    vaa: {},
    fullevent: {},
    scroll: "paper"
  };
  componentDidMount() {
    this.props.getEvent(this.props.eventid);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      vaa: nextProps.event.event
    });
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

  redirectToComments = () => {
    this.setState({ value: 1 });
  };
  redirectToComments1 = () => {
    this.setState({ value: 2 });
  };
  handleClick = () => {
    this.setState(state => ({ show: !state.show }));
  };
  userExists = user => {
    return this.props.event.event.going.some(function(el) {
      return el.user._id === user;
    });
  };
  onGoingClick(id, idas, l) {
    this.props.goingEvent(id, idas, l);
  }
  onUnGoingClick(id, idas, l) {
    this.props.ungoingEvent(id, idas, l);
  }
  render() {
    const { classes, theme } = this.props;
    const { event } = this.props.event;
    const { show } = this.state;
    let goingButton;
    if (Object.keys(this.state.vaa).length) {
      if (this.userExists(this.props.auth.user._id)) {
        goingButton = (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onUnGoingClick.bind(
              this,
              this.props.auth.user._id,
              event._id,
              true
            )}
          >
            Going
          </Button>
        );
      } else {
        goingButton = (
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.onGoingClick.bind(
              this,
              this.props.auth.user._id,
              event._id,
              true
            )}
          >
            Going
          </Button>
        );
      }
    } else {
      return null;
    }
    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "YYYY-MM-DD HH:mm"
    };

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
                  <Tab label="Info" />
                  <Tab label="Discussion" />
                  <Tab label="Attending list" />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <div className={classes.container}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <img src={event.photo} className={classes.img} />
                        {goingButton}
                      </Grid>
                      <Grid item xs={4} className={classes.calender}>
                        <Typography variant="subheading" color="primary">
                          <Moment format="MMM" color="secondary">
                            {event.start}
                          </Moment>
                        </Typography>
                        <Typography variant="display1">
                          <Moment format="D">{event.start}</Moment>
                        </Typography>
                      </Grid>
                      <Grid item xs={8} className={classes.title}>
                        <Typography variant="display1">
                          {event.title}
                        </Typography>
                        <Typography variant="subheading">
                          created by:{" "}
                          {this.props.creator.method === "google"
                            ? this.props.creator.google.name
                            : this.props.creator.method === "facebook"
                              ? this.props.creator.facebook.name
                              : this.props.creator.method === "local"
                                ? this.props.creator.local.name
                                : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <hr />
                      </Grid>

                      <Grid item xs={4} className={classes.calender}>
                        <Typography variant="subheading" gutterBottom>
                          <Schedule color="primary" />
                        </Typography>
                      </Grid>
                      <Grid item xs={8} className={classes.calender1}>
                        <Typography
                          variant="subheading"
                          gutterBottom
                          className={classes.margintop}
                        >
                          <Moment calendar={calendarStrings}>
                            {event.start}
                          </Moment>
                        </Typography>
                      </Grid>

                      <Grid item xs={4} className={classes.calender}>
                        <Typography variant="subheading" gutterBottom>
                          <LocationOn color="primary" />
                        </Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.calender1}>
                        <Typography
                          variant="subheading"
                          gutterBottom
                          className={classes.margintop}
                        >
                          {/* {Object.keys(this.state.vaa).length
                            ? event.location
                                .split(",")
                                .slice(0, 3)
                                .join(", ")
                            : null} */}
                                          {event.location.length > 25 ? (
                <Tooltip title={event.location} placement="top">
                  <span>
                    {event.location.replace(/^(.{25}[^\s]*).*/, "$1") + "..."}
                  </span>
                </Tooltip>
              ) : (
                <span>
                {event.location}
                </span>
              )}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.calender}>
                        {!isNaN(event.coordLat) || !isNaN(event.coordLng) ? (
                          <Typography
                            onClick={this.handleClick}
                            variant="p"
                            gutterBottom
                            color="primary"
                            className={classes.margintop1}
                          >
                            {!show ? "show map" : "hide map"}
                          </Typography>
                        ) : null}
                      </Grid>
                      {show ? (
                        <Grid className={classes.middle} item xs={12}>
                          {Object.keys(this.state.vaa).length ? (
                            <Map
                              lat={event.coordLat}
                              lng={event.coordLng}
                              isMarkerShown
                            />
                          ) : null}
                        </Grid>
                      ) : null}
                      <Grid item xs={4} className={classes.calender}>
                        <Typography variant="subheading" gutterBottom>
                          <SupervisorAccount color="primary" />
                        </Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.calender1}>
                        <Typography
                          variant="subheading"
                          className={classes.margintop}
                        >
                          {!this.props.event.event.going
                            ? null
                            : this.props.event.event.going.length}{" "}
                          People going
                        </Typography>
                      </Grid>
                      <Grid item xs={4} className={classes.calender}>
                        <Typography
                          variant="p"
                          gutterBottom
                          color="primary"
                          className={classes.margintop1}
                          onClick={this.redirectToComments1}
                        >
                          show list
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <hr />
                      </Grid>
                      <Grid item xs={12} className={classes.calender4}>
                        <Typography variant="subheading" gutterBottom>
                          Details
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.calender4}>
                        <Typography variant="subheading" gutterBottom>
                          {event.description.length > 0
                            ? event.description
                            : "no details of the event..."}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className={classes.center}>
                        <Button
                          className={classes.center}
                          onClick={this.redirectToComments}
                        >
                          {" "}
                          see discussion{" "}
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </TabContainer>

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
                <TabContainer dir={theme.direction}>
                  <br />
                  <br />
                  <Grid container spacing={0}>
                    <Grid item xs={4} />
                    <Grid item xs={8}>
                      <FormLabel>People that are going</FormLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <GoingList event={event} />
                    </Grid>
                  </Grid>
                </TabContainer>
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

export default connect(
  mapStateToProps,
  { getEvent, goingEvent, ungoingEvent }
)(withStyles(styles, { withTheme: true })(EventDisplay));
