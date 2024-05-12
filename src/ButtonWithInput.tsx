import { useState } from "react";

interface Props {
  name: string;
  method: string;
  onFileChange: (filePath: string[]) => void;
}

const ButtonWithInput = ({ name, method, onFileChange }: Props) => {
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const handleClick = async () => {
    const response = await fetch(`http://127.0.0.1:5000/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input1, input2 }),
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange([
        "../static/img/img_before.jpg" + "?" + Date.now(),
        data.filePath + "?" + Date.now(),
      ]);
      console.log(data.filePath);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <>
    <div className="grid grid-cols-2 justify-items-center gap-y-2 mt-2 border-2 border-slate-700 py-2">
      <div className="w-full flex justify-center">
        <button
          className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1"
          onClick={handleClick}
        >
          {name}
        </button>
      </div>
      <div>
        <h2>Kernel Size:</h2>
        <div className="flex flex-row gap-x-2 mt-1">
          <input
            className="border-2 border-slate-800 w-10 text-center"
            type="number"
            value={input1}
            onChange={(e) => {
              setInput1(parseInt(e.target.value));
            }}
          />
          x
          <input
            className="border-2 border-slate-800 w-10 text-center"
            type="number"
            value={input2}
            onChange={(e) => {
              setInput2(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default ButtonWithInput;
