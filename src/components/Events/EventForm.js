import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addEvent } from '../../actions/eventActions'
import * as moment from 'moment'
import DataPicker from './UI-components/DataPicker'
import renderFunc from './UI-components/PlacesAuto'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const styles = {
  card: {
    minWidth: 300,
    maxWidth: 370,
    textAlign: "center",
  },
  button: {
    minWidth: 200,
    maxWidth: 300,
    margin: 20
  },
  location: {
    minWidth: 300,
    maxWidth: 370,
  }
};
class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      title: '',
      description: '',
      start: '',
      end: '',
      location: '',
      address: ''
    };
  }

  componentWillMount() {
    var today = new Date();
    today.setHours(today.getHours() + 2)
    this.setState({
      start: new Date().toISOString().substring(0, 16),
      end: today.toISOString().substring(0, 16)
    });
  }


  onChange1 = (e) => {
    this.setState({
      start: e.target.value,
    });
  };
  onChange2 = (e) => {
    this.setState({
      end: e.target.value,
    });
  };
  handleChange = (address) => {
    this.setState({ address,
      location: address });
  };
  handleChange1 = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    
    const { user } = this.props.auth;
    console.log(user._id);
    const newEvent = {
      creator: user._id,
      title: this.state.title,
      location: this.state.location,
      start: this.state.start,
      end: this.state.end,
      description: this.state.description
    };
    this.props.addEvent(newEvent);
    
  }

  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };


  render() {
    return (
      <Card className="login-card" style={styles.card}>
        <CardContent>
          <FormGroup onSubmit={this.onSubmit}>
            <FormLabel>Create Event</FormLabel>
            <br />
            <FormControl>
              <InputLabel>Events title</InputLabel>
              <Input
                name="title"
                onChange={this.handleChange1}
              />
            </FormControl>
            <br />
            <PlacesAutocomplete
              styles={styles.location}
              value={this.state.address}
              onChange={this.handleChange}
            //onSelect={this.handleSelect}
            >
              {renderFunc}
            </PlacesAutocomplete>
            <br />
            <DataPicker
              name="start"
              label="Event Starts"
              onChange={this.onChange1}
              value={this.state.start}
            />
            <DataPicker
              name="end"
              label="Event Ends"
              onChange={this.onChange2}
              value={this.state.end}
            />
            <TextField
              name="description"
              onChange={this.handleChange1}
              id="textarea"
              label="Description of the event"
              placeholder=""
              multiline
              //className={classes.textField}
              margin="normal"
            />
            <Button style={styles.button}
              //style={styles.button}
              variant="contained"
              onClick={this.onSubmit}
              type="submit"
              //disabled={!this.state.formValid}
            >
              Create event
              </Button>
          </FormGroup>
        </CardContent>
      </Card>
    )
  }
}

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addEvent })(EventForm);