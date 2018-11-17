import React from 'react';
import search from '../api/search';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import SearchInput from './SearchInput.react';
import SearchSuggestion from './SearchSuggestion.react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  }
});

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
    const { classes } = this.props;
    const { value, suggestions } = this.state;
 
    const inputProps = {
      classes,
      placeholder: 'Type a song.',
      value,
      onChange: this.onChange
    };
 
    return (
      <div className={classes.root}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={SearchSuggestion}
          renderInputComponent={SearchInput}
          inputProps={inputProps}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Search);