import { useEffect, useState } from 'react';

export const useQuery = <T>(func: () => Promise<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (func) {
      setLoading(true);
      func()
        .then(data => {
          setData(data);
        })
        .catch(e => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);
  return { isLoading, error, data };
};
