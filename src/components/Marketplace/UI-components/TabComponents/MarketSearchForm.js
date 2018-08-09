import React, { Component } from 'react';
import Card from "@material-ui/core/es/Card/Card";
import TextField from "@material-ui/core/es/TextField/TextField";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import { getSearchedPosts } from '../../../../actions/marketActions';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import renderFunc from "../PlacesAuto";

class MarketSearchForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            location: '',
            category: '',
            min: 0,
            max: 0,
            search: ''
        }
    }
    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      });
    };

  handleChange1 = address => {
    this.setState({
      location: address
    });
  };

    handleSearchClose = () => {
      let search = {
        location: this.state.location,
        category: this.state.category,
        min: this.state.min,
        max: this.state.max,
        search: this.state.search
      };
      this.props.getSearchedPosts(search);
      this.props.handleClose();
    };

    render(){
        return(
            <Card>
              <div>
                <PlacesAutocomplete
                  value={this.state.location}
                  onChange={this.handleChange1}
                  style={{margin: 10, width: 300,}}
                  placeholder={"Location"}
                >
                  {renderFunc}
                </PlacesAutocomplete>
              </div>
              <div>
                <TextField
                  id="category"
                  label="Category"
                  type="category"
                  onChange={(e) => {this.handleChange(e)}}
                  style={{margin: 10, width: 300}}
                  margin="normal"
                />
              </div>
              <div>
                <TextField
                  id="min"
                  label="Minimum price"
                  type="number"
                  onChange={(e) => {this.handleChange(e)}}
                  style={{
                    margin: 10,
                    width: 150,
                  }}
                  inputProps={{
                    step: 10,
                  }}
                />
                <TextField
                  id="max"
                  label="Max price"
                  type="number"
                  onChange={(e) => {this.handleChange(e)}}
                  style={{
                    margin: 10,
                    width: 150,
                  }}
                  inputProps={{
                    step: 10,
                  }}
                />
              </div>
              <div>
                <TextField
                  id="search"
                  label="Search field"
                  type="search"
                  onChange={(e) => {this.handleChange(e)}}
                  style={{margin: 10, width: 300}}
                  margin="normal"
                />
              </div>
              <div>
                  <Button
                    style={{margin: 10, width: 300}}
                    onClick={this.handleSearchClose}
                  >
                    <Typography variant={'button'}>
                      Search
                    </Typography>
                  </Button>
              </div>
            </Card>
        )
    }
}

MarketSearchForm.propTypes = {
    getSearchedPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  market: state.market,
});

export default connect(mapStateToProps, { getSearchedPosts })(MarketSearchForm);