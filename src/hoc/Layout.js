import React, { Component } from 'react';
import SideBar from '../components/sidebar/SideBar';
import TopBar from '../components/Topbar/Topbar'
import Grid from '@material-ui/core/Grid';


class Layout extends Component {

  render() {
    const styles = {
      topbar: {
        position: 'fixed',
        top: 0
      },
      root: {
        height: '100vh',
        minHeight: '100vh',
        flexGrow: 1
      },
      style: {
        marginTop: 60
      }
    };
    return (
      <div style={styles.root}>
        <TopBar/>
        <Grid container spacing={8} style={styles.style}>
          <Grid item xs = {3}>
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