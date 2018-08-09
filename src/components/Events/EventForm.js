import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEvent } from "../../actions/eventActions";
import Dropzone from "react-dropzone";
import * as moment from "moment";
import axios from "axios";
import DataPicker from "./UI-components/DataPicker";
import renderFunc from "./UI-components/PlacesAuto";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { render } from "react-dom";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
const styles = {
  card: {
    minWidth: 300,
    maxWidth: 370,
    textAlign: "center"
  },
  button: {
    minWidth: 200,
    maxWidth: 300,
    margin: 20
  },
  location: {
    minWidth: 300,
    maxWidth: 370
  },
  photo: {
    maxWidth: 320,
    maxHeight: 250
  }
};
class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      title: "",
      description: "",
      start: "",
      end: "",
      location: "",
      photo: "",
      address: "",
      coordLat: "",
      coordLng: "",
      errors: {}
    };
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  componentWillMount() {
    var today = new Date();
    today.setHours(today.getHours() + 2);
    this.setState({
      start: new Date().toISOString().substring(0, 16),
      end: today.toISOString().substring(0, 16)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange1 = e => {
    this.setState({
      start: e.target.value,
    });
  };
  onChange2 = e => {
    this.setState({
      end: e.target.value
    });
  };
  handleChange = address => {
    this.setState({
      address,
      location: address
    });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({
          coordLat: latLng.lat,
          coordLng: latLng.lng
        })
      )
      .then(console.log(this.state.coordLat, this.state.coordLng))
      .catch(error => console.error("Error", error));
  };
  handleChange1 = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    console.log(user._id);
    const newEvent = {
      creator: user._id,
      title: this.state.title,
      location: this.state.location,
      start: this.state.start,
      end: this.state.end,
      description: this.state.description,
      photo: this.state.photo,
      coordLat: this.state.coordLat,
      coordLng: this.state.coordLng
    };
    this.props.addEvent(newEvent);
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  uploadWidget() {
    cloudinary.openUploadWidget(
      {
        cloud_name: "exabook",
        upload_preset: "n1jdzlyw",
        multiple: true,
        show_powered_by: false,
        tags: ["xmas"],
        max_image_width: "1600",
        max_image_height: "900"
      },
      (error, result) => {
        console.log(result[0].secure_url);
        this.setState({ photo: result[0].secure_url });
      }
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <Card className="login-card" style={styles.card}>
        <CardContent>
          <FormGroup onSubmit={this.onSubmit}>
            <FormLabel>Create Event</FormLabel>
            <br />
            <TextField
              name="title"
              onChange={this.handleChange1}
              id="textarea"
              label="Events title"
              placeholder=""
              error={errors.title}
              helperText={errors.title}
              //className={classes.textField}
              margin="normal"
            />
            <br />
            <img src={this.state.photo} style={styles.photo} />
            <div className="upload">
              <Button
                onClick={this.uploadWidget.bind(this)}
                className="upload-button"
              >
                Add Events Image
              </Button>
            </div>
            <FormControl error aria-describedby="name-error-text">
              <PlacesAutocomplete
                styles={styles.location}
                value={this.state.address}
                location={errors.location}
                //onSelect={this.handleSelect}
                onChange={this.handleChange}
              >
                {renderFunc}
              </PlacesAutocomplete>
              <FormHelperText id="name-error-text">
                {errors.location < 0 ? "" : errors.location}
              </FormHelperText>
            </FormControl>
            <br />

            <FormControl error aria-describedby="name-error-text">
              <DataPicker
                error="true"
                name="start"
                label="Event Starts"
                onChange={this.onChange1}
                value={this.state.start}
              />
              <FormHelperText id="name-error-text">
                {errors.start < 0 ? "" : errors.start}
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl error aria-describedby="name-error-text">
              <DataPicker
                name="end"
                label="Event Ends"
                onChange={this.onChange2}
                value={this.state.end}
              />
              <FormHelperText id="name-error-text">
                {errors.end < 0 ? "" : errors.end}
              </FormHelperText>
            </FormControl>
            <TextField
              name="description"
              onChange={this.handleChange1}
              id="textarea"
              label="Description of the event"
              placeholder=""
              multiline
              error={errors.description}
              helperText={errors.description}
              //className={classes.textField}
              margin="normal"
            />

            <Button
              style={styles.button}
              //style={styles.button}
              variant="contained"
              onClick={event => {
                this.onSubmit(event);
                // this.props.handleClose()
              }}
              type="submit"
              //disabled={!this.state.formValid}
            >
              Create event
            </Button>
          </FormGroup>
        </CardContent>
      </Card>
    );
  }
}

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEvent }
)(EventForm);
