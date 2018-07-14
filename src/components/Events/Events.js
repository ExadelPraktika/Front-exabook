import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import EventForm from './EventForm';
import { getEvents } from '../../actions/eventActions'
import Spinner from '../../utils/Spinner';

class Events extends Component {
  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    return (
      <div>
        <EventForm/>
        
        <h1>dusk</h1>
      </div>
    )
  }
}
Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, {getEvents})(Events);
