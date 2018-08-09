
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import InfoIcon from "@material-ui/icons/Info";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import LocationCity from "@material-ui/icons/LocationOn";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AlertDialog from "./AlertDialog";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  deleteEvent,
  goingEvent,
  ungoingEvent
} from "../../../actions/eventActions";
const dateFormat = require("dateformat");
import EventDisplay from "./EventDisplay";
const styles = theme => ({
  card: {
    maxWidth: 420,
    minWidth: 330,
    float: "right",
    margin: "1%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  notShow: {
    display: "none"
  },
  marginRight: {
    marginRight: 20
  },
  margincard: {
    margin: "0.5%"
  }
});

class RecipeReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isgoing: this.props.isgoing,
      showModal1: false,
      name: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
componentDidMount() {
  const { event, auth } = this.props;

  let eventCreator;
  
  if (event.creator.method === "google") {
    eventCreator = event.creator.google.name;
  }
  if (event.creator.method === "local") {
    eventCreator = event.creator.local.name;
  }
  if (event.creator.method === "facebook") {
    eventCreator = event.creator.facebook.name;
  }
    this.setState({
      name: eventCreator
    })
}
  handleClick(event) {
    // switch the value of the showModal state
    this.setState({
      showModal1: !this.state.showModal1
    });
  }
  getComponent = () => {
    if (this.state.showModal1) {
      // show the modal if state showModal is true
      return (
        <EventDisplay
          eventid={this.props.event._id}
          creator={this.props.event.creator}
        />
      );
    } else {
      return null;
    }
  };
  userExists = user => {
    return this.props.event.going.some(function(el) {
      console.log(el.user._id === user);
      return el.user._id === user;
    });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  onDeleteClick(id, idas) {
    console.log("clicked", id, idas);
    this.props.deleteEvent(id, idas);
  }
  onGoingClick(id, idas) {
    console.log("clicked", id, idas);
    this.props.goingEvent(id, idas);
  }
  onUnGoingClick(id, idas) {
    console.log("clicked", id, idas);
    this.props.ungoingEvent(id, idas);
  }
  render() {
    const calendarStrings = {
      lastDay: "[Yesterday at] LT",
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[last] dddd [at] LT",
      nextWeek: "dddd [at] LT",
      sameElse: "YYYY-MM-DD HH:mm"
    };
    const { event, auth } = this.props;
    const { classes } = this.props;
    console.log(event.start);


    let goingButton;
    if (this.userExists(this.props.auth.user._id)) {
      goingButton = (
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.onUnGoingClick.bind(
            this,
            this.props.auth.user._id,
            event._id
          )}
        >
          Going
        </Button>
      );
    } else {
      goingButton = (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={this.onGoingClick.bind(
            this,
            this.props.auth.user._id,
            event._id
          )}
        >
          Going
        </Button>
      );
    }
    return (
      <div className={classes.margincard}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.marginRight}
            avatar={
              event.creator.avatar  ? <Avatar src={event.creator.avatar}/> : (<Avatar >
                {this.state.name ?this.state.name.charAt(0): null}
            </Avatar>)
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={this.state.name}
            subheader={<Moment fromNow>{event.date}</Moment>}
          />
          {this.getComponent()}
          <CardMedia
            className={classes.media}
            image={
              event.photo.length > 0
                ? event.photo
                : "http://www.womenshealthapta.org/wp-content/plugins/wp-blog-manager-lite/images/no-image-available.png"
            }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              <strong>{event.title}</strong>
              <br />
              starts: <Moment calendar={calendarStrings}>{event.start}</Moment>
              <br />
              ends: <Moment calendar={calendarStrings}>{event.end}</Moment>
              <br />
              going: {event.going.length}
              <br />
              {event.location.length > 30 ? (
                <Tooltip title={event.location} placement="top">
                  <span>
                    <LocationCity />
                    {event.location.replace(/^(.{30}[^\s]*).*/, "$1") + "..."}
                  </span>
                </Tooltip>
              ) : (
                <span>
                  <LocationCity />
                {event.location}
                </span>
              )}
              <br />
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {goingButton}
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            {/* <IconButton aria-label="Share">
              <ShareIcon />
              
            </IconButton> */}
            <IconButton onClick={this.handleClick}>
              <InfoIcon />
            </IconButton>
            {/* <Button onClick={this.handleClick}>More info</Button> */}
            {event.creator._id === auth.user._id ? (
              <Button
                variant="contained"
                color="secondary"
                className={styles.notShow}
                onClick={this.onDeleteClick.bind(
                  this,
                  this.props.auth.user._id,
                  event._id
                )}
              >
                Delete
              </Button>
            ) : null}

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Events Description:
              </Typography>
              <Typography paragraph>{event.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  deleteEvent: PropTypes.func.isRequired,
  goingEvent: PropTypes.func.isRequired,
  ungoingEvent: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

//export default withStyles(styles)(RecipeReviewCard);
export default connect(
  mapStateToProps,
  { deleteEvent, goingEvent, ungoingEvent }
)(withStyles(styles)(RecipeReviewCard));