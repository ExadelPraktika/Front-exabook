import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/EventNote';
import LocationOnIcon from '@material-ui/icons/Add';
import AlertDialog from './AlertDialog'
const styles = {
  root: {
    width: 500,
    marginTop: '2%',
    marginBottom: '2%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'

  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
      
        <BottomNavigationAction label="Upcoming events" onClick={this.props.action2}icon={<RestoreIcon />} />
        <BottomNavigationAction label="Events Calender" onClick={this.props.action} icon={<FavoriteIcon />} />
        <AlertDialog  label="Add event"/> 
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);