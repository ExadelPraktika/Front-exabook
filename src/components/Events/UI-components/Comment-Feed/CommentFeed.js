import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "../Comment-Feed/Comment";

class CommentFeed extends Component {
  render() {
    const { comments } = this.props;
    if (comments < 0) {
      return <div> No comments </div>;
    } else {
      console.log(comments, "from feed");
      return (
        <div
          style={{
            height: 450,
            overflowY: "scroll",
            overflowX: "hidden"
          }}
        >
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              userID={this.props.userID}
              eventID={this.props.eventID}
            />
          ))}
        </div>
      );
    }
  }
}
CommentFeed.propTypes = {
  events: PropTypes.array.isRequired
};

export default CommentFeed;
