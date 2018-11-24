import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';

import { vote } from '../api';

const styles = theme => ({
  "@global": {
    h1: {
      fontSize: '10rem'
    }
  },
  root: {
    flexGrow: 1
  },
  albumImage: {
    boxSizing: 'border-box',
    height: '50%',
    width: '50%'
  },
  controls: {
    display: 'block',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  textCenter: { textAlign: 'center' },
  paper: { backgroundColor: '#DDD', padding: 16 },
  spotifyButton: {
    backgroundColor: '#1DB954',
    '&:hover': {
      backgroundColor: '#1ed760'
    }
  },
  banger: {
    color: 'white',
    fontFamily: 'Bangers',
    fontSize: '5em',
    textShadow: `1px 1px #111, 2px 2px #111, 3px 3px #111, 4px 4px #111, 5px 5px #111,
                 6px 6px #111, 7px 7px #111, 8px 8px #111, 9px 9px #111, 10px 10px #111,
                 11px 11px #111, 12px 12px #111, 13px 13px #111, 14px 14px #111, 15px 15px #111,
                 16px 16px #111, 17px 17px #111, 18px 18px #111, 19px 19px #111, 20px 20px #111`,
    textAlign: 'center',
    marginBottom: 20
  }
});

const ResultDisplayContainer = ({ children }) => {
  return (
    <Grid container
          justify='center'
          direction='column'
          alignItems='center'>
      {children}
    </Grid>
  );
}

const SoundControls = ({togglePlay, playState, onVolumeChange, volume}) => {
  return (
    <Grid container
          direction='row'
          alignItems='stretch'
    >
      <Grid item xs={2}>
        <IconButton aria-label="Play/pause"
                    onClick={togglePlay}>
          {
            playState ?
              <PauseIcon/> :
              <PlayArrowIcon/>
          }
        </IconButton>
      </Grid>

      <Grid item xs={2}>
        <IconButton>
          <VolumeDownIcon/>
        </IconButton>
      </Grid>

      <Grid item xs={6}>
        <Slider
          min={0}
          max={100}
          step={1}
          value={volume}
          style={{top: '50%'}}
          onChange={(event, value) => onVolumeChange(value)}/>
      </Grid>

      <Grid item xs={2}>
        <IconButton>
          <VolumeUpIcon/>
        </IconButton>
      </Grid>
    </Grid>
  )
}

const VoteControls = ({ vote, voteContainerClassName }) => {
  return (
    <Grid container
          direction='row'
          alignItems='center'
    >

      <Grid item xs={12} className={voteContainerClassName}>
        <Typography variant="overline">
          Do you think it's a banger?
        </Typography>
      </Grid>

      <Grid item xs={6} className={voteContainerClassName}>
        <IconButton
          aria-label="Vote Banger"
          onClick={() => vote(true)}>
          <ThumbsUpIcon/>
        </IconButton>
      </Grid>

      <Grid item xs={6} className={voteContainerClassName}>
        <IconButton
          aria-label="Vote Not Banger"
          onClick={() => vote(false)}>
          <ThumbsDownIcon/>
        </IconButton>
      </Grid>

    </Grid>
  );
}

class ResultDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      play: true,
      volume: 80,
      voted: false
    };
  }

  togglePlay = () => {
    this.setState({
      play: !this.state.play
    })
  }

  vote = (banger) => {
    this.setState({voted: true});
    vote(this.props.suggestion.id, banger);
  }

  onVolumeChange = (volume) => {
    this.setState({
      volume
    });
  }

  render = () => {
    const { classes, suggestion, banger, resetState } = this.props;
    return (
      <div className={classes.root}>
        <ResultDisplayContainer>
          <Grid item xs={12}>
            <Typography
              className={classes.banger}
              style={{color: banger ? 'green': 'red'}}
              variant="display4">
                {banger ? "IT'S A BANGER" : "NOT A BANGER"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container
                    justify='center'
                    direction='column'
                    spacing={8}
                    alignItems='stretch'>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                  <img className={classes.albumImage} src={suggestion.album.images[0].url}/>
                </Grid>
                <Grid item xs={12} className={classes.textCenter}>
                  <Typography
                    variant="headline">
                      {suggestion.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.textCenter}>
                  <Typography
                    variant="subheading"
                    color="textSecondary">
                      {suggestion.album.name + ' - ' + suggestion.artists[0].name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {
                    suggestion.preview_url ?
                    (
                      <div>
                        <SoundControls
                          togglePlay={this.togglePlay}
                          playState={this.state.play}
                          onVolumeChange={this.onVolumeChange}
                          volume={this.state.volume}/>
                        <Sound
                          url={suggestion.preview_url}
                          playStatus={
                            this.state.play ?
                              Sound.status.PLAYING :
                              Sound.status.PAUSED
                          }
                          volume={this.state.volume}/>
                      </div>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{textAlign: 'center'}}
                      >
                          {"No song preview available for this song"}
                      </Typography>
                    )
                  }
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                  {
                    this.state.voted ? (
                      <Button
                        onClick={resetState}
                        variant="contained"
                        color="primary"
                        fullWidth>
                        Search again
                      </Button>
                    ) : (
                      <VoteControls
                        vote={this.vote}
                        voteContainerClassName={classes.textCenter}
                      />
                    )
                  }
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={suggestion.external_urls.spotify}
                    className={classes.spotifyButton}
                    fullWidth>
                    Play on Spotify
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </ResultDisplayContainer>
      </div>
    )
  }
};

export default withStyles(styles)(ResultDisplay);