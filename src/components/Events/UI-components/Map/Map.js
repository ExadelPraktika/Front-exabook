import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  LocationOn,
} from "@material-ui/icons";

const AnyReactComponent = ({ text }) => <div styles={{textAlign: 'center'}}><strong>Here</strong> <br/><LocationOn fontSize='default' color="primary" /></div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 11,
      center: {
        lat: 59.95,
        lng: 30.33
      }
    }
}
componentDidMount(){
  this.setState({
    center: {
      lat: !this.props.lat ? null : this.props.lat,
      lng: !this.props.lng ? null : this.props.lng
    }
  })
}

 

  render() {
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '160px', width: '200px' }}>
        <GoogleMapReact
         zoom={this.state.zoom}
          bootstrapURLKeys={{ key: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1bOngjF_oq_j2XRHyXYD1Zqh12nKlEfE&v=3.exp&libraries=geometry,drawing,places" }}
          center={this.state.center}
        >
          <AnyReactComponent
            lat={!this.props.lat ? null : this.props.lat}
            lng={!this.props.lng ? null : this.props.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;