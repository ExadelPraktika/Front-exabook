import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Menu from "@material-ui/core/es/Menu/Menu";
import Input from "@material-ui/core/es/Input/Input";
import Icon from '@material-ui/core/Icon';
import MobileStepper from "@material-ui/core/es/MobileStepper/MobileStepper";


const classes = theme => ({
    div:{
      marginLeft: 70
    },
    iconButton: {
        marginLeft: 40,
    },
    img: {
        width: 400,
        height: 225,
    },
    card: {
        maxWidth: 400,
        margin: 20,
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

class Poster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Nick Hompton',
                avatar: "https://api.adorable.io/avatars/50/abott@adorable.png"
            },
            category: '',
            description: 'Add rice and stir very gently to distribute. Top with artichokes and peppers, and\n' +
                'cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.\n' +
                'Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into\n' +
                'the rice, and cook again without stirring, until mussels have opened and rice is\n' +
                'just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)',

            title: 'Selling stuff',
            timePosted: 'January 14, 2018',
            descriptionOpened: false,
            comments: false,
            rating: '',
            anchorEl: null,
            images: [
                'http://kb4images.com//images/image/37185176-image.jpg',
                'http://kb4images.com//images/anime/36769098-anime.jpg',
                'http://kb4images.com//images/yamaha-r1-wallpaper/36082550-yamaha-r1-wallpaper.jpg'
            ],
            activeStep: 0,
        };
    }

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

    handleNextImage = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleLastImage = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar src={this.state.user.avatar}/>
                        }
                        title={this.state.user.name}
                        subheader={this.state.timePosted}
                    />
                    {this.state.images.length === 1 ? <img src={this.state.images[0]} className={classes.img}/>
                        :
                        <div>
                            <img src={this.state.images[this.state.activeStep]} className={classes.img}/>
                            <MobileStepper
                                steps={this.state.images.length}
                                position="static"
                                activeStep={this.state.activeStep}
                                className={classes.mobileStepper}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={this.handleNextImage}
                                        disabled={this.state.activeStep === this.state.images.length - 1}>
                                        Next
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        onClick={this.handleLastImage}
                                        disabled={this.state.activeStep === 0}>
                                        Back
                                    </Button>
                                }
                            />
                        </div>
                    }
                    <CardContent>
                        <Typography component="p">
                            {this.state.title}
                        </Typography>
                    </CardContent>
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
                        <IconButton className={classes.iconButton} aria-label="Add to favorites">
                            <FavoriteIcon/>
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
                                {this.state.description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

Poster.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Poster);