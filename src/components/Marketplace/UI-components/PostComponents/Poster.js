import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ImageHolder from './ImageHolder';
import Footer from './Footer';
import deepOrange from '@material-ui/core/colors/deepOrange';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 20,
    },
    avatar: {
      color: '#fff',
      backgroundColor: deepOrange[500],
    }
});

class Poster extends Component {

    render() {
        const {classes} = this.props;
        let creatorName;
        if(this.props.post.creator.method === 'google')
            creatorName = this.props.post.creator.google.name;
        else if(this.props.post.creator.method === 'facebook')
            creatorName = this.props.post.creator.facebook.name;
        else if(this.props.post.creator.method === 'local')
            creatorName = this.props.post.creator.local.name;

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                          <Avatar className={classes.avatar}>{creatorName === undefined ? null : creatorName[0].toUpperCase()}</Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={creatorName}
                        subheader={this.props.post.timePosted}
                    />
                    <CardContent>
                        <Typography component="p" variant={'headline'}>
                            {this.props.post.title}
                        </Typography>
                        <Typography component="p">
                           Price: {this.props.post.price} €
                         </Typography>
                      {this.props.post.location === undefined ? null :
                        <Typography component="p">
                          Location: {this.props.post.location}
                        </Typography>}
                    </CardContent>
                    {(this.props.post.images === undefined || this.props.post.images.length === 0) ? null :
                        <ImageHolder images={this.props.post.images}/>
                    }
                    <Footer description={this.props.post.description}/>
                </Card>
            </div>
        );
    }
}

Poster.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Poster);