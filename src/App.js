import React, { useState, useContext } from 'react';

import Typography from '@material-ui/core/Typography';

import Item from './Item';
import Editor from './Editor';
import ActivePathContext from './ActivePathContext';
import usePreview from './usePreview';
import Example from './Source';

function App() {
  const { preview, add, remove, modify, data } = usePreview();
  const { activePath } = useContext(ActivePathContext);

  function addToActive() {
    add(activePath);
  }

  function removeFromActive() {
    remove(activePath);
  }

  return (
    <div className="container">
      <Typography variant="h2" component="h1">
        FlexGen
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A helpful tool to plan out flex layouts
      </Typography>
      <div className="preview">
        <Item {...preview} add={addToActive} remove={removeFromActive} />
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
