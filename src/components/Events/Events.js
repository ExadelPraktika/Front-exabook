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
import Paper from '@material-ui/core/Paper';

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
    this.setState({
      messageShown: true
    });
  }
  handler2() {
    this.setState({
      messageShown: false
    });
  }
  getmyevents(id) {
    this.props.getuserEvents(id)
  }
  render() {
    const { events, loading } = this.props.event;
    let calender = <Calender style={{ marginLeft: '20%' }} />;
    let eventContent;
    if (events === null || loading) {
      eventContent = <Spinner />
    } else {
      eventContent = <EventFeed events={events}/>
    }
    return (
      <div>
      
        <Grid container spacing={16} >
        <Paper style={{marginBottom: 10, width: 1090, marginTop: 15, backgroundColor: '#d6d6d6'}}>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <div>
            <EventsMenu
              action={this.handler}
              action2={this.handler2} />
              </div>
              <div style={{marginTop: 20}}>
            <Button color="primary" className="upload-button" onClick={this.getmyevents.bind(this, this.props.auth.user._id)} >
              Get my events
        </Button>
            <Button color="primary" className="upload-button" onClick={() => this.props.getEvents()} >
              Get All events
        </Button>
        </div>
          </Grid>
          </Paper>
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
