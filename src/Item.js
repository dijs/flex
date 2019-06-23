import React, { useContext } from 'react';
import ActivePathContext from './ActivePathContext';

export default function Item({
  depth = 0,
  index = 0,
  items,
  path = [],
  ...other
}) {
  const { activePath, setActivePath } = useContext(ActivePathContext);
  // const seed = depth * 8 + index;
  // const backgroundColor = randomPastel(seed);
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
