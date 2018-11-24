import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import * as R from 'ramda';

function Suggestion(suggestion, { isHighlighted }) {
  const albumImageLens = R.lensPath(['album', 'images', 2, 'url']);
  return (
    <MenuItem key={suggestion.id} button selected={isHighlighted} component="div">
      <Avatar
          alt={suggestion.name}
          style={{borderRadius: 0}}
          src={R.view(albumImageLens, suggestion)} />
      <ListItemText
        primary={suggestion.name}
        secondary={
          suggestion.album.name + ' - ' +
          R.join(', ', R.pluck('name', suggestion.artists))
        } />
    </MenuItem>
  );
}

export default Suggestion;