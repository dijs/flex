import React from 'react';
import Button from '@material-ui/core/Button';
import kebabCase from 'lodash/kebabCase';

let count = 0;

function getStyles({ items, ...options }) {
  let css = `.class${count++} {\n`;
  if (items) {
    css += '\tdisplay: flex;\n';
  }
  css += Object.keys(options)
    .map(key => {
      return `\t${kebabCase(key)}: ${options[key]};\n`;
    })
    .join('');
  css += '}\n';
  return css;
}

function buildStyles(node, styles = '') {
  styles += getStyles(node);
  if (node.items) {
    node.items.forEach(n => (styles = buildStyles(n, styles)));
  }
  return styles;
}

export default function CssRenderer({ data }) {
  count = 0;
  return (
    <div className="css">
      <pre>{buildStyles(data)}</pre>
      <Button size="small" variant="contained" color="primary">
        Copy
      </Button>
    </div>
  );
}
