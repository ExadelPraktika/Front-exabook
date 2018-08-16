import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import EventForm from './EventForm';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getEvents, getuserEvents } from '../../actions/eventActions'
import Spinner from '../../utils/Spinner';
import EventsMenu from './UI-components/EventsMenu';
import EventFeed from './EventFeed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AlertDialog from './UI-components/AlertDialog';
import Calender from './EventsCalender/Calender'
import io from 'socket.io-client';
// var socket = io.connect('http://localhost:3001');



// var socket = io.connect('http://localhost', {port: 3001});

// socket.on('connect', function (data) {
//     socket.emit('storeClientInfo', { customId:"000CustomIdHere0000" });
// });
// socket.emit('join', {email: 'vaflis'});

// socket.on("new_msg", function(data) {
//   alert(data.msg);
//   console.log(data.msg)
// })

// window.addEventListener('scroll', function(event){
//   //you may want to add some conditions first...
//   socket.emit('chat message', 'content');
// })
class Events extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.handler2 = this.handler2.bind(this);

    // Set some state
    this.state = {
      messageShown: false
    };
  }
  componentDidMount() {
    this.props.getEvents();

  }
  handler() {
    console.log('clicked')
    this.setState({
      messageShown: true
    });
  }
  handler2() {
    console.log('clicked antras')
    this.setState({
      messageShown: false
    });
  }
  getmyevents(id) {
    this.props.getuserEvents(id)
  }
  render() {
    //this.props.getuserEvents(this.props.auth.user._id)
    const { events, loading } = this.props.event;
    let calender = <Calender style={{ marginLeft: '20%' }} />;
    let eventContent;
    if (events === null || loading) {
      eventContent = <Spinner />
    } else {
      eventContent = <EventFeed events={events} />
    }
    return (
      <div>

        <Grid container spacing={8} >
          <Grid item xs={12}>
            <EventsMenu
              action={this.handler}
              action2={this.handler2} />
            <Button variant="outlined" color="primary" className="upload-button" onClick={this.getmyevents.bind(this, this.props.auth.user._id)} >
              Get my events
        </Button>
            <Button variant="outlined" color="primary" className="upload-button" onClick={() => this.props.getEvents()} >
              Get All events
        </Button>
          </Grid>
          <Grid container spacing={8}>
            {!this.state.messageShown ? eventContent : calender}
          </Grid>
        </Grid>
      </div>
    )
  }
}
Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, { getEvents, getuserEvents })(Events);
