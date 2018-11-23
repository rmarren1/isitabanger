import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
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

const styles = theme => ({
  albumImage: {
    boxSizing: 'border-box',
    height: '70%',
    width: '70%'
  },
  controls: {
    display: 'block',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  voteContainer: {
    textAlign: 'center'
  },
  paper: {
    backgroundColor: 'rgba(40, 167, 69, 0.9)',
    padding: 16
  },
  banger: {
    color: 'white',
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
        <Slider min={0}
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
      volume: 80
    };
  }

  togglePlay = () => {
    this.setState({
      play: !this.state.play
    })
  }

  vote = (banger) => {
    console.log(banger);
  }

  onVolumeChange = (volume) => {
    this.setState({
      volume
    });
  }

  render = () => {
    const { classes, suggestion, banger } = this.props;
    if ( banger ) {
      return (
        <ResultDisplayContainer>
          <Grid item xs={12}>
            <Typography
              className={classes.banger}
              variant="display4">
                IT'S A BANGER
            </Typography>
          </Grid>
          <Grid item xs={10} sm={4}>
            <Paper className={classes.paper}>
              <Grid container
                    justify='center'
                    direction='column'
                    spacing={16}
                    alignItems='stretch'>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                  <img className={classes.albumImage} src={suggestion.album.images[0].url}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="headline">
                      {suggestion.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subheading"
                    color="textSecondary">
                      {suggestion.album.name + ' - ' + suggestion.artists[0].name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                    volume={this.state.volume}
                  />
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                  <VoteControls
                    vote={this.vote}
                    voteContainerClassName={classes.voteContainer}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </ResultDisplayContainer>
      )
    }
  }
};

export default withStyles(styles)(ResultDisplay);