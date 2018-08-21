import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MarketIcon from "@material-ui/icons/Sms"
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Spinner from '../../utils/Spinner';
import MarketList from "./MarketList";
const styles = theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  margin: {
    zIndex: "0"
  }
});

class MarketTabContainer extends React.Component {
  state = {
    open: false,
    open1: false,
    open2: false,
    open3: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  handleClick2 = () => {
    this.setState(state => ({ open2: !state.open2 }));
  };
  handleClick3 = () => {
    this.setState(state => ({ open3: !state.open3 }));
  };
  handleTooltipClose = () => {
    this.setState({ open1: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open1: true });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <List component="nav" >
            <br/>
            <ListItem button onClick={this.handleClick}>
              <Badge
                badgeContent={this.props.auth.user.buyingFrom.length}
                color="primary"
              >
                <MarketIcon color='primary'/>
              </Badge>
              <ListItemText inset primary="Buying from..." />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              {this.props.auth.user.buyingFrom.length > 0
                ?
                <MarketList users={this.props.auth.user.buyingFrom} userID={this.props.auth.user._id} state={'buying'}/>
                :
                <p style={{ marginLeft: "30px" }}>Not buying anything right now</p>}
            </Collapse>
            <ListItem button onClick={this.handleClick2}>
              <ListItemIcon>
                <Badge
                  badgeContent={this.props.auth.user.sellingTo.length}
                  color="secondary"
                >
                  <MarketIcon color='secondary'/>
                </Badge>
              </ListItemIcon>
              <ListItemText inset primary="Selling to..." />
              {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
              {this.props.auth.user.sellingTo.length > 0
                ?
                <MarketList users={this.props.auth.user.sellingTo} userID={this.props.auth.user._id} state={'selling'}/>
                :
                <p style={{ marginLeft: "30px" }}>Not selling anything to anyone</p>}
            </Collapse>
          </List>
        </div>
    );

  }
}
MarketTabContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withStyles(styles)(MarketTabContainer));