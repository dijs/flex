import { useState } from 'react';
import { get, set, cloneDeep } from 'lodash';

const basePreview = {
  backgroundColor: '#eee',
  items: []
};

function random(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const pastelParts = 'abcdef'.split('');

function randomPastelPart(seed) {
  return pastelParts[Math.floor(random(seed) * pastelParts.length)];
}

function randomPastel(seed) {
  return (
    '#' +
    randomPastelPart(seed + 1) +
    randomPastelPart(seed + 3) +
    randomPastelPart(seed + 5) +
    randomPastelPart(seed + 7) +
    randomPastelPart(seed + 9) +
    randomPastelPart(seed + 0)
  );
}

function hash(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}

function seed(items, path) {
  return hash(path.join('|') + (items ? items.length : 0));
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
      const backgroundColor = randomPastel(seed(items, path));
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
