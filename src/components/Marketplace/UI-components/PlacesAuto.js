import React from "react";
import TextField from "@material-ui/core/TextField";

const styles = {
  minWidth: 320,
  maxWidth: 370
};
const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, props }) => (
  <div>
    <TextField
      style={{ width: 300, marginLeft: 10, marginRight: 10 }}
      label="location"
      placeholder=""
      //error={props.location ? props.location : ''}
      {...getInputProps({
        placeholder: "Location",
        className: "location-search-input"
      })}
    />

    <div style={{margin: 10}} className="autocomplete-dropdown-container">
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
