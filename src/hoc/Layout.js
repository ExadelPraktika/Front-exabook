import React, { Component } from 'react';
import SideBar from '../components/sidebar/SideBar';
import TopBar from '../components/Topbar/Topbar'
import Grid from '@material-ui/core/Grid';
import ChatList from '../components/Messaging/ChatComponents/ChatlistBar'

class Layout extends Component {

  render() {
    const style = {

    };
    return (
      <div>
        <TopBar />
        <Grid container spacing={8} style={style}>
          <Grid item xs = {3}>
            <SideBar />
          </Grid>
          <Grid item xs>
            {this.props.children}
            
          </Grid>
          <ChatList styles={{  position: 'sticky',
  bottom: 0, width: '40%'}}/>
        </Grid>
      </div>
    )
  }
}

export default Layout;