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
import Renders from './Renderers';

function App() {
  const { preview, add, remove, modify, data } = usePreview();
  const { activePath } = useContext(ActivePathContext);
  return (
    <div className="container">
      <Typography variant="h1" gutterBottom>
        FlexGen
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
        <Renders preview={preview} />
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
