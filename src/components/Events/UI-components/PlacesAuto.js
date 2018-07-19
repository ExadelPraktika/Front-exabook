import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
const styles = {
  minWidth: 320,
  maxWidth: 370,
}
const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (

  <div>
    <FormControl style={styles} >
    <InputLabel>Events Location</InputLabel>
    <Input 
      {...getInputProps({
        placeholder: 'Enter Location',
        className: 'location-search-input',
      })}    
    />
    </FormControl>

    <div className="autocomplete-dropdown-container">
      {suggestions.map(suggestion => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item';
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
          : { backgroundColor: '#ffffff', cursor: 'pointer' };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  </div>
);
export default renderFunc;