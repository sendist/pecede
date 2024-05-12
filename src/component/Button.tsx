import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

interface Props {
  label: string;
  endpoint: string;
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
  additionalProps?: any;
  response?: any;
}

const Button = ({ label, endpoint, additionalProps, onFileChange, setDefaultDisplay, response}: Props) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(additionalProps),
  };
  
  if (shouldFetch){
    response = useFetch(endpoint, options);
  }

  const handleClick = () => {
    setDefaultDisplay();
    setShouldFetch(true);
  };

  useEffect(() => {
    if (response.data) {
      onFileChange(['../static/img/img_before.jpg' + '?' + Date.now(), response.data.filePath + '?' + Date.now()]);
    }
  }, [response.data]);

  return (
    <button
      className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
