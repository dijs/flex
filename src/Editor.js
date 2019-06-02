import React, { useState, useEffect } from 'react';

function input(name, value, setter) {
  return (
    <label>
      {name}
      <input type="text" value={value} onChange={e => setter(e.target.value)} />
    </label>
  );
}

export default function Editor({ data, onChange }) {
  const [flexDirection, setFlexDirection] = useState(data.flexDirection || '');
  const [flex, setFlex] = useState(data.flex || '');
  useEffect(() => {
    setFlexDirection(data.flexDirection || '');
    setFlex(data.flex || '');
  }, [data]);
  return (
    <div className="editor">
      {input('Direction', flexDirection, setFlexDirection)}
      {input('Flex', flex, setFlex)}
      <br />
      <button onClick={() => onChange({ ...data, flexDirection, flex })}>
        Update
      </button>
    </div>
  );
}
