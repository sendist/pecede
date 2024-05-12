import { useState } from "react";

interface Props {
  name: string;
  method: string;
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
  min: number;
  max: number;
}

const Slider = ({ name, method, onFileChange, setDefaultDisplay, min, max}: Props) => {
  const [value, setvalue] = useState<number>(0)

  const handleChange = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange(['../static/img/img_before.jpg' + "?" + Date.now() ,data.filePath + "?" + Date.now()]);
    } else {
      console.error("Image modification failed");
    }
    console.log(value);
  };

  return (
    <div className="flex flex-col w-[85%]">
      <label htmlFor="myRange">{name}</label>
      <input type="range" min={min} max={max} value={value} onChange={(e) => {setvalue(parseInt(e.target.value)), handleChange()}} className="slider" id="myRange" />
    </div>
  );
};

export default Slider;
