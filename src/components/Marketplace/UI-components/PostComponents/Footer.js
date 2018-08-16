import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import Icon from "@material-ui/core/es/Icon/Icon";
import Typography from "@material-ui/core/es/Typography/Typography";
import Input from "@material-ui/core/es/Input/Input";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { updateLikes, updateRates, addComment } from "../../../../actions/marketActions";
import Badge from "@material-ui/core/es/Badge/Badge";
import Comment from "./Comment";

const styles = theme => ({
    iconButton: {
        marginLeft: 70,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    comments: {
        margin: 10,
    },
});

class Footer extends Component{
    constructor(props){
        super(props);

        this.state = {
            anchorEl: null,
            rate: this.props.rating,
            comments: false,
            descriptionOpened: false,
            liked: this.props.liked,
            averageRating: '',
            text: ''
        }
    }
    componentDidMount(){
      let averageRate = 0;
      if(this.state.rate) {
        Object.keys(this.state.rate).forEach((key) => {
          averageRate += this.state.rate[key]
        });
        averageRate = averageRate / Object.keys(this.state.rate).length;
        this.setState({averageRating: averageRate + '★/5★'});
      }
      else {
        this.setState({averageRating: 'Unrated'});
      }
    }

    handleChange = (e) => {
        this.setState({
         [e.target.id]: e.target.value
        });
    };

    createComment = () => {
      if(!/^\s*$/.test(this.state.text)) {
        let lastComments = this.props.comments;
        let name;
        if (this.props.User.method === 'google')
          name = this.props.User.google.name;
        else if (this.props.User.method === 'facebook')
          name = this.props.User.facebook.name;
        else if (this.props.User.method === 'local')
          name = this.props.User.local.name;
        const comment = {
          text: this.state.text,
          name: name,
          avatar: this.props.User.avatar,
          user: this.props.currentUser,
          likes: [],
        };
        lastComments.push(comment);
        const comments = {_id: this.props._id, comments: lastComments};
        this.props.addComment(comments);
        this.setState({text: ''});
      }
    };

    handleLikeClick = () => {
        let userLikes = this.props.liked;
        if (userLikes.indexOf(this.props.currentUser) === -1) {
            userLikes.push(this.props.currentUser);
        }
        else {
            userLikes.splice(userLikes.indexOf(this.props.currentUser), 1);
        }
        let object = {
            liked: userLikes,
            _id: this.props._id,
        };
        this.props.updateLikes(object);
        this.setState({ liked: this.props.liked});
    };

    handleRateClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleRated = (rate) => {
        let object = {
            _id: this.props._id,
            rating: {
            ...this.state.rate,
            [this.props.currentUser]: rate
            }
        };
        this.props.updateRates(object);
        let averageRate = 0;
        let rating = { ...this.state.rate, [this.props.currentUser]: rate};
        Object.keys(rating).forEach((key) => {
            averageRate += rating[key];
        });
        averageRate = averageRate / Object.keys(rating).length;
        this.setState({
          anchorEl: null,
          rate: rating,
          averageRating: averageRate + '★/5★'});
    };

    handleRateClose = () => {
        this.setState({ anchorEl: null });
    };

    handleCommentButton = () => {
        this.setState({comments: !this.state.comments});
    };

    handleDescriptionButton = () => {
        this.setState(() => {
                if (this.state.descriptionOpened) {
                    return {descriptionOpened: false}
                }
                return {descriptionOpened: true}
            }
        );
    };

    render(){
        const { classes } = this.props;
        return(
            <div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Button onClick={this.handleCommentButton} disabled={ this.props.disableComments }>
                        Comment
                    </Button>
                    {this.props.currentUser !== this.props.postCreator
                      ?
                      <Button
                        onClick={this.handleRateClick}
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                      >
                         { this.state.averageRating }
                      </Button>
                      :
                      <Button disabled={true}>
                        { this.state.averageRating }
                      </Button>
                    }
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleRateClose}
                    >
                        <MenuItem onClick={() => this.handleRated(5)}>5 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated(4)}>4 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated(3)}>3 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated(2)}>2 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated(1)}>1 ★</MenuItem>
                    </Menu>
                    <IconButton
                        className={classes.iconButton}
                        aria-label="Like"
                        onClick={this.handleLikeClick}
                    >
                      {this.state.liked.indexOf(this.props.currentUser) === -1
                        ? <Badge badgeContent={this.props.liked.length} color={"default"} ><FavoriteIcon/></Badge>
                        : <Badge badgeContent={this.props.liked.length} color={"secondary"} ><FavoriteIcon color={'secondary'}/></Badge>}
                    </IconButton>
                    {/*<IconButton aria-label="Share">
                        <ShareIcon/>
                    </IconButton>*/}
                    <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.descriptionOpened,
                          })}
                        onClick={this.handleDescriptionButton}
                        aria-expanded={this.state.descriptionOpened}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.comments} timeout="auto" unmountOnExit>
                    <div className={classes.comments}>
                        <Input
                            id='text'
                            value={this.state.text}
                            autoFocus={true}
                            multiline={true}
                            style = {{width: 280}}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <IconButton onClick={this.createComment}>
                            <Icon>send</Icon>
                        </IconButton>
                      <div>
                        {this.props.comments.map( (comment) => <Comment
                          key={comment._id}
                          comment={comment}
                          postCreator={this.props.postCreator}
                          comments={this.props.comments}
                          _id={this.props._id}/>
                        ).reverse()}
                      </div>
                    </div>
                </Collapse>
                <Collapse in={this.state.descriptionOpened} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </div>
        )
    }
}
Footer.propTypes = {
    description: PropTypes.string.isRequired,
    liked: PropTypes.array.isRequired,
    updateLikes: PropTypes.func.isRequired,
    updateRates: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    disableComments: PropTypes.bool.isRequired,
    currentUser: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    postCreator: PropTypes.string,
    User: PropTypes.object.isRequired,
    rating: PropTypes.object,
    comments: PropTypes.array
};

const mapStateToProps = state => ({
  market: state.market,
  auth: state.auth
});

export default connect( mapStateToProps, { updateLikes, updateRates, addComment })(withStyles(styles)(Footer));

