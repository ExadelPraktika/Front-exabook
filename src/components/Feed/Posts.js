import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddPost from './UI-components/AddPostDialog';
import Grid from '@material-ui/core/Grid';
import { getFeed } from '../../actions/postActions';
import PostFeed from './PostFeed';

const styles = theme => ({
  addPostButton: {
    width: '100%',
    maxWidth: 500,
    //backgroundColor: theme.palette.background.paper,
  },
});

class Posts extends Component {

  componentDidMount() {
    this.props.getFeed();
  }

  render() {
    const { postFeed, loading } = this.props.feed;

    return (
      <div>
        
        <Grid container spacing={16} >
          <Grid item xs={12}>
            <AddPost />
            
          </Grid>
        </Grid>

        <Grid container spacing={16}>
        <Grid item xs={12}>
             <PostFeed feed={postFeed} />
          </Grid>
       
        </Grid>

      </div>
      
    );
  }
}

Posts.propTypes = {
  getFeed: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  feed: state.feed,
  auth: state.auth
});

export default connect(mapStateToProps, { getFeed })(Posts);