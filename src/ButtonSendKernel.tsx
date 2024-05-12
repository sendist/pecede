interface Props {
  label: string;
  kernel : string[][];
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
  endpoint: string;
  operation: string;
}

const ButtonSendKernel = ({ label, kernel, onFileChange, setDefaultDisplay, endpoint, operation}: Props) => {
  const handleClick = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kernel, operation}),
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange(['../static/img/img_before.jpg' + "?" + Date.now() ,data.filePath + "?" + Date.now()]);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <button
      className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1 mt-4"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ButtonSendKernel;
