import React from 'react';
import { connect } from 'react-redux';
import { getEvent } from '../../../actions/eventActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocationCity from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Comment from './Comment'
const dateFormat = require('dateformat');


function getModalStyle() {
  const top = 50;
  const left = 50;


  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    height: '200'
  },
  paper: {
    position: 'absolute',
    width: '300',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  div: {
    width: '300',
    height: '600'
  }
});

class EventDisplay extends React.Component {
  state = {
    open: true,
  };
  componentDidMount() {
    this.props.getEvent(this.props.eventid);
    console.log('kazkas vyksta')
    console.log('id evento', this.props.eventid)
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { event } = this.props.event
    console.log(event.creator)
    let eventCreator;
    if (this.props.creator.method === 'google') {
      eventCreator = this.props.creator.google.name
    }
    if (this.props.creator.method === 'local') {
      eventCreator = this.props.creator.local.name
    }
    if (this.props.creator.method === 'facebook') {
      eventCreator = this.props.creator.facebook.name
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
            <CardHeader
              avatar={
                <Avatar aria-label={this.state.isgoing} className={classes.avatar}>
                  T
              </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={eventCreator}
              subheader={dateFormat(event.date, "dddd, mmmm dS, yyyy, h:MM TT")}
            />
            {/* <CardMedia
              className={classes.media}

              image={event.photo !== '' ? event.photo : 'http://www.womenshealthapta.org/wp-content/plugins/wp-blog-manager-lite/images/no-image-available.png'}
              title="Contemplative Reptile"
            /> */}
            <CardContent>
                <Comment/>
              <Typography component="p">
                <strong>{event.title}</strong><br />
                starts: {dateFormat(event.start, "dddd, mmmm dS, yyyy, h:MM TT")}<br />
                ends: {dateFormat(event.end, "dddd, mmmm dS, yyyy, h:MM TT")}<br />
                <Button onClick={this.handleClick}>More info</Button>
                {event.location}<LocationCity /><br />
              </Typography>
            </CardContent>
            <Typography variant="title" id="modal-title">
              {event.title}
            </Typography>

            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non cossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssmmodo luctus, nisi erat porttitor ligula.
            </Typography>
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
  event: state.event
});


export default connect(mapStateToProps, { getEvent })(withStyles(styles)(EventDisplay));