import { useState } from "react";

function shuffleArray(array: string[]) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let images: string[] = [];
for (let i = 1; i < 15; i++) {
  images.push(`../static/img/matching/img_matching_${i}.jpg`);
  images.push(`../static/img/matching/img_matching_${i}.jpg`);
}
shuffleArray(images);

const MatchingCitra = () => {
  const [selected, setselected] = useState<string>("");
  const [selectedIndex, setselectedIndex] = useState<number>();
  const [matchedImage, setmatchedImage] = useState<string[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [clickedIndex2, setClickedIndex2] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false)
  const [tinggi, setTinggi] = useState<number>(0);
  const [lebar, setLebar] = useState<number>(0);
  let score = matchedImage.length;

  const handleClick = (url: string, index: number) => {
    if (selected === "") {
      setselected(url);
      setselectedIndex(index);
    } else {
      if (selected === url && selectedIndex !== index) {
        setmatchedImage([...matchedImage, selected]);
        setselected("");
        console.log(matchedImage);
        console.log("sama");
      } else {
        setselected("");
        setselectedIndex(15);
        console.log("beda");
      }
    }
  };

 const handleFlip = (index : number) => {
    if (clickedIndex === null) {
      setClickedIndex(index);
    } else if (clickedIndex2 === null) {
      setClickedIndex2(index);
    } else {
      setClickedIndex(null);
      setClickedIndex2(null);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setTimeout(() => {
      setShowHint(false);
    }, 1000);
  }

  return (
    <div className="flex flex-col">
      <div className="text-left ml-12 mb-4">
      <div>
        <p>Score: {score}</p>
      <button
        className="border bg-slate-900 text-white px-2 py-1"
        onClick={handleHint}
      >
        Hint
      </button>
      <button
        className="border bg-slate-900 text-white px-2 py-1"
        onClick={handleHint}
      >
        Surrender
      </button>
      </div>
      </div>
      <div className="grid grid-cols-7 px-12">
        {/* {images.map((image, index) => (
          <div key={index} className="bg-gray-200 p-[1px] ">
            <img
              src={`${image}?${Date.now()}`}
              alt={`Image ${index}`}
              className="object-cover"
              onClick={() => {handleClick(image)}}
            />
          </div>
        ))} */}
        {images.map((image, index) => (
          <div key={index} className={`${clickedIndex === index || clickedIndex2 === index || matchedImage.includes(image) || showHint ? "flip-box-flip" : "flip-box"} h-[90px]`}>
            <div className="flip-box-inner">
              <div className="flip-box-back">
                <img
                  src={image}
                  alt={`Image of {image}`}
                  className="object-cover"
                />
              </div>
              <div className="flip-box-front flex justify-center items-center" onClick={() => handleFlip(index)}>
                <img
                  src="public/vite.svg"
                  alt={`Image of {image}`}
                  className="object-cover"
                  onClick={() => {handleClick(image, index)}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingCitra;
