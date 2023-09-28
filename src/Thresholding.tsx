import { useState } from "react";

interface Props {
  onFileChange: (filePath: string) => void;
}

const Thresholding = ({ onFileChange }: Props) => {
  const [lowerThres, setLowerThres] = useState<number>(0);
  const [upperThres, setUpperThres] = useState<number>(0);

  const handleClick = async () => {
    console.log(JSON.stringify({ lowerThres, upperThres }));
    const response = await fetch(`http://127.0.0.1:5000/thresholding`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lowerThres, upperThres }),
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
      <h1 className="font-bold text-xl mb-4">Segmentation</h1>
      <label htmlFor="lower_thres">Batas Bawah</label>
      <div></div>
      <input
        className="border-2 border-black"
        type="number"
        name="lower_thres"
        placeholder="0-255"
        value={lowerThres}
        onChange={(e) => setLowerThres(parseInt(e.target.value))}
      />
      <div></div>
      <label htmlFor="upper_thres">Batas Atas</label>
      <div></div>
      <input
        className="border-2 border-black"
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
    </>
  );
};

export default Thresholding;
