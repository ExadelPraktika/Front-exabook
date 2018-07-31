import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import EventDisplay from '../UI-components/EventDisplay'
const dateFormat = require("dateformat");
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    minWidth: 450,
    width: 900,
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.64)"
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        //border: '4px solid currentColor',
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginBottom: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  float: {
    float: 'left',
    width: 190,
    height: 190,
    margin: 4,
  }
});


class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal1: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {  // switch the value of the showModal state
    this.setState({
      showModal1: !this.state.showModal1

    });
  }
  getComponent = () => {
    if (this.state.showModal1) {  // show the modal if state showModal is true
      return <EventDisplay eventid={this.props._id} creator={this.props.creator} />;
    } else {
      return null;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridListTile key={this.props._id} className={classes.float}>
              <ButtonBase
                focusRipple
                key={this.props._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "100%"
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${this.props.photo})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subheading"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {dateFormat(this.props.start, "dddd dS,  h:MM TT")}
                    
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              {this.getComponent()}
              <GridListTileBar
                title={this.props.title}
                // subtitle={
                //   <span>
                //     by:{" "}
                //     {this.props.creator.method == "google"
                //       ? this.props.google.name
                //       : this.props.creator.method == "facebook"
                //         ? this.props.facebook.name
                //         : this.props.creator.method == "local"
                //           ? this.props.local.name
                //           : null}
                //   </span>
                // }
                actionIcon={
                  <IconButton className={classes.icon} onClick={this.handleClick}>
                    <InfoIcon  />
                  </IconButton>
                }
              />
            </GridListTile>
    )
  }
}
export default  withStyles(styles)(EventCard)