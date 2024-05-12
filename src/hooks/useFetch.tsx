import { useState, useEffect } from 'react';

// interface FetchResult<T> {
  // data: T | null;
  // isLoading: boolean;
  // error: string | null;
// }

const useFetch = (url: string, options?: RequestInit) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};

export default useFetch;
