import React, { Component } from 'react'
import PropTypes from 'prop-types';
import PostCard from './UI-components/PostCard';

class PostFeed extends Component {
  render() {
    const {posts} = this.props;
    return posts.map(posts => <PostCard key={post._id} post={post}/>)
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;