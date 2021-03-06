import React, { Component } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import LocationIcon from '../../../components/icons/location';
import TextInput from '../../../components/TextInput'
import './styles.css'

class LocationSearchInput extends Component {

  handleSelect = async address => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    this.props.setLatLng(latLng);
    this.props.handleChange(address);
  };

  render() {
    const { placeholder, label, style } = this.props;

    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
            style={{...style}}
          >
            <TextInput {...getInputProps({
              placeholder: placeholder
            })} label={label} />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                  > <div className='icon'>
                      <LocationIcon/>
                    </div>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>)}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput;