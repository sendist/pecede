interface Props {
  name: string;
  method: string;
  onFileChange: (filePath: string) => void;
}

const ButtonWithInput = ({ name, method, onFileChange }: Props) => {
  const handleClick = async () => {
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
    <>
    <div>
      <button
        className="w-32 h-16 border bg-slate-900 text-white px-2 py-1"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
      <div className="flex flex-col gap-y-1 mt-1">
        <input className="border-2 border-slate-800 w-32" type="number" />
        <input className="border-2 border-slate-800 w-32" type="number" />
      </div>
    </>
  );
};

export default ButtonWithInput;
