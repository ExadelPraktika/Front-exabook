import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ImageHolder from './Poster-components/ImageHolder';
import Footer from './Poster-components/Footer';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 20,
    },
});

class Poster extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.images.length === 0 ? null :
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar src={this.props.avatar}/>
                            }
                            title={this.props.name}
                            subheader={this.props.timePosted}
                        />
                        <ImageHolder
                            activeStep={this.props.activeStep}
                            images={this.props.images}
                        />
                        <CardContent>
                            <Typography component="p">
                                {this.props.title}
                            </Typography>
                        </CardContent>
                        <Footer
                            descriptionOpened={this.props.descriptionOpened}
                            description={this.props.description}
                            comments={this.props.comments}
                            anchorEl={this.props.anchorEl}
                        />
                    </Card>
                }
            </div>
        );
    }
}

Poster.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timePosted: PropTypes.string.isRequired,
    descriptionOpened: PropTypes.bool.isRequired,
    comments: PropTypes.bool.isRequired,
    rating: PropTypes.string.isRequired,
    anchorEl: PropTypes.object.isRequired,
    images: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired,
};

export default withStyles(styles)(Poster);