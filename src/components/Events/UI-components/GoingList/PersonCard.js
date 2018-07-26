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
  render() {
    return (
      <div>
        <ListItem>
          <Grid container spacing={0}>
            <Grid item xs={4} style={{paddingLeft: '30%', textAlign: 'right'}}>
              <Avatar>T</Avatar>
            </Grid>
            <Grid item xs={8} >
              <Typography variant="subheading" gutterBottom style={{marginTop: '3%',  paddingLeft: '12%',}}>
                {this.props.user.method === "google"
                  ? this.props.user.google.name
                  : this.props.user.method === "facebook"
                    ? this.props.user.facebook.name
                    : this.props.user.method === "local"
                      ? this.props.user.local.name
                      : null}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </div>
    );
  }
}
export default PersonCard;
