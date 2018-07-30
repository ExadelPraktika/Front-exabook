import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PostDialog from './UI-components/TabComponents/PostDialog';
import SearchDialog from './UI-components/TabComponents/SearchDialog';
import { connect } from 'react-redux'
import { getMarketPosts, getUserPosts } from '../../actions/marketActions';

class CenteredTabs extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getUserposts = (id) => {
    this.props.getUserPosts(id);
  };

  render() {
    const { classes } = this.props;
    return (
        <Paper style={{margin: 10, width: 1000}}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Market posts" onClick={this.props.getMarketPosts}/>
            <Tab label="My market posts" onClick={this.getUserposts.bind(this, this.props.auth.user._id)}/>
            <Tab label={<PostDialog label="Add post"/>} />
            <Tab label={<SearchDialog label="Search posts"/>} />
          </Tabs>
        </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  getMarketPosts: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  market: state.market,
  auth: state.auth
});

export default connect(mapStateToProps, { getMarketPosts, getUserPosts })(CenteredTabs);