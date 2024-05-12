interface Props {
  name: string;
  onFileChange: (filePath: string[]) => void;
  setDefaultDisplay: () => void;
  setPlayMatching: (isPlay : boolean) => void;
}

const ButtonMatchingCitra = ({ name, onFileChange, setDefaultDisplay, setPlayMatching}: Props) => {
  const handleClick = async () => {
    setDefaultDisplay();
    const response = await fetch(`http://127.0.0.1:5000/start-matching-citra`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      onFileChange(['../static/img/img_before.jpg' + "?" + Date.now() ,data.filePath + "?" + Date.now()]);
    } else {
      console.error("Image modification failed");
    }
    setPlayMatching(true);
  };

  return (
    <button
      className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default ButtonMatchingCitra;
