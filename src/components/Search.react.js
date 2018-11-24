import React from 'react';
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SearchInput from './SearchInput.react';
import SearchSuggestion from './SearchSuggestion.react';
import debounce from 'debounce-promise';
import { search } from '../api';

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
    width: '100%',
    margin: '0 auto'
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
  },
});

const getSuggestions = debounce(async value => {
  return await search(value, 10).then(
    items => (
      value.length === 0 ?
      [] :
      items
    )
  );
}, 500, { leading: true, trailing: true });

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      inputDisabled: false
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
   
  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  componentDidMount() {
    this.input.focus();
  }

  render = () => {
    const { classes, onSuggestionSelected } = this.props;
    const { value, suggestions } = this.state;
 
    return (
      <div className={classes.root}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={suggestion => suggestion.name}
          renderSuggestion={SearchSuggestion}
          renderInputComponent={SearchInput}
          inputProps={{
            classes,
            value,
            onChange: this.onChange
          }}
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
          ref={this.storeInputReference}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Search);