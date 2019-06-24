import React from 'react';
import Button from '@material-ui/core/Button';

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
      <pre>{traverse(data)}</pre>
      <Button size="small" variant="contained" color="primary">
        Copy
      </Button>
    </div>
  );
}
