import { useState } from "react";

interface Props {
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
}

const Thresholding = ({ onFileChange, setDefaultDisplay }: Props) => {
  const [lowerThres, setLowerThres] = useState<number>(0);
  const [upperThres, setUpperThres] = useState<number>(0);

  const handleClick = async () => {
    console.log(JSON.stringify({ lowerThres, upperThres }));
    const response = await fetch(`http://127.0.0.1:5000/thresholding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lowerThres, upperThres }),
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange([
        "../static/img/img_before.jpg" + "?" + Date.now(),
        data.filePath + "?" + Date.now(),
      ]);
    } else {
      console.error("Image modification failed");
    }
    setDefaultDisplay();
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-4">Segmentation</h1>
      <div className="flex flex-col items-center">
        <label htmlFor="lower_thres">Batas Bawah</label>
        <input
          className="border-2 border-black w-[45%] mb-2 text-center"
          type="number"
          name="lower_thres"
          placeholder="0-255"
          value={lowerThres}
          onChange={(e) => setLowerThres(parseInt(e.target.value))}
        />
        <label htmlFor="upper_thres">Batas Atas</label>
        <input
          className="border-2 border-black w-[45%] text-center"
          type="number"
          name="upper_thres"
          placeholder="0-255"
          value={upperThres}
          onChange={(e) => setUpperThres(parseInt(e.target.value))}
        />
        <button
          className="w-32 h-16 border mt-4 bg-slate-900 text-white px-2 py-1"
          onClick={handleClick}
        >
          Thresholding
        </button>
      </div>
    </>
  );
};

export default Thresholding;
