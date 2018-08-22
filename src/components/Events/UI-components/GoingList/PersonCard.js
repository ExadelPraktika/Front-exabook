import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { ListItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";

class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount(){
    let name;
    if (this.props.user.method === "google") {
      name = this.props.user.google.name
    }
    if (this.props.user.method === "local") {
      name = this.props.user.local.name;
    }
    if (this.props.user.method === "facebook") {
      name = this.props.user.facebook.name;
    }
    this.setState({
      name: name
    })
  }
  render() {
    return (
      <div>
        <ListItem>
          <Grid container spacing={0}>
            <Grid item xs={4} style={{paddingLeft: '30%', textAlign: 'right'}}>
            {this.props.user.avatar ? (
          <Avatar
            alt="Unknown"
            src={this.props.user.avatar}
          />
        ) : (
          <Avatar onClick={this.handleClick}>
            {this.state.name.charAt(0)}
          </Avatar>
        )}
            </Grid>
            <Grid item xs={8} >
              <Typography variant="subheading" gutterBottom style={{marginTop: '3%',  paddingLeft: '12%',}}>
                {this.state.name}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    );
  }
}
export default PersonCard;
