import { useState } from "react";

interface Props {
  onFileChange: (filePath: string) => void;
  setLebarP: (lebar: number) => void;
  setTinggiP: (lebar: number) => void;
  setRandom: (random: boolean) => void;
}

const Crop = ({ onFileChange, setLebarP, setTinggiP, setRandom}: Props) => {
  const [lebar, setlebar] = useState<number>(0);
  const [tinggi, settinggi] = useState<number>(0);

  const handleClick = async () => {
    console.log(JSON.stringify({ lebar, tinggi }));
    const response = await fetch(`http://127.0.0.1:5000/crop`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lebar, tinggi }),
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange(data.filePath + "?" + Date.now());
      // console.log(data.filePath);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-4">Crop</h1>
      <label htmlFor="lebar">Lebar</label>
      <div></div>
      <input
        className="border-2 border-black"
        type="number"
        name="lebar"
        placeholder="0"
        value={lebar}
        onChange={(e) => {setlebar(parseInt(e.target.value)); setLebarP(parseInt(e.target.value))}}
      />
      <div></div>
      <label htmlFor="tinggi">Tinggi</label>
      <div></div>
      <input
        className="border-2 border-black"
        type="number"
        name="tinggi"
        placeholder="0"
        value={tinggi}
        onChange={(e) => {settinggi(parseInt(e.target.value)); setTinggiP(parseInt(e.target.value))}}
      />
      <div className="grid grid-cols-2 justify-items-center gap-y-2">
      <button
        className="w-32 h-16 border mt-4 bg-slate-900 text-white px-2 py-1"
        onClick={() => {handleClick(), setRandom(false)}}
      >
        Crop
      </button>
      <button
        className="w-32 h-16 border mt-4 bg-slate-900 text-white px-2 py-1"
        onClick={() => {handleClick(); setRandom(true)}}
      >
        Random Crop
      </button>
      </div>
    </>
  );
};

export default Crop;