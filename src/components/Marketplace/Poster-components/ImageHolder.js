import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/es/Button/Button";
import MobileStepper from "@material-ui/core/es/MobileStepper/MobileStepper";
import { withStyles } from "@material-ui/core/es/styles";

const styles = theme => ({
    img: {
        width: 400,
        height: 225,
    },
});

class ImageHolder extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeStep: this.props.activeStep,
        }
    }

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

    render(){
        const { classes } = this.props;
        return (
            <div>
                {this.props.images.length === 1 ? <img src={this.props.images[0]} className={classes.img}/>
                    :
                    <div>
                        <img src={this.props.images[this.state.activeStep]} className={classes.img}/>
                        <MobileStepper
                            steps={this.props.images.length}
                            position="static"
                            activeStep={this.state.activeStep}
                            className={classes.mobileStepper}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={this.handleNextImage}
                                    disabled={this.state.activeStep === this.props.images.length - 1}>
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
            </div>
        );
    };
}
ImageHolder.propTypes = {
    classes: PropTypes.object.isRequired,
    activeStep: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
};

export default withStyles(styles)(ImageHolder);