import React from 'react';
import kebabCase from 'lodash/kebabCase';
import pretty from 'pretty';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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

function buildDom(node) {
  const { items } = node;
  return (
    `<div class="class${count++}">\n` +
    (items || []).map(n => buildDom(n)).join('') +
    '\n</div>'
  );
}

function buildHtml(data) {
  count = 0;
  const css = buildStyles(data);
  count = 0;
  const body = buildDom(data);
  return pretty(`<html>
    <head>
      <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      body > div {
        flex: 1;
      }
      div {
        min-height: 64px;
        min-width: 64px;
        padding: 16px;
      }
      ${css}
      </style>
    </head>
    <body>${body}</body>
  </html>`);
}

export default function Source({ preview }) {
  const html = buildHtml(preview);
  return (
    <Paper className="example paper">
      <header>
        <Typography variant="h6">Source</Typography>
        <CopyToClipboard text={html}>
          <Button size="small" variant="contained" color="primary">
            Copy
          </Button>
        </CopyToClipboard>
      </header>
      <pre className="example">{html}</pre>
    </Paper>
  );
}
