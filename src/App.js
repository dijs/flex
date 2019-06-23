import React, { useState, useContext } from 'react';
import Item from './Item';
import Editor from './Editor';
import ActivePathContext from './ActivePathContext';
import usePreview from './usePreview';
import CssRenderer from './CssRenderer';
import HtmlRenderer from './HtmlRenderer';

function App() {
  const { preview, add, remove, modify, data } = usePreview();
  const { activePath } = useContext(ActivePathContext);
  return (
    <div className="container">
      <h1>FlexGen</h1>
      <button onClick={() => add(activePath)}>+</button>
      <button onClick={() => remove(activePath)}>-</button>
      <div className="preview">
        <Item {...preview} />
      </div>
      <div className="bottom">
        <Editor
          data={data(activePath)}
          onChange={data => modify(activePath, data)}
        />
        <CssRenderer data={preview} />
        <HtmlRenderer data={preview} />
      </div>
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
