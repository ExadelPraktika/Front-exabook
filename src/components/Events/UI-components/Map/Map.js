// import React from "react";
// import ReactDOM from "react-dom";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";

// const MyMapComponent = compose(
//   withProps({
//     /**
//      * Note: create and replace your own key in the Google console.
//      * https://console.developers.google.com/apis/dashboard
//      * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
//      */
    
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1bOngjF_oq_j2XRHyXYD1Zqh12nKlEfE&v=3.exp&libraries=geometry,drawing,places",
      
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `200px`, width: `200px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: parseFloat(props.cord1), lng: parseFloat(props.cord2) }}>
//     {props.isMarkerShown && (
//       <Marker position={{ lat: parseFloat(props.cord1), lng: parseFloat(props.cord2) }} />
//     )}
//     {console.log(props.cord1, props.cord2)}
//   </GoogleMap>
// ));
// export default MyMapComponent;
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  LocationOn,
} from "@material-ui/icons";

const AnyReactComponent = ({ text }) => <div styles={{textAlign: 'center'}}><strong>Here</strong> <br/><LocationOn fontSize='default' color="primary" /></div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
    console.log(parseFloat(this.props.lat))
    
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