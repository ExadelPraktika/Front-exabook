import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getuserEvents } from '../../../actions/eventActions'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import Filter from '../Filter/Filter'
class Calender extends Component {
  componentDidMount() {
    this.getmyevents.bind(this, this.props)

  }
  getmyevents(id) {
    this.props.getuserEvents(id)
  }
  render() {
    const { events } = this.props.event;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} >
      <Filter  events={events}/>
      </MuiPickersUtilsProvider>
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

export default connect(mapStateToProps, { getuserEvents })(Calender);
