import React, { useContext } from 'react';
import ActivePathContext from './ActivePathContext';

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

export default function Item({
  depth = 0,
  index = 0,
  items,
  path = [],
  ...other
}) {
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
