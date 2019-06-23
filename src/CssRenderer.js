import React from 'react';

let count = 0;

// TODO: Convert React CSS to normal CSS

function traverse(node, classes) {
  const { items, ...options } = node;
  classes[`class${count++}`] = options;
  if (items) {
    items.forEach(n => traverse(n, classes));
  }
}

export default function CssRenderer({ data }) {
  const classes = {};
  count = 0;
  traverse(data, classes);
  return (
    <div className="css">
      <h3>CSS</h3>
      <pre>{JSON.stringify(classes, null, 3)}</pre>
    </div>
  );
}
