import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PostDialog from "./PostDialog";
import SearchDialog from "./SearchDialog";
import { connect } from 'react-redux'
import { getMarketPosts} from '../../../actions/marketActions'

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

  render() {
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
          <Tab label="My market posts"/>
          <Tab label={<PostDialog label="Add post"/>} />
          <Tab label={<SearchDialog label="Search posts"/>} />
        </Tabs>
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  getMarketPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  market: state.market,
  auth: state.auth
});

export default connect(mapStateToProps, { getMarketPosts })(CenteredTabs);