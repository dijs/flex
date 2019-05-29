import React, { useState, useEffect, useContext } from 'react';
import { get, set, cloneDeep } from 'lodash';

const ActivePathContext = React.createContext();

// This should be editable by user in a easy way
const basePreview = {
  items: []
  // flexDirection: 'column',
  // justifyContent: 'space-between',
  // items: [
  //   { items: [{}, { flex: 1 }] },
  //   {
  //     justifyContent: 'space-around',
  //     items: [
  //       {
  //         flexDirection: 'column',
  //         items: [{}, {}]
  //       },
  //       {}
  //     ]
  //   },
  //   { items: [{}, { flex: 1 }] }
  // ]
};

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const pastelParts = 'abcdef'.split('');

function randomPastelPart(seed) {
  return pastelParts[Math.floor(random(seed) * pastelParts.length)];
}

function randomPastel(seed) {
  return (
    '#' +
    randomPastelPart(seed) +
    randomPastelPart(seed + 1) +
    randomPastelPart(seed + 2) +
    randomPastelPart(seed + 3) +
    randomPastelPart(seed + 4) +
    randomPastelPart(seed + 5)
  );
}

function Item({ depth = 0, index = 0, items, path = [], ...other }) {
  const { setActivePath } = useContext(ActivePathContext);
  const seed = depth * 8 + index;
  const backgroundColor = randomPastel(seed);
  return (
    <div
      className="item"
      onClick={e => {
        e.stopPropagation();
        setActivePath(path);
      }}
      style={{
        display: 'flex',
        backgroundColor,
        ...other
      }}
    >
      {items &&
        items.map((item, i) => (
          <Item
            {...item}
            depth={depth + 1}
            path={[...path, 'items', i]}
            index={i}
            key={i}
          />
        ))}
    </div>
  );
}

function Editor({ data, onChange }) {
  const [text, setText] = useState(JSON.stringify(data, null, 3));
  useEffect(() => {
    setText(JSON.stringify(data, null, 3));
  }, [data]);
  return (
    <textarea
      onBlur={() => {
        onChange(JSON.parse(text));
      }}
      onChange={e => setText(e.target.value)}
      value={text}
    />
  );
}

function usePreview() {
  const [preview, setPreview] = useState(basePreview);

  return {
    preview,
    modify: (path, data) => {
      if (path.length) {
        const newPreview = cloneDeep(preview);
        set(newPreview, path, data);
        setPreview(newPreview);
      } else {
        setPreview(data);
      }
    },
    add: path => {
      const pathData = get(preview, path) || preview;
      const items = pathData.items;
      const newPreview = cloneDeep(preview);
      if (items) {
        set(newPreview, [...path, 'items'], [...items, {}]);
      } else {
        set(newPreview, [...path], { items: [{}] });
      }
      setPreview(newPreview);
    }
  };
}

function App() {
  const { preview, add, modify } = usePreview();
  const { activePath } = useContext(ActivePathContext);
  const pathData = get(preview, activePath) || preview;
  return (
    <div className="container">
      <h1>FlexGen</h1>
      <Item {...preview} />
      <button onClick={() => add(activePath)}>+</button>
      <Editor data={pathData} onChange={data => modify(activePath, data)} />
    </div>
  );
}

function Provider() {
  const [activePath, setActivePath] = useState([]);
  return (
    <ActivePathContext.Provider
      value={{
        activePath,
        setActivePath
      }}
    >
      <App />
    </ActivePathContext.Provider>
  );
}

export default Provider;
