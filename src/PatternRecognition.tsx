import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
  setHasilDeteksi: (hasil: string) => void;
}

const PatternRecognition = ({ onFileChange, setDefaultDisplay, setHasilDeteksi}: Props) => {
  const [selectedOption, setselectedOption] = useState("detect-number");

  const handleClick = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/${selectedOption}`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      setHasilDeteksi(data.hasilDeteksi)
      onFileChange([
        "../static/img/img_after.jpg" + "?" + Date.now(),
        data.filePath + "?" + Date.now(),
      ]);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <div className="w-full px-4">
      <form action="">
        <input
          type="radio"
          id="low"
          value="detect-number"
          checked={selectedOption == "detect-number"}
          onChange={(e) => {
            setselectedOption(e.target.value);
          }}
        />
        <label htmlFor="low"> Knowledge Base Normal</label>
        <br />
        <input
          type="radio"
          id="high"
          value="detect-number-thinning"
          checked={selectedOption == "detect-number-thinning"}
          onChange={(e) => {
            setselectedOption(e.target.value);
          }}
        />
        <label htmlFor="high"> Knowledge Base Thinning</label>
        <br />
      </form>
      <div>
        <div className="grid gap-y-1 mt-4 overflow-auto"></div>
        <button
          className="w-full h-16 border bg-slate-900 text-white px-2 py-1 mt-4"
          onClick={handleClick}
        >
          Recognize Number
        </button>
      </div>
    </div>
  );
};

export default PatternRecognition;
