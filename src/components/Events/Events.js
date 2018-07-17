import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import EventForm from './EventForm';
import Grid from '@material-ui/core/Grid';
import { getEvents } from '../../actions/eventActions'
import Spinner from '../../utils/Spinner';
import EventsMenu from './UI-components/EventsMenu';
import EventFeed from './EventFeed';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Events extends Component {
  componentDidMount() {
    this.props.getEvents();
  }
  

  render() {
    const {events, loading} = this.props.event;
    let eventContent;
    if(events === null || loading) {
      eventContent = <Spinner/>
    } else {
      eventContent = <EventFeed events={events}/>
    }
    return (
      <div>
        <Grid container spacing={8} >
          <Grid item xs={12}>
            <EventsMenu/>
          </Grid>
          <Grid  container spacing = {8}>
            <EventForm/>
            {eventContent}
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

export default connect(mapStateToProps, { getEvents })(Events);
