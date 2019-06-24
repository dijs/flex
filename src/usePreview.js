import { useState } from 'react';
import { without, get, set, cloneDeep } from 'lodash';

const basePreview = {
  backgroundColor: '#eee',
  items: []
};

const baseColors = [
  '#165c7d',
  '#77c5d5',
  '#C63527',
  '#DECD63',
  '#719949',
  '#3F4444',
  '#75787b'
];

function childColor(items = [], path, parentColor) {
  const allowedColors = without(baseColors, parentColor);
  const seed = items.length + path.length;
  return allowedColors[seed % allowedColors.length];
}

export default function usePreview() {
  const [preview, setPreview] = useState(basePreview);

  return {
    preview,
    data: path => get(preview, path) || preview,
    modify: (path, data) => {
      if (path.length) {
        const newPreview = cloneDeep(preview);
        set(newPreview, path, data);
        setPreview(newPreview);
      } else {
        setPreview(data);
      }
    },
    add: path => {
      const pathData = get(preview, path) || preview;
      const items = pathData.items;

      const newPreview = cloneDeep(preview);
      const parentColor = pathData.backgroundColor;
      const backgroundColor = childColor(items, path, parentColor);

      // TODO: Figure out how to start with default values
      const item = { backgroundColor };

      if (items) {
        set(newPreview, [...path, 'items'], [...items, item]);
      } else {
        set(newPreview, [...path], { ...pathData, items: [item] });
      }

      setPreview(newPreview);
    },
    remove: path => {
      const pathData = get(preview, path) || preview;
      const items = pathData.items;
      const newPreview = cloneDeep(preview);
      if (!items) {
        return;
      }
      const restItems = items.slice(0, items.length - 1);
      set(newPreview, [...path, 'items'], restItems);
      setPreview(newPreview);
    }
  };
}
