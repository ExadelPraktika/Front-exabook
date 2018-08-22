import React, { Component } from 'react'
import PropTypes from 'prop-types';
import EventCard from './UI-components/EventCard';
class EventFeed extends Component {
  render() {
    const { events } = this.props;
    return events.map(event => <EventCard key={event._id} event={event} />)
  }
}

EventFeed.propTypes = {
  events: PropTypes.array.isRequired
};

export default EventFeed;