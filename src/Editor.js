import React, { useState, useEffect } from 'react';

const flexProperties = [
  {
    name: 'Direction',
    id: 'flexDirection',
    options: ['row', 'column']
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

function Input({ name, id, options = [], data, setter }) {
  if (options.length) {
    return (
      <label>
        {name}
        <select
          value={data[id] || ''}
          onChange={e =>
            setter({
              ...data,
              [id]: e.target.value
            })
          }
        >
          <option key="blank" />
          {options.map(prop => (
            <option key={prop}>{prop}</option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label>
      {name}
      <input
        type="text"
        value={data[id] || ''}
        onChange={e =>
          setter({
            ...data,
            [id]: e.target.value
          })
        }
      />
    </label>
  );
}

export default function Editor({ data, onChange }) {
  const [options, setOptions] = useState(data);
  useEffect(() => {
    console.log('effect');
    setOptions(data);
  }, [data]);

  return (
    <div className="editor">
      <h3>Properties</h3>
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
