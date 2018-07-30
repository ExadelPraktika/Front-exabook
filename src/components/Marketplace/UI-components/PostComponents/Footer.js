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
import { update } from "../../../../actions/marketActions";

const styles = {
    iconButton: {
        marginLeft: 70,
    },
    expand: {
        transform: 'rotate(0deg)',
        /*transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),*/
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    comments: {
        margin: 10,
    },
};

class Footer extends Component{
    constructor(props){
        super(props);

        this.state = {
            anchorEl: null,
            rate: this.props.rating,
            comments: false,
            descriptionOpened: false,
            liked: this.props.liked
        }
    }

    handleLikeClick = () => {
        let object = {
            rating: this.state.rate,
            liked: !this.state.liked,
            _id: this.props._id,
            disableComments: this.props.disableComments
        };
        this.props.update(object);
        this.setState({ liked: !this.state.liked});
    };

    handleRateClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleRated = (rate) => {
        let object = { rating: rate, liked: this.state.liked, _id: this.props._id };
        this.props.update(object);
        if(rate) this.setState({ anchorEl: null , rate: rate});
        this.setState({ anchorEl: null });
    };

    handleRateClose = () => {
        this.setState({ anchorEl: null });
    };

    handleCommentButton = () => {
        this.setState(() => {
                if (this.state.comments) {
                    return {comments: false}
                }
                return {comments: true}
            }
        );
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
        return(
            <div>
                <CardActions style={styles.actions} disableActionSpacing>
                    <Button onClick={this.handleCommentButton} disabled={ this.props.disableComments }>
                        Comment
                    </Button>
                    <Button
                        onClick={this.handleRateClick}
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                    >
                      { this.state.rate }
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleRateClose}
                    >
                        <MenuItem onClick={() => this.handleRated('5 ★')}>5 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated('4 ★')}>4 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated('3 ★')}>3 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated('2 ★')}>2 ★</MenuItem>
                        <MenuItem onClick={() => this.handleRated('1 ★')}>1 ★</MenuItem>
                    </Menu>
                    <IconButton
                        style={styles.iconButton}
                        aria-label="Add to favorites"
                        onClick={this.handleLikeClick}
                    >
                        {this.state.liked === false ? <FavoriteIcon/> : <FavoriteIcon color={'secondary'}/>}
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon/>
                    </IconButton>
                    <IconButton
                        style={styles.descriptionOpened}
                        onClick={this.handleDescriptionButton}
                        aria-expanded={this.state.descriptionOpened}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.comments} timeout="auto" unmountOnExit>
                    <div style={styles.comments}>
                        <Input
                            autoFocus={true}
                            multiline={true}
                            style = {{width: 330}}
                        />
                        <IconButton>
                            <Icon>send</Icon>
                        </IconButton>
                    </div>
                    <div style={styles.comments}>
                        <Typography>
                            Comments
                        </Typography>
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
    liked: PropTypes.bool.isRequired,
    rating: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    disableComments: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  market: state.market
});

export default connect( mapStateToProps, { update })(Footer);

