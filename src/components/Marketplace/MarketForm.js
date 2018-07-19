import React, { Component } from 'react';
import Card from "@material-ui/core/es/Card/Card";
import Input from "@material-ui/core/es/Input/Input";
import Typography from "@material-ui/core/es/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Button from "@material-ui/core/es/Button/Button";
import AttachmentIcon from '@material-ui/icons/Attachment';

const styles = theme => ({
    card: {
        maxWidth: 820,
        marginLeft: 150,
        margin: 10,
    },
    comments: {
        margin: 10,
        marginLeft: 30,
        width: 350,
    }
});
class MarketForm extends Component {
    render(){
        const { classes } = this.props;
        return(
            <Card className={classes.card}>
                <div>
                    <Input
                        placeholder={"Title"}
                        className={classes.comments}
                    />
                    <Input
                        placeholder={"Category (optional)"}
                        className={classes.comments}
                    />
                </div>
                <div>
                    <Input
                        placeholder={"Description"}
                        className={classes.comments}
                        multiline={true}
                    />
                    <Button
                        className={classes.comments}
                        style={{width: 350}}
                    >
                        <AttachmentIcon/>
                    </Button>
                </div>
                <div>
                    <Button
                        className={classes.comments}
                        style={{width: 750}}>
                        <Typography>
                            Post
                        </Typography>
                    </Button>
                </div>
            </Card>
        )
    }
}
MarketForm.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MarketForm);