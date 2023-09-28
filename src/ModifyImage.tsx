import FileUpload from "./FileUpload";
import { useState } from "react";
import Button from "./Button";
import Thresholding from "./Thresholding";
import Histogram from "./Histogram";
import GetHistogram from "./GetHistogram";
import Crop from "./Crop";
import CropContainer from "./CropContainer";
import { useRef } from "react";
import ButtonState from "./ButtonState";
import ShowRGB from "./ShowRGB";
import ButtonWithInput from "./ButtonWithInput";

const ModifyImage = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [showHistogram, setShowHistogram] = useState<boolean>(false);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [lebar, setLebarP] = useState<number>(0);
  const [tinggi, setTinggiP] = useState<number>(0);
  const [random, setRandom] = useState<boolean>(false);
  const [showRGB, setShowRGB] = useState<boolean>(false);

  const handleUpload = (filePath: string) => {
    setUploadedImage(filePath);
    setFilePath(filePath);
  };

  const handleFileChange = (filePath: string) => {
    setFilePath(filePath);
  };

  const handleHistogram = (filePaths: string[]) => {
    setFilePaths(filePaths);
    setShowHistogram(true);
  };

  const setDefaultDisplay = () => {
    setShowHistogram(false);
    setShowRGB(false);
    setShowCrop(false);
  };

  const getImage = () => {
    if (uploadedImage) {
      if (showCrop) {
        return <CropContainer lebar={lebar} tinggi={tinggi} random={random} />;
      } else {
        return (
          <>
            <img
              ref={imgRef}
              className="min-h-[40vh] min-w-[27vw] max-h-[40vh] max-w-[27vw] object-contain justify-self-end"
              src={filePath ? filePath : "../static/img/img_now.jpg"}
              alt=""
            />
            <p>
              Ukuran:{" "}
              {imgRef.current?.offsetHeight +
                " x " +
                imgRef.current?.offsetWidth}{" "}
              px
            </p>
          </>
        );
      }
    } else {
      return <FileUpload onUpload={handleUpload} />;
    }
  };

  return (
    <section className="flex flex-row justify-start gap-x-4 w-full">
      <div className="flex flex-col gap-y-2 w-[21vw] h-[87vh] pr-4 overflow-auto shrink-0">
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Umum</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Normal"
              method="normal"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Grayscale"
              method="grayscale"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Zoom In"
              method="zoomin"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Zoom Out"
              method="zoomout"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Pergeseran</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Geser Kiri"
              method="move_left"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Geser Kanan"
              method="move_right"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Geser Atas"
              method="move_up"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Geser Bawah"
              method="move_down"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Penerangan</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Terang (*)"
              method="brightness_multiplication"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Gelap (/)"
              method="brightness_division"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Terang (+)"
              method="brightness_addition"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Gelap (-)"
              method="brightness_substraction"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Analisis Gambar</h1>
          {/* <Button name="Histogram" method="histogram_rgb" onFileChange={handleFileChange}  /> */}
          <GetHistogram onFileChange={handleHistogram} />
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Pemrosesan Gambar</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Histogram Equalizer"
              method="/histogram_equalizer"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Filter Gambar</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Edge Detection"
              method="/edge_detection"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Blur"
              method="blur"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Sharpening"
              method="sharpening"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <Thresholding onFileChange={handleFileChange} />
        </section>
        <section className="border-2 border-black p-4">
          <Crop
            onFileChange={handleFileChange}
            setLebarP={setLebarP}
            setTinggiP={setTinggiP}
            setRandom={setRandom}
            setShowCrop={setShowCrop}
          />
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">RGB</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <ButtonState name="Show RGB" onclick={setShowRGB} />
          </div>
        </section>

        <h1 className="font-bold text-xl my-4">W6 FILTER</h1>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Filter</h1>
          <div className="grid grid-cols-2 justify-items-center gap-y-2">
            <Button
              name="Identity"
              method="identity"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Blur"
              method="blur"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <ButtonWithInput
              name="CV Blur"
              method="cv-blur"
              onFileChange={handleFileChange}
            />
            <ButtonWithInput
              name="Gaussian Blur"
              method="gaussian-blur"
              onFileChange={handleFileChange}
            />
            <ButtonWithInput
              name="Median Blur"
              method="median-blur"
              onFileChange={handleFileChange}
            />
            <Button
              name="Sharpen"
              method="sharpen"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Bilateral"
              method="bilateral"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Zero Padding"
              method="zero-padding"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Lowpass Filter"
              method="lowpass"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Bandpass Filter"
              method="bandpass"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
      </div>

      <div className="w-full h-[87vh] flex flex-col justify-center items-start border-2 border-black">
        <div className="self-center">{getImage()}</div>

        <div className="container flex justify-center mt-4">
          {showHistogram && <Histogram filePaths={filePaths} />}
        </div>
      </div>
      {showRGB && <ShowRGB />}
    </section>
  );
};

export default ModifyImage;
