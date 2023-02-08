import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

function useFetchData<T>(): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        API
          .get('textAPI', '/texts/text', {})
          .then(res => setData(res))

      } catch (err) {
        setError("Error fetching...");
        console.log('error!', err)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return [data, loading, error];
}

export default useFetchData