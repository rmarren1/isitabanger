import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  grid: {
    minHeight: '100vh'
  },
  albumImage: {
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    padding: 10
  },
  controls: {
    display: 'block',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  paper: {
    backgroundColor: 'rgba(40, 167, 69, 0.9)'
  },
  songTitle: {
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10
  },
  songInfo: {
    paddingLeft: 10,
    paddingRight: 10
  },
  banger: {
    color: 'white',
    fontSize: '5em',
    textShadow: `1px 1px #111, 2px 2px #111, 3px 3px #111, 4px 4px #111, 5px 5px #111,
                 6px 6px #111, 7px 7px #111, 8px 8px #111, 9px 9px #111, 10px 10px #111,
                 11px 11px #111, 12px 12px #111, 13px 13px #111, 14px 14px #111, 15px 15px #111,
                 16px 16px #111, 17px 17px #111, 18px 18px #111, 19px 19px #111, 20px 20px #111`,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    marginBottom: 20
  }
});


const ResultDisplay = ({ suggestion, classes, banger }) => {
  if ( banger ) {
    return (
      <Grid container
          spacing={0}
          justify='center'
          direction="column"
          className={classes.grid}
          alignItems="center">
        <Grid item xs={12}>
          <Typography
            className={classes.banger}
            variant="display4">
              {"IT'S A BANGER"}
          </Typography>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Paper className={classes.paper}>
            <img className={classes.albumImage} src={suggestion.album.images[0].url}/>
            <Typography
              className={classes.songTitle}
              variant="headline">
                {suggestion.name}
              </Typography>
            <Typography
              className={classes.songInfo}
              variant="subheading"
              color="textSecondary">
                {suggestion.album.name + ' - ' + suggestion.artists[0].name}
            </Typography>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <Sound url={suggestion.preview_url} playStatus={Sound.status.PLAYING}/>
          </Paper>
        </Grid>
      </Grid>
    )
  }
};

export default withStyles(styles)(ResultDisplay);