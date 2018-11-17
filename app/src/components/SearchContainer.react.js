import React from 'react';
import search from '../api/search';
import Autosuggest from 'react-autosuggest';
import Suggestion from './Suggestion.react';


const getSuggestions = async value => {
  return await search(value, 10).then(
    items => (
      value.length === 0 ?
      [] :
      items
    )
  );
};
 
const getSuggestionValue = suggestion => suggestion.name;
 
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
 
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
 
  onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(suggestions => {
      this.setState({
        suggestions
      });
    });
  };
 
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
 
  render() {
    const { value, suggestions } = this.state;
 
    const inputProps = {
      placeholder: 'Type a song.',
      value,
      onChange: this.onChange
    };
 
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={Suggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Search;