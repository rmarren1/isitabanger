import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Search from './Search.react';
import ResultDisplay from './ResultDisplay.react';
import { getArtistInfo, search, classifyBanger } from '../api';
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
    },
    gridContainer: {
        paddingTop: '30vh'
    },
    gridContainerSearching: {
        paddingTop: '10vh',
        transition: 'padding-top .5s'
    },
    landingTitle: {
        fontFamily: 'Bangers',
        textAlign: 'center'
    },
    landingButtonIcon: {
        height: 64,
        width: 64,
        color: 'black'
    },
    landingButtonContainer: {
        width: '100%',
        textAlign: 'center'
    }

});

const DEFAULT_STATE = {
    selecting: true,
    suggestion: null,
    backgroundImageUrl: null,
    searchClicked: false,
    banger: null
}

class App extends React.Component {
  constructor() {
    super();
    this.state = DEFAULT_STATE; 
  }

  onSuggestionSelected = (event, { suggestion }) => {
      const artist = head(suggestion.artists);
      getArtistInfo(artist.id).then(artistInfo => {
        const image = head(artistInfo.images);
        classifyBanger(suggestion.id).then(banger => {
            this.setState({
                suggestion,
                banger: banger.prediction,
                selecting: false,
                backgroundImageUrl: image ? image.url : ''
            });
        });
      });
  }

  resetState = () => {
      this.setState(DEFAULT_STATE);
  }

  onClickSearch = () => {
    this.setState({ searchClicked: true });
  }

  onClickRandom = async () => {
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const result = await search(
          possible[Math.floor(Math.random() * 27)],
          1,
          Math.floor(Math.random() * 10000)
      );
      this.onSuggestionSelected(null, { suggestion: result[0] });
  }

  render = () => {
    const { classes } = this.props;
    if (this.state.selecting) {
        return (
            <Grid container
                  justify='center'
                  className={
                      this.state.searchClicked ?
                        classes.gridContainerSearching :
                        classes.gridContainer
                    }
                  direction='row'
                  alignItems='stretch'>
                <Grid item xs={12}>
                    <Typography
                      className={classes.landingTitle}
                      component='h1'
                      variant='h1'>
                        {"IS IT A BANGER?"}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Grid container
                        spacing={0}
                        justify='center'
                        direction='row'
                        alignItems='stretch'>
                        <Grid item xs={10}>
                            {
                                this.state.searchClicked ?
                                (<Search onSuggestionSelected={this.onSuggestionSelected}/>) :
                                (
                                  <div className={classes.landingButtonContainer}>
                                    <Tooltip title="Search">
                                        <IconButton
                                        onClick={this.onClickSearch}>
                                        <SearchIcon className={classes.landingButtonIcon}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Random">
                                        <IconButton
                                        onClick={this.onClickRandom}>
                                        <ShuffleIcon className={classes.landingButtonIcon}/>
                                        </IconButton>
                                    </Tooltip>
                                  </div>
                                )
                            }
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
                      banger={this.state.banger}
                      resetState={this.resetState}
                      />
                </div>
            </div>
        )
    }
  }
}

export default withStyles(styles)(App);