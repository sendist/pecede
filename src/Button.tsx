interface Props {
  name: string;
  method: string;
  onFileChange: (filePath: string) => void;
  setDefaultDisplay: () => void;
}

const Button = ({ name, method, onFileChange, setDefaultDisplay}: Props) => {
  const handleClick = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/${method}`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange(data.filePath + "?" + Date.now());
      console.log(data.filePath);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <button
      className="w-32 h-16 border bg-slate-900 text-white px-2 py-1"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
