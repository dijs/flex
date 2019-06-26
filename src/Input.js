import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function Input({
  name,
  id,
  options = [],
  data,
  setter,
  description,
  defaultValue
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="property">
      <TextField
        label={name}
        fullWidth
        placeholder={defaultValue || ''}
        helperText={active ? description : ''}
        value={data[id] || ''}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e =>
          setter({
            ...data,
            [id]: e.target.value
          })
        }
        InputLabelProps={{
          shrink: true
        }}
        select={!!options.length}
      >
        {options.length &&
          options.map(prop => {
            return (
              <MenuItem key={prop} value={prop}>
                {prop}
              </MenuItem>
            );
          })}
      </TextField>
    </div>
  );
}
