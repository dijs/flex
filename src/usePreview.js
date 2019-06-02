import { useState } from 'react';
import { get, set, cloneDeep } from 'lodash';

const basePreview = {
  items: []
};

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
      if (items) {
        set(newPreview, [...path, 'items'], [...items, {}]);
      } else {
        set(newPreview, [...path], { items: [{}] });
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
