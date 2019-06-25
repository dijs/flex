import React, { useState, useContext } from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';

import Item from './Item';
import Editor from './Editor';
import ActivePathContext from './ActivePathContext';
import usePreview from './usePreview';
import Example from './Source';

function App() {
  const { preview, add, remove, modify, data } = usePreview();
  const { activePath } = useContext(ActivePathContext);
  return (
    <div className="container">
      <Typography variant="h2" component="h1">
        FlexGen
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A helpful tool to plan out flex layouts
      </Typography>
      <ButtonGroup color="primary">
        <Button onClick={() => add(activePath)}>
          <AddIcon /> Add Child
        </Button>
        <Button onClick={() => remove(activePath)}>
          <RemoveIcon /> Remove Child
        </Button>
      </ButtonGroup>

      <div className="preview">
        <Item {...preview} />
      </div>
      <main>
        <Editor
          data={data(activePath)}
          onChange={data => modify(activePath, data)}
        />
        <Example preview={preview} />
      </main>
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
