import React from 'react';

let count = 0;

function traverse(node) {
  const { items } = node;
  return (
    `<div class="class${count++}">\n` +
    (items || []).map(n => traverse(n)).join('') +
    '\n</div>'
  );
}

export default function CssRenderer({ data }) {
  count = 0;
  return (
    <div className="html">
      <h3>HTML</h3>
      <pre>{traverse(data)}</pre>
    </div>
  );
}
