interface Props {
  onFileChange: (filePaths: string[]) => void;
}
const GetHistogram = ({onFileChange} : Props) => {
  const handleClick = async () => {
    const response = await fetch(`http://127.0.0.1:5000/histogram_rgb`, {
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
    //   onFileChange(data.filePaths.map((filePath: string) => filePath + "?" + Date.now()));
      onFileChange(data.filePaths)
      console.log(data.filePaths);
    } else {
      console.error("Image modification failed");
    }
  };

  return (
    <>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
    <button
      className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1"
      onClick={handleClick}
    >
    Histogram
    </button>
    </div>
    </>
  )
}

export default GetHistogram