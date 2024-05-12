interface Props {
  kernel : string[][];
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
}

const ButtonCustomFilter = ({ kernel, onFileChange, setDefaultDisplay}: Props) => {
  const handleClick = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/custom-filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kernel }),
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
      className="w-full h-16 border bg-slate-900 text-white px-2 py-1 mt-4"
      onClick={handleClick}
    >
      Filter
    </button>
  );
};

export default ButtonCustomFilter;
