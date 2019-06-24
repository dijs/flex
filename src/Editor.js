import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const flexItemProperties = [
  {
    name: 'Grow',
    id: 'flexGrow',
    defaultValue: '0',
    description:
      'This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up.'
  },
  {
    name: 'Shrink',
    id: 'flexShrink',
    defaultValue: '1',
    description:
      'This defines the ability for a flex item to shrink if necessary.'
  },
  {
    name: 'Basis',
    id: 'flexBasis',
    defaultValue: 'auto',
    description:
      'This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or height property" (which was temporarily done by the main-size keyword until deprecated). The content keyword means "size it based on the item\'s content" - this keyword isn\'t well supported yet, so it\'s hard to test and harder to know what its brethren max-content, min-content, and fit-content do. '
  },
  {
    name: 'Flex',
    id: 'flex',
    defaultValue: '0 1',
    description:
      'This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto. It is recommended that you use this shorthand property rather than set the individual properties. The short hand sets the other values intelligently.'
  },
  {
    name: 'Align Self',
    id: 'alignSelf',
    defaultValue: 'auto',
    options: 'auto,flex-start,flex-end,center,baseline,stretch'.split(','),
    description:
      'This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.'
  }
];

const flexContainerProperties = [
  {
    name: 'Direction',
    id: 'flexDirection',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
    defaultValue: 'row',
    description:
      'This establishes the main-axis, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.'
  },
  {
    name: 'Wrap',
    id: 'flexWrap',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
    defaultValue: 'nowrap',
    description:
      'By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.'
  },

  {
    name: 'Justify Content',
    id: 'justifyContent',
    description:
      'This defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.',
    defaultValue: 'flex-start',
    options: 'center,start,end,left,right,space-around,space-between,space-evenly'.split(
      ','
    )
  },
  {
    name: 'Align Items',
    id: 'alignItems',
    defaultValue: 'stretch',
    description:
      'This defines the default behavior for how flex items are laid out along the cross axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).',
    options: 'stretch,flex-start,flex-end,center,baseline'.split(',')
  },
  {
    name: 'Align Content',
    id: 'alignContent',
    description:
      "This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis. This property has no effect when there is only one line of flex items.",
    options: 'flex-start,flex-end,center,space-between,space-around,stretch'.split(
      ','
    )
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
      <Paper className="paper">
        <Typography variant="h6">For Container</Typography>
        {flexContainerProperties.map(prop => (
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
      </Paper>
      <Paper className="paper">
        <Typography variant="h6">For Item</Typography>
        {flexItemProperties.map(prop => (
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
      </Paper>
    </div>
  );
}
