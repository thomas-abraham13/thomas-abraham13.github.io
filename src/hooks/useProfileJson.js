import { useEffect, useState } from 'react';
import { loadJson } from '../utils/data';

function useProfileJson(endpoint) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadData = async () => {
      try {
        const json = await loadJson(endpoint);

        if (isActive) {
          setData(json);
        }
      } catch {
        if (isActive) {
          setData(null);
        }
      }
    };

    loadData();

    // A route can unmount before its JSON finishes loading.
    return () => {
      isActive = false;
    };
  }, [endpoint]);

  return data;
}

export default useProfileJson;
