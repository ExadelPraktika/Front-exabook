import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FriendItem from "../FriendList/FriendItem";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FolderIcon from "@material-ui/icons/Folder";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendFriendReq } from '../../../actions/friendActions';

class FriendList extends Component {
  state = {
    isHovered: false,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    console.log('lala')
  };

handleEnter() {
  this.setState({
    isHovered: true 
  });
}

handleLeave() {
  this.setState({
    isHovered: false 
  });
}
  render() {
    return (
      <div>
      <ListItem button style={{paddingLeft: '20px', minWidth: '250px', paddingTop: '0px', paddingBot: '0px', marginBot: '20px'}} onClick={this.handleClickOpen} onMouseEnter={this.handleEnter.bind(this)}
      onMouseLeave={this.handleLeave.bind(this)}>
        {this.props.person.avatar === undefined ? (
          <Avatar
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "-20px",
              marginRight: "5px"
            }}
          >
            {this.props.person.name.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
          src={this.props.person.avatar}
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "-20px",
              marginRight: "5px",
              
            }}
          />
            
        )}

        <Typography
          style={{ paddingLeft: "10px" }}
          component="span"
          color="inherit"
          noWrap={true}
        >
          {this.props.person.name}
        </Typography>
        <Typography
          style={{ paddingLeft: "10px" }}
          component="p"
          color="inherit"
          noWrap={true}
        >
        </Typography><br/>
        <p
        
        >
        </p>
       
      </ListItem>
       {this.state.isHovered ? (
        <div style={{marginBot: '20px', marginLeft: '30px'}} onMouseEnter={this.handleEnter.bind(this)}
        onMouseLeave={this.handleLeave.bind(this)} className="box">{this.props.person.email} </div>
      ) : (
        <div />
      )}
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Send friend request'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <Grid container spacing={24}>
            <Grid item xs={4}>
            {this.props.person.avatar === undefined ? (
          <Avatar
            style={{
              width: "100px",
              height: "100px",
              borderRadius: '0'
            }}
          >
            {this.props.person.name.charAt(0)}
          </Avatar>
        ) : (
          <Avatar
          src={this.props.person.avatar}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: '0'
              
            }}
          />
            
        )}
        </Grid>
        <Grid item xs={8}>
        {this.props.person.name}<br/>
        {this.props.person.email}
        </Grid>
        </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.sendFriendReq(this.props.userID, this.props.person._id)} color="primary">
              Send
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      
    );
  }
}
FriendList.propTypes = {
  events: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
  { sendFriendReq }
)(FriendList);
