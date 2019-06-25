import React, { useContext } from 'react';
import ActivePathContext from './ActivePathContext';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

export default function Item({
  depth = 0,
  index = 0,
  add,
  remove,
  items,
  path = [],
  ...other
}) {
  const { activePath, setActivePath } = useContext(ActivePathContext);
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
      <div className="controls">
        <IconButton size="small" onClick={add}>
          <AddIcon />
        </IconButton>
        <IconButton size="small" onClick={remove}>
          <RemoveIcon />
        </IconButton>
      </div>
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
            add={add}
            remove={remove}
          />
        ))}
    </div>
  );
}
