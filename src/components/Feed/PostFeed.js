import React, { Component } from "react";
import PropTypes from "prop-types";
import PostCard from "./UI-components/PostCard";

class PostFeed extends Component {
  render() {
    const { feed } = this.props;
    return feed.map(post => <PostCard key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  feed: PropTypes.array.isRequired
};

export default PostFeed;
