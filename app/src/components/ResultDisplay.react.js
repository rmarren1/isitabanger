import React from 'react';
import Sound from 'react-sound';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  root: {
    width: '25vw',
    height: '25vh',
    margin: '0 auto'
  },
  card: {
    display: 'block',
    text: 'center'
  },
  details: {
    display: 'block',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '25vw',
    height: '25vw'
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
});


const ResultDisplay = ({ suggestion, classes, theme }) => {
  console.log(suggestion);
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h2" variant="h2">
              {suggestion.name}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              {suggestion.album.name + ' - ' + suggestion.artists[0].name}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={suggestion.album.images[0].url}
        />
      </Card>
      <Sound
          url={suggestion.preview_url}
          playStatus={Sound.status.PLAYING}
        />
    </div>
  )
};

export default withStyles(styles)(ResultDisplay);