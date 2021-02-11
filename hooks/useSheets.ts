import { useEffect, useState } from 'react';
import drive from 'drive-db';

function useSheets(options) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    if (data) return;
    drive(options).then(setData);
  }, data);
  return data;
};

export default useSheets;