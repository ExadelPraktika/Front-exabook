import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import { FilterDrawer, filterSelectors, filterActions } from '../../Events/Filter/index'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import TextField from '@material-ui/core/TextField'
import ReactList from 'react-list'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchItem from './SearchItem';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },



    nested: {
      paddingLeft: theme.spacing.unit * 4
    },

  

})


class Filter extends Component {
constructor(props){
  super(props);
  this.state = {
    open1:  false
  }
}

  renderItem = (i, k) => {
    const { list } = this.props
    const key = i
    const val = list[i]

    return (
        
          <SearchItem
          key={val._id}
          person={val}
          userID={this.props.userID}
          />
    )
  }
  handleTooltipClose = () => {
    this.setState({ open1: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open1: true });
  };
  
  render() {
    // console.log(this.props)
    const {
      setFilterIsOpen,
      list,
      setSearch,
      muiTheme,
      classes
    } = this.props

    const filterFields = [
      { name: 'title', label: 'Event title' },
      { name: 'location', label: 'Location' },
      { name: 'start', label: 'Start date', type: 'date' },
      { name: 'end', label: 'Start end', type: 'date'},
      { name: 'creator', label: 'Creator', type: 'bool' },
    ]


    return (




<div>
      <ClickAwayListener onClickAway={this.handleTooltipClose} >
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true
          }}
          style={{ height: "250", marginTop: "50px", zIndex: '3000', width: '200px' }}
          onClose={this.handleTooltipClose}
          open={this.state.open1}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            list.length == 0 ? <div style={{width: '200px', textAlign: 'center', fontSize: 15}}>no users to show</div> :
            <List
              style={{ maxHeight: "200px", overflowY: "scroll" }}
            >
          <ReactList
            itemRenderer={this.renderItem}
            length={list ? list.length : 0}
          />
                
              
            </List>
          }
          placement="bottom"
        >
          <div>
          <Grid container spacing={8} alignItems="flex-end">
<Grid item>
<InputAdornment position="start">
<Search/>
                  </InputAdornment>
</Grid>
<Grid item>
<TextField
              onClick={this.handleTooltipOpen}
              onChange={(e) => {
                setSearch('demo', e.target.value)
              }}
              placeholder="search for friends"
              className={classes.textField}
            />
                                    <Typography
              style={{
                float: "right",
                marginTop: "15px",
                marginRight: "15px"
              }}
              component="span"
              variant="subheading"
              color="inherit"
            >
             {/* {'x'} */}
            </Typography>
</Grid>
</Grid>
            
          </div>
        </Tooltip>
      </div>
    </ClickAwayListener>
</div>
    )
  }
}

Filter.propTypes = {
  setFilterIsOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  const { filters, muiTheme } = state
  const { hasFilters } = filterSelectors.selectFilterProps('demo', filters)
  const list = filterSelectors.getFilteredList('demo', filters, ownProps.peopleList /*, fieldValue => fieldValue.val*/)

  return {
    hasFilters,
    list
  }
}


export default connect(
  mapStateToProps,
  { ...filterActions }
)(withStyles(styles, { withTheme: true })(Filter))