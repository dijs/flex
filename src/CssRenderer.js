import React from 'react';

let count = 0;

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
  return <pre>{JSON.stringify(classes, null, 3)}</pre>;
}
