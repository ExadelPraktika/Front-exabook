import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createPost, getMarketPosts} from '../../../../actions/marketActions'
import Card from "@material-ui/core/es/Card/Card";
import Input from "@material-ui/core/es/Input/Input";
import Typography from "@material-ui/core/es/Typography/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/es/Button/Button";

const dateFormat = require('dateformat');

const styles = {
    comments: {
        margin: 10,
        width: 300,
    }
};

class MarketForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            category: '',
            description: '',
            images: [],
            price: '',
            location: ''
        }
    }

    createMarketPost = () =>{
        let time = new Date();
        let fullTime = dateFormat(Date.now(), "dddd, mmmm dS, yyyy, ") + (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
        const newPost = {
            category: this.state.category,
            description: this.state.description,
            title: this.state.title,
            timePosted: fullTime,
            images: this.state.images,
            price: this.state.price,
            location: this.state.location
        };
        this.props.createPost(newPost);
        this.props.getMarketPosts();
        this.setState({
            title: '',
            category: '',
            description: '',
            images: [],
            price: '',
            location: ''
        });
        this.props.handleClose();
    };

    uploadWidget() {
      cloudinary.openUploadWidget({
          cloud_name: 'exabook',
          upload_preset: 'n1jdzlyw',
          show_powered_by: false,
          tags: ['xmas'],
          max_image_width: '1600',
          max_image_height: '900'
        },
        (error, result) => {
          this.setState({images: [result[0].secure_url, ...this.state.images]});
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render(){
        return(
            <Card style={styles.card}>
                <div>
                    <Input
                        name={'title'}
                        placeholder={"Title"}
                        style={styles.comments}
                        value={this.state.title}
                        onChange={(e) => {this.handleChange(e)}}
                    />
                </div>
                <div>
                    <Input
                        name={'category'}
                        placeholder={"Category"}
                        style={styles.comments}
                        value={this.state.category}
                        onChange={(e) => {this.handleChange(e)}}
                    />
                </div>
                <div>
                    <Input
                      type={'number'}
                      name={'price'}
                      placeholder={"Price in €"}
                      style={styles.comments}
                      value={this.state.price}
                      onChange={(e) => {this.handleChange(e)}}
                      inputProps={{
                        step: 10,
                      }}
                    />
                </div>
                <div>
                   <Input
                      name={'location'}
                      placeholder={"Location"}
                      style={styles.comments}
                      value={this.state.location}
                      onChange={(e) => {this.handleChange(e)}}
                    />
                </div>
                <div>
                    <Input
                        name={'description'}
                        placeholder={"Description"}
                        style={styles.comments}
                        value={this.state.description}
                        multiline={true}
                        onChange={(e) => {this.handleChange(e)}}
                    />
                </div>
                <div>
                    <Button
                        style={styles.comments}
                        onClick={this.uploadWidget.bind(this)}
                    >
                      <Typography variant={'button'}>
                          Add images
                      </Typography>
                    </Button>
                </div>
                <div>
                    <Button
                        style={styles.comments}
                        onClick={this.createMarketPost}
                    >
                        <Typography variant={'button'}>
                            Post
                        </Typography>
                    </Button>
                </div>
            </Card>
        )
    }
}
MarketForm.propTypes = {
    createPost: PropTypes.func.isRequired,
    getMarketPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    market: state.market,
    auth: state.auth
});

export default connect(mapStateToProps, {createPost, getMarketPosts})(MarketForm);