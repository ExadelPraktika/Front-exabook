import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { getEvents, getuserEvents } from '../../../actions/eventActions'
import Spinner from '../../../utils/Spinner';
import EventsMenu from '../UI-components/EventsMenu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EventList from './EventsList';

class Calender extends Component {
  componentDidMount() {
    this.getmyevents.bind(this, this.props)
    
  }
  getmyevents(id){
    this.props.getuserEvents(id)
  }
  render() {
    const {events} = this.props.event;
    //this.props.getuserEvents(this.props.auth.user._id)
    // const {events, loading} = this.props.event;
    // let eventContent;
    // if(events === null || loading) {
    //   eventContent = <Spinner/>
    // } else {
    //   eventContent = <EventFeed events={events}/>
    // }
    return (

          <EventList style={{marginLeft: '2000'}} events={events}
          />
         

    )
  }
}
Calender.propTypes = {
  event: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, {getuserEvents })(Calender);
