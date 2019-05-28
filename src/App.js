import React, { useState, useEffect, useContext } from 'react';
import { get, set } from 'lodash';

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

function App() {
  const [preview, setPreview] = useState(basePreview);
  const { activePath } = useContext(ActivePathContext);
  const pathData = get(preview, activePath) || preview;
  return (
    <div className="container">
      <h1>FlexGen</h1>
      <Item {...preview} />
      <button
        onClick={() => {
          const items = pathData.items;
          const newThing = set(
            preview,
            [...activePath, 'items'],
            [...items, {}]
          );
          setPreview(newThing);
        }}
      >
        +
      </button>
      <Editor
        data={pathData}
        onChange={data => {
          const newPreview = set(preview, activePath, data);
          setPreview(newPreview);
        }}
      />
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
