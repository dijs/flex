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
        A tool for planning out flex layouts
      </Typography>
      <div className="preview">
        <Item {...preview} add={addToActive} remove={removeFromActive} />
      </div>
      <Typography variant="p">
        Hover over the elements above to add or remove children to the selected
        element. Click to make an element active. The properties below are for
        the currently active element.
      </Typography>
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
