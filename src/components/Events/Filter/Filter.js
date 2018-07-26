import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import { FilterDrawer, filterSelectors, filterActions } from './index'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import ReactList from 'react-list'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import EventCard from '../EventsCalender/EventCard'
import GridList from "@material-ui/core/GridList";
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
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  over: {
    maxWidth: 900
  }
  

})


class Filter extends Component {

  renderItem = (i, k) => {
    const { list } = this.props
    const key = i
    const val = list[i]

    return (
        
          <EventCard
          key={val._id}
          title={val.title}
          photo={val.photo}
          creator={val.creator}
          start={val.start}
          _id={val._id}
          location={val.location}
          />
    )
  }

  render() {
    console.log(this.props)
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

        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {`Search for (${list.length} entries)`}
            </Typography>
            <div style={{ display: 'flex' }}>
              <div style={{ width: 'calc(100% - 84px)' }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  borderRadius: 5,
                  width: 560,
                  maxWidth: '100%'
                }}
                >
                  <div style={{
                    display: 'flex',
                    borderRadius: 4,
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                  >
                    <Icon style={{ marginLeft: 10, marginTop: 12, marginRight: 15 }} >search</Icon>
                    <TextField
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setSearch('demo', e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>

            </div>
            <IconButton color="inherit" onClick={() => setFilterIsOpen('demo', true)} ><Icon>filter_list</Icon></IconButton>
          </Toolbar>
        </AppBar>
        <FilterDrawer
          name={'demo'}
          fields={filterFields}

        //localizing the DatePicker
        //locale={'de-DE'}
        //DateTimeFormat={global.Intl.DateTimeFormat}
        //okLabel="OK"
        //cancelLabel="Abbrechen"
        />
        
        <List className={classes.over}>
          <ReactList
          className={classes.over}
            itemRenderer={this.renderItem}
            length={list ? list.length : 0}
            type='simple'
          />
        </List>

        


      </div>
    )
  }
}

Filter.propTypes = {
  setFilterIsOpen: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  const { filters, muiTheme } = state
  const { hasFilters } = filterSelectors.selectFilterProps('demo', filters)
  const list = filterSelectors.getFilteredList('demo', filters, ownProps.events /*, fieldValue => fieldValue.val*/)

  return {
    hasFilters,
    list
  }
}


export default connect(
  mapStateToProps,
  { ...filterActions }
)(withStyles(styles, { withTheme: true })(Filter))
