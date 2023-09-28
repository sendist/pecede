interface Props {
  lebar: number;
  tinggi: number;
  random: boolean;
}

const CropContainer = ({ lebar, tinggi, random }: Props) => {
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

  let images = [];
  for (let i = 0; i < lebar; i++) {
    for (let j = 0; j < tinggi; j++) {
      images.push(`../static/img/crop/crop_${i}_${j}.jpg`);
    }
  }
  if (random) {
    shuffleArray(images);
  }

  return (
    <div
      className="justify-self-center"
      style={{ display: "grid", gridTemplateColumns: `repeat(${lebar}, 1fr)` }}
    >
      {images.map((image, index) => (
        <div key={index} className="bg-gray-200 p-[1px]">
          <img src={image} alt={`Image ${index}`} className="object-cover" />
        </div>
      ))}
    </div>
  );
};

export default CropContainer;
