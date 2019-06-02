import React, { useState, useEffect } from 'react';

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
  }
];

export default function Editor({ data, onChange }) {
  const [options, setOptions] = useState(data);
  useEffect(() => setOptions(data), [data]);
  return (
    <div className="editor">
      {flexProperties.map(prop => (
        <Input key={prop.id} {...prop} data={options} setter={setOptions} />
      ))}
      <br />
      <button onClick={() => onChange({ ...data, ...options })}>Update</button>
    </div>
  );
}
