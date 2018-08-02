import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const styles = {
  minWidth: 320,
  maxWidth: 370
};
const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, props }) => (
  <div>
    <TextField
      style={{ width: "100%" }}
      label="Events Location"
      placeholder=""
      //error={props.location ? props.location : ''}
      {...getInputProps({
        placeholder: "Enter Location",
        className: "location-search-input"
      })}
    />

    <div className="autocomplete-dropdown-container">
      {suggestions.map(suggestion => {
        const className = suggestion.active
          ? "suggestion-item--active"
          : "suggestion-item";
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: "#fafafa", cursor: "pointer" }
          : { backgroundColor: "#ffffff", cursor: "pointer" };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style
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
