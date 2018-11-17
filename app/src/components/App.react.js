import React from 'react';
import Search from './Search.react';
import ResultDisplay from './ResultDisplay.react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        selecting: true,
        suggestion: null
    }
  }

  onSuggestionSelected = (event, { suggestion }) => {
      this.setState({
          selecting: false,
          suggestion
      });
  }

  render = () => {
    if (this.state.selecting) {
        return (
            <Search onSuggestionSelected={this.onSuggestionSelected}/>
        )
    } else {
        return (
            <ResultDisplay suggestion={this.state.suggestion}/>
        )
    }
  }
}

export default App;