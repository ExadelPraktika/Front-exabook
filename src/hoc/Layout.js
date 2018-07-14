import React, { Component } from 'react';
import SideBar from '../components/sidebar/SideBar';
import TopBar from '../components/Topbar/Topbar'
import Grid from '@material-ui/core/Grid';

class Layout extends Component {


  render() {
    const style = {
      maginTop: 200,
    };
    return (
      <div>
        <TopBar />
        <Grid container spacing={8} style={style}>
          <Grid item xs = {2}>
            <SideBar />
          </Grid>
          <Grid item xs>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Layout;