import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const flexProperties = [
  {
    name: 'Direction',
    id: 'flexDirection',
    options: ['row', 'column'],
    defaultValue: 'row',
    description:
      'This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.'
  },
  {
    name: 'Flex',
    id: 'flex'
  },
  {
    name: 'Justify Content',
    id: 'justifyContent',
    options: 'center,start,end,left,right,space-around,space-between,space-evenly'.split(
      ','
    )
  },
  {
    name: 'Align Items',
    id: 'alignItems',
    options: 'center,start,end,left,right'.split(',')
  },
  {
    name: 'Width',
    id: 'width'
  },
  {
    name: 'Height',
    id: 'height'
  },
  {
    name: 'Background Color',
    id: 'backgroundColor'
  }
];

function Input({
  name,
  id,
  options = [],
  data,
  setter,
  description,
  defaultValue
}) {
  return (
    <div className="property">
      <TextField
        label={name}
        fullWidth
        placeholder={defaultValue || ''}
        helperText={description || ''}
        value={data[id] || ''}
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

export default function Editor({ data, onChange }) {
  const [options, setOptions] = useState(data);
  useEffect(() => {
    console.log('effect');
    setOptions(data);
  }, [data]);

  return (
    <div className="properties">
      {flexProperties.map(prop => (
        <Input
          key={prop.id}
          {...prop}
          data={options}
          setter={updatedOptions => {
            setOptions(updatedOptions);
            onChange({ ...data, ...updatedOptions });
          }}
        />
      ))}
    </div>
  );
}
