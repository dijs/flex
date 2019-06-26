import React, { useState, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Item from './Item';
import Editor from './Editor';
import ActivePathContext from './ActivePathContext';
import usePreview from './usePreview';
import Templates from './Examples';
import Source from './Source';

function App() {
  const { preview, add, remove, modify, data, set, reset } = usePreview();
  const { activePath } = useContext(ActivePathContext);

  const addToActive = () => add(activePath);
  const removeFromActive = () => remove(activePath);

  window.peep = () => console.log(JSON.stringify(preview));

  return (
    <div className="container">
      <Typography variant="h2" component="h1">
        FlexGen
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        A tool for planning out flex layouts
      </Typography>
      <div className="top">
        <Templates onSelect={template => set(template)} />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={reset}
        >
          clear layout
        </Button>
      </div>
      <div className="preview">
        <Item {...preview} add={addToActive} remove={removeFromActive} />
      </div>
      <Typography variant="caption">
        Hover over the elements above to add or remove children to the selected
        element. Click to make an element active. The properties below are for
        the currently active element.
      </Typography>
      <main>
        <Editor
          data={data(activePath)}
          onChange={data => modify(activePath, data)}
        />
        <Source preview={preview} />
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
