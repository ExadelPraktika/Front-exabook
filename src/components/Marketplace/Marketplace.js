import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import ArrowUpward from "@material-ui/icons/es/ArrowUpward";
import AccessTime from "@material-ui/icons/es/AccessTime";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Button from "@material-ui/core/es/Button/Button";
import red from "@material-ui/core/es/colors/red";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/es/TextField/TextField";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
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
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
    textField: {
        left: 10,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});


class Marketplace extends Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandClick = () => {
        this.setState(() =>{
           if(this.state.expanded){
               return {expanded: false}
           }
           return {expanded: true}
        }
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.post}>
                    <TextField
                        id="location"
                        label="Location"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <span> </span>
                    <TextField
                        id="category"
                        label="Category"
                        type="category"
                        className={classes.textField}
                        margin="normal"
                    />
                    <span> </span>
                    <TextField
                        id="limit"
                        label="Min-Max"
                        type="number"
                        defaultValue="0"
                        className={classes.limiter}
                        inputProps={{
                            step: 10,
                        }}
                    />
                    <span> </span>
                    <TextField
                        id="search"
                        label="Search field"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Card>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        src="http://kb4images.com//images/image/37185176-image.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with
                            your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classes.expanded}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
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
                </Card>
            </div>
        )
    }
}

Marketplace.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Marketplace);