import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const dateFormat = require('dateformat');
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    minWidth: 450,
    width: 900,
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.64)',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        //border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    marginBottom: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class TitlebarGridList extends Component {

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const { classes } = this.props;
    var thisMonth = this.props.events.filter(function (el) {
      return el.start.substring(6, 7) == new Date().getMonth() + 1
    });
    var nextMonth = this.props.events.filter(function (el) {
      return el.start.substring(6, 7) == new Date().getMonth() + 2
    });
    var whatLeft = this.props.events.filter(function (el) {
      return el.start.substring(6, 7) !== new Date().getMonth() + 1 && el.start.substring(6, 7) !== new Date().getMonth() + 2
    });

    //const result = props.events.filter(event => event.end.substring(6, 7) = new Date().getMonth()+1);
    return (
      <div className={classes.root}>
        <GridList cols={4} cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">This month ({monthNames[new Date().getMonth()]})</ListSubheader>
          </GridListTile>

          {thisMonth.map(tile => (
            <GridListTile key={tile._id}  >
              <ButtonBase
                focusRipple
                key={tile._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '100%',
                }}
              >

                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${tile.photo})`,
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
                    {dateFormat(tile.start, "dddd dS,  h:MM TT")}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <GridListTileBar
                title={tile.title}

                subtitle={<span>by: {tile.creator.method == 'google' ? tile.creator.google.name : tile.creator.method == 'facebook' ? tile.creator.facebook.name : tile.creator.method == 'local' ? tile.creator.local.name : null}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
          <GridListTile key="Subheader3" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">Next month ({monthNames[new Date().getMonth() + 1]})</ListSubheader>
          </GridListTile>

          {nextMonth.map(tile => (
            <GridListTile key={tile._id}  >
              <ButtonBase
                focusRipple
                key={tile._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '100%',
                }}
              >

                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${tile.photo})`,
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
                    {dateFormat(tile.start, "dddd dS,  h:MM TT")}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <GridListTileBar
                title={tile.title}

                subtitle={<span>by: {tile.creator.method == 'google' ? tile.creator.google.name : tile.creator.method == 'facebook' ? tile.creator.facebook.name : tile.creator.method == 'local' ? tile.creator.local.name : null}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
          <GridListTile key="Subheader2" cols={4} style={{ height: 'auto' }}>
            <ListSubheader component="div">Upcomming events this year</ListSubheader>
          </GridListTile>

          {whatLeft.map(tile => (
            <GridListTile key={tile._id}  >
              <ButtonBase
                focusRipple
                key={tile._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: '100%',
                }}
              >

                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${tile.photo})`,
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
                    {dateFormat(tile.start, "dddd dS,  h:MM TT")}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
              <GridListTileBar
                title={tile.title}

                subtitle={<span>by: {tile.creator.method == 'google' ? tile.creator.google.name : tile.creator.method == 'facebook' ? tile.creator.facebook.name : tile.creator.method == 'local' ? tile.creator.local.name : null}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);