import React, { Component } from 'react'
import PersonCard from './PersonCard'
class GoingList extends Component {
  render() {
    const { event } = this.props; 
    return event.going.map(going => <PersonCard key={going.user} user={going.user} />)
  }
}
export default GoingList;