import React, { useState, useContext } from 'react';
import { get, set, cloneDeep } from 'lodash';
import Editor from './Editor';

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
  const x = Math.sin(seed) * 10000;
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
  const { activePath, setActivePath } = useContext(ActivePathContext);
  const seed = depth * 8 + index;
  const backgroundColor = randomPastel(seed);
  const active = path.join('') === activePath.join('');
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
      {active && (
        <React.Fragment>
          <div className="active top-left" />
          <div className="active top-right" />
          <div className="active bottom-left" />
          <div className="active bottom-right" />
        </React.Fragment>
      )}
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

function usePreview() {
  const [preview, setPreview] = useState(basePreview);
  return {
    preview,
    data: path => get(preview, path) || preview,
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
    },
    remove: path => {
      const pathData = get(preview, path) || preview;
      const items = pathData.items;
      const newPreview = cloneDeep(preview);
      if (!items) {
        return;
      }
      const restItems = items.slice(0, items.length - 1);
      set(newPreview, [...path, 'items'], restItems);
      setPreview(newPreview);
    }
  };
}

function App() {
  const { preview, add, remove, modify, data } = usePreview();
  const { activePath } = useContext(ActivePathContext);
  return (
    <div className="container">
      <h1>FlexGen</h1>
      <button onClick={() => add(activePath)}>+</button>
      <button onClick={() => remove(activePath)}>-</button>
      <Item {...preview} />
      <Editor
        data={data(activePath)}
        onChange={data => modify(activePath, data)}
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
