import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import EventCard from './UI-components/EventCard'
import { getEvents } from '../../actions/eventActions'
class EventItem extends Component {
  
  render() {
    const { event, auth } = this.props;
    let eventCreator;
    if (event.creator.method === 'google') {
      eventCreator = event.creator.google.name
    }
    if (event.creator.method === 'local') {
      eventCreator = event.creator.local.name
    }
    if (event.creator.method === 'facebook') {
      eventCreator = event.creator.facebook.name
    }

    function userExists(user) {
      return event.going.some(function (el) {
        return el.user._id === user;
      });
    }
    const goingEvent = () => {
      axios
        .post('http://localhost:3001/events/going/' + auth.user._id + '/' + event._id)
        .then(response => {
           this.props.getEvents();
          console.log(response)
        }).catch(error => {
          console.log(error.response.data);
        })
    }
    const unGoingEvent = () => {
      axios
        .post('http://localhost:3001/events/ungoing/' + auth.user._id + '/' + event._id)
        .then(response => {
          this.props.getEvents();
          console.log(response)
        }).catch(error => {
          console.log(error.response.data);
        })
    }
    const deleteEvent = () => {
      axios
        .delete('http://localhost:3001/events/' + auth.user._id + '/' + event._id)
        .then(response => {
          this.props.getEvents();
          console.log(response)
        }).catch(error => {
          console.log(error.response.data);
        })
    }

    return (

      <EventCard
        deleteEvent={deleteEvent}
        goingEvent={goingEvent}
        unGoingEvent={unGoingEvent}
        eventID={event._id}
        title={event.title}
        creator={event.creator}
        eventCreator={eventCreator}
        description={event.description}
        start={event.start}
        end={event.end}
        photo={event.photo}
        date={event.date}
        going={event.going}
        userid={auth.user._id}
        isgoing={userExists(auth.user._id)}
      />
    )
  }
}

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {getEvents})(EventItem);
