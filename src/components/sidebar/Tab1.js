import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import FriendContainer from "../FriendList/TabContainer";
import Chat from '../Chat/Chat';
import MarketTabContainer from "../MarketList/MarketTabContainer";
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8"
  },
  tabsIndicator: {
    backgroundColor: "#3f51b5"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    backgroundColor: "#d6d6d6",
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: "auto",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: "#3f51b5",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#3f51b5",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#3f51b5"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class Tab1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    console.log(this.state.msg !== undefined ? this.state.msg.chatList : null)
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if (this.props !== nextProps) {
      this.setState({value: 1})
    }
   }
  getData =(val)=>{
    // do not forget to bind getData in constructor
    console.log(val);
}

  handleChange(event, value) {
    this.setState({ value: value });
  }

  handleClick() {
    this.setState(state => ({ comments: !state.comments }));
  }

  render() {
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
            fullWidth
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Friends"
              
            >
            </Tab>
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Market"
            />

          </Tabs>
        </AppBar>
        {this.state.value === 0 && <div><FriendContainer/></div>}
        {this.state.value === 1 &&  <div><MarketTabContainer/></div>}
      </div>
    );
  }
}

Tab1.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  msg: state.msg
 
  });

export default connect(
  mapStateToProps,
  {  }
)(withStyles(styles)(Tab1));