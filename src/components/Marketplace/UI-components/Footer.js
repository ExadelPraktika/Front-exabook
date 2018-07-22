import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/es/styles";
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
            comments: false,
            descriptionOpened: false,
            liked: false
        }
    }

    handleLikeClick = () => {
        this.setState(()=>{
            if(this.state.liked)
                return {liked: false};
            return {liked: true};
        });
    };

    handleRateClick = event => {
        this.setState({ anchorEl: event.currentTarget });
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
        const { classes } = this.props;
        return(
            <div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Button className={classes.button} onClick={this.handleCommentButton}>
                        Comment
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={this.handleRateClick}
                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                    >
                        Rate
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleRateClose}
                    >
                        <MenuItem onClick={this.handleRateClose}>5 ★</MenuItem>
                        <MenuItem onClick={this.handleRateClose}>4 ★</MenuItem>
                        <MenuItem onClick={this.handleRateClose}>3 ★</MenuItem>
                        <MenuItem onClick={this.handleRateClose}>2 ★</MenuItem>
                        <MenuItem onClick={this.handleRateClose}>1 ★</MenuItem>
                    </Menu>
                    <IconButton
                        className={classes.iconButton}
                        aria-label="Add to favorites"
                        onClick={this.handleLikeClick}
                    >
                        {this.state.liked === false ? <FavoriteIcon/> : <FavoriteIcon color={'secondary'}/>}
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon/>
                    </IconButton>
                    <IconButton
                        className={classes.descriptionOpened}
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
                            autoFocus={true}
                            multiline={true}
                            style = {{width: 330}}
                        />
                        <IconButton>
                            <Icon>send</Icon>
                        </IconButton>
                    </div>
                    <div className={classes.comments}>
                        <Typography>
                            Comments
                        </Typography>
                    </div>
                </Collapse>
                <Collapse in={this.state.descriptionOpened} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
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
};

export default withStyles(styles)(Footer);

