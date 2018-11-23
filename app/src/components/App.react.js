import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Search from './Search.react';
import ResultDisplay from './ResultDisplay.react';
import { getArtistInfo } from '../api';
import { head } from 'ramda';

const styles = theme => ({
    background: {
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        filter: 'blur(10px) grayscale(70%)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1
    }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        selecting: true,
        suggestion: null,
        backgroundImageUrl: null
    }
  }

  onSuggestionSelected = (event, { suggestion }) => {
      const artist = head(suggestion.artists);
      getArtistInfo(artist.id).then(artistInfo => {
        const image = head(artistInfo.images);
        this.setState({
            suggestion,
            selecting: false,
            backgroundImageUrl: image ? image.url : ''
        });
      });
  }

  render = () => {
    const { classes } = this.props;
    if (this.state.selecting) {
        return (
            <Grid container
                  spacing={0}
                  justify='center'
                  direction='row'
                  alignItems='stretch'>
                <Grid item xs={10}>
                    <Typography component='h1' variant='h1'>
                        {"IS IT A BANGER?"}
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Grid container
                        spacing={0}
                        justify='center'
                        direction='row'
                        alignItems='stretch'>
                        <Grid item xs={12}>
                            <Search onSuggestionSelected={this.onSuggestionSelected}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    } else {
        const backgroundImage = 'url(' +
                                this.state.backgroundImageUrl +
                                ')';
        return (
            <div>
                <div
                  style={{ backgroundImage }}
                  className={classes.background}>
                </div>
                <div>
                    <ResultDisplay
                      suggestion={this.state.suggestion}
                      banger={true}
                      />
                </div>
            </div>
        )
    }
  }
}

export default withStyles(styles)(App);