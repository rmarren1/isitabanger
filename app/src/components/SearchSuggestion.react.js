import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

function Suggestion(suggestion, { isHighlighted }) {
  return (
    <MenuItem key={suggestion.id} button selected={isHighlighted} component="div">
      <Avatar alt={suggestion.name} src={suggestion.album.images[2].url} />
      <ListItemText
        primary={suggestion.name}
        secondary={suggestion.album.name + ' - ' + suggestion.artists[0].name} />
    </MenuItem>
  );
}

export default Suggestion;