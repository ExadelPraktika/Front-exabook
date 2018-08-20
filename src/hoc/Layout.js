import React, { Component } from 'react';
import SideBar from '../components/sidebar/SideBar';
import TopBar from '../components/Topbar/Topbar'
import Grid from '@material-ui/core/Grid';

class Layout extends Component {

  render() {
    const styles = {
      style: {
        marginTop: 60,
        overflow: 'hidden'
      }
    };
    return (
      <div>
        <TopBar/>
        <Grid container spacing={6} style={styles.style}>
          <Grid item xs={3} >
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