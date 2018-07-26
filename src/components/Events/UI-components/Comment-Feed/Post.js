import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const dateFormat = require('dateformat');
const styles = {
  postContent: {
    marginLeft: '3%',
    paddingTop: '300',
    marginBottom: '5%',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
  },
  img: {
    width: 300,
    height: 260,
    float: 'left'
  },
  wrap: {
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    minHeight: 300
  }
}


class Post extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>

        <Paper elevation={1} className={classes.wrap}>
          <Typography variant="headline" component="h3">
            <CardHeader
              avatar={
                <Avatar aria-label="tautvydas buda" >
                  T
              </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title='tautuxsas sadsa'
              subheader={dateFormat(event.date, "dddd, mmmm dS, yyyy, h:MM TT")}
            />
          </Typography>
          <Typography className={classes.postContent} component="p">
            Paper can be used to build surface or other elements for your application.
          <img className={classes.img} src="https://superdevresources.com/wp-content/uploads/2015/02/material-design-icon-pack.png" />
          </Typography>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(Post);