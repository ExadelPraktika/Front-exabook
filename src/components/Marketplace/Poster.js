import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import red from "@material-ui/core/es/colors/red";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Menu from "@material-ui/core/es/Menu/Menu";

const classes = theme => ({
    div:{
      marginLeft: 70
    },
    iconButton: {
        marginLeft: 40,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit,
    },
    img: {
        width: 400,
        height: 225,
    },
    limiter: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
        left: 10
    },
    post: {
        maxWidth: 760,
        marginLeft: 150,
        margin: 10,
    },
    card: {
        maxWidth: 400,
        margin: 20,
    },
    actions: {
        display: 'flex',
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
    avatar: {
        backgroundColor: red[500],
    },
});

class Poster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            open: false,
            rating: false,
        };
    }

    handleRateClick = () => {
        this.setState(() => {
                if (this.state.rating) {
                    return {rating: false}
                }
                return {rating: true}
            }
        );
    };

    handleRateClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClose = () => {
        this.setState({
            open: false,
            ...this.state
        });
    };

    handleOpen = () => {
        this.setState({
            open: true,
            ...this.state
        });
    };

    handleExpandClick = () => {
        this.setState(() => {
                if (this.state.expanded) {
                    return {expanded: false}
                }
                return {expanded: true}
            }
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Sale" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title="Selling stuff"
                        subheader="January 14, 2018"
                    />
                    <img className={classes.img} src={"http://kb4images.com//images/image/37185176-image.jpg"}/>
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with
                            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Button className={classes.button} onClick={this.handleOpen}>
                            Comment
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={this.handleRateClick}
                            aria-expanded={this.state.rating}
                            aria-label="Show more"
                        >
                            Rate
                        </Button>
                        <IconButton className={classes.iconButton} aria-label="Add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon/>
                        </IconButton>
                        <IconButton
                            className={classes.expanded}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="body2">
                                Method:
                            </Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                                the rice, and cook again without stirring, until mussels have opened and rice is
                                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                    <Collapse in={this.state.rating} timeout="auto" unmountOnExit>
                        <div className={classes.div}>
                            <IconButton onClick={this.handleRateClick}>
                                1
                            </IconButton>
                            <IconButton onClick={this.handleRateClick}>
                                2
                            </IconButton>
                            <IconButton onClick={this.handleRateClick}>
                                3
                            </IconButton>
                            <IconButton onClick={this.handleRateClick}>
                                4
                            </IconButton>
                            <IconButton onClick={this.handleRateClick}>
                                5
                            </IconButton>
                        </div>
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