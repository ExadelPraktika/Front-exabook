import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { connect } from 'react-redux';
import { getFeed } from '../../actions/postActions';
import PostCard from './UI-components/PostCard';

class PostItem extends Component {
  render() {
    const { post, auth } = this.props;
    let postAuthor;

    if (post.creator.method === 'google') {
        postAuthor = post.creator.google.name
    }
    if (post.creator.method === 'local') {
      postAuthor = post.creator.local.name
    }
    if (event.creator.method === 'facebook') {
      postAuthor = event.creator.facebook.name
    }
  }

  return (
    //<PostCard />
  )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, {getFeed})(PostItem);