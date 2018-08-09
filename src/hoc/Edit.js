import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPostDialog from '../components/Feed/UI-components/EditPostDialog';
import { getPost } from '../actions/postActions';

class EditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditDialog: false,
    };
  }

  componentDidmount() {
    this.props.getPost(this.props.id);
    console.log(this.props);
  }

  handleEditClick = () => {
    this.setState({
      showEditDialog: !this.state.showEditDialog,
    });
  }
  

  render() {
    const { post } = this.props;

    return <EditPostDialog 
      post={post}
      show={this.state.showEditDialog}
      handleClose={() => this.handleEditClick()}
     />
  }
}

const mapStateToProps = (state) => ({
  post: state.post
});

const mapActionsToProps = (dispatch) => ({
  getPost: (id) => dispatch(getPost(id)),
});


export default connect(mapStateToProps, mapActionsToProps)(EditContainer);
