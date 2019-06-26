import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const examples = [
  '{"backgroundColor":"#F2F1F0","items":[{"backgroundColor":"#165c7d","flex":"1"},{"backgroundColor":"#77c5d5","flex":"2","items":[{"backgroundColor":"#DECD63"},{"backgroundColor":"#719949"},{"backgroundColor":"#3F4444"}],"flexDirection":"column"},{"backgroundColor":"#C63527","flex":"1"}]}',
  '{"backgroundColor":"#F2F1F0","items":[{"backgroundColor":"#165c7d","items":[{"backgroundColor":"#DECD63","flex":"1"},{"backgroundColor":"#719949","flex":"2"},{"backgroundColor":"#3F4444","flex":"3"}]},{"backgroundColor":"#77c5d5","items":[{"backgroundColor":"#DECD63","flex":"2"},{"backgroundColor":"#719949","flex":"3"},{"backgroundColor":"#3F4444","flex":"4"}]},{"backgroundColor":"#C63527","items":[{"backgroundColor":"#DECD63","flex":"3"},{"backgroundColor":"#719949","flex":"4"},{"backgroundColor":"#3F4444","flex":"5"}]}],"flexDirection":"column"}',
  '{"backgroundColor":"#F2F1F0","items":[{"backgroundColor":"#165c7d","flex":"1","items":[{"backgroundColor":"#DECD63"}],"justifyContent":"center","alignItems":"center"},{"backgroundColor":"#77c5d5","flex":"2","items":[{"backgroundColor":"#DECD63"},{"backgroundColor":"#719949"},{"backgroundColor":"#3F4444"}],"flexDirection":"column"}]}'
];

export default function Examples({ onSelect }) {
  return (
    <TextField
      label="Choose an example layout"
      fullWidth
      value={''}
      onChange={e => onSelect(JSON.parse(e.target.value))}
      select
    >
      <MenuItem value={examples[0]}>Three column example</MenuItem>
      <MenuItem value={examples[1]}>Offset widths example</MenuItem>
      <MenuItem value={examples[2]}>Post example</MenuItem>
    </TextField>
  );
}
