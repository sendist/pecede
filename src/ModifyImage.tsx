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
import CustomFilter from "./CustomFilter";
import Slider from "./Slider";
import ButtonMatchingCitra from "./ButtonMatchingCitra";
import MatchingCitra from "./MatchingCitra";
import PatternRecognition from "./PatternRecognition";
import useFetch from "./hooks/useFetch";
import Button2 from "./component/Button";
import MorphologicalOperations from "./MorphologicalOperations";

const ModifyImage = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string[]>([]);
  const [showHistogram, setShowHistogram] = useState<boolean>(false);
  const [filePaths, setFilePaths] = useState<string[]>([]);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [lebar, setLebarP] = useState<number>(0);
  const [tinggi, setTinggiP] = useState<number>(0);
  const [random, setRandom] = useState<boolean>(false);
  const [showRGB, setShowRGB] = useState<boolean>(false);
  const [showMatchingCitra, setshowMatchingCitra] = useState<boolean>(false);
  const [hasilDeteksi, setHasilDeteksi] = useState<string | null>(null);
  const baseURL = "http://127.0.0.1:5000/"

  const handleUpload = (fileUpload: string, filePath: string[]) => {
    setUploadedImage(fileUpload);
    setFilePath(filePath);
  };

  const handleFileChange = (filePath: string[]) => {
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
    setshowMatchingCitra(false);
    setHasilDeteksi(null);
  };

  const getImage = () => {
    if (uploadedImage) {
      if (showCrop) {
        return <CropContainer lebar={lebar} tinggi={tinggi} random={random} />;
      } else if (showMatchingCitra) {
        return <MatchingCitra />;
      } else {
        return (
          <>
            {/* <p className="ml-12">
              Ukuran:{" "}
              {imgRef.current?.naturalWidth +
                " x " +
                imgRef.current?.naturalHeight}{" "}
              px
            </p> */}
            <div className="flex flex-row justify-evenly mt-4">
              <div>
                <h2 className="font-bold text-xl">Before:</h2>
                <img
                  ref={imgRef}
                  className="min-h-[40vh] min-w-[27vw] max-h-[40vh] max-w-[27vw] object-contain justify-self-end"
                  // src={filePath ? filePath : "../static/img/img_before.jpg"}
                  src={filePath[0]}
                  alt=""
                />
              </div>
              <div>
                <h2 className="font-bold text-xl">After:</h2>
                <img
                  ref={imgRef}
                  className="min-h-[40vh] min-w-[27vw] max-h-[40vh] max-w-[27vw] object-contain justify-self-end"
                  src={filePath[1]}
                  alt=""
                />
              </div>
            </div>
            { hasilDeteksi &&

              <div className="flex flex-col justify-center items-center mt-12">
                <h2 className="font-bold text-xl">Hasil Deteksi: {hasilDeteksi}</h2>
              </div>
            }
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
          <div className="grid grid-cols-1 justify-items-center gap-y-2">
            <Slider
              min={-10}
              max={10}
              method="brightness_multiplication_division"
              name="multiplication/division"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <br />
            <Slider
              min={-30}
              max={30}
              method="brightness_addition_substraction"
              name="addition/substraction"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <br />
            <Button
              name="Konfirmasi Perubahan"
              method="confirm_brightness_mod"
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
          <Thresholding
            onFileChange={handleFileChange}
            setDefaultDisplay={setDefaultDisplay}
          />
        </section>
        <section className="border-2 border-black p-4">
          <Crop
            onFileChange={handleFileChange}
            setLebarP={setLebarP}
            setTinggiP={setTinggiP}
            setRandom={setRandom}
            setShowCrop={setShowCrop}
            setDefaultDisplay={setDefaultDisplay}
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
              method="filterIdentity"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
            <Button
              name="Blur"
              method="filterBlur"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
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
          </div>
          <div>
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
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Custom Filter</h1>
          <div className="flex flex-col gap-y-4 px-4">
            <CustomFilter
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Matching Citra</h1>
          <div className="flex justify-center">
            <ButtonMatchingCitra
              name="Start"
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
              setPlayMatching={setshowMatchingCitra}
            />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Morphological Operations</h1>
          <div className="flex justify-center">
            {/* <Button2 label="Erosion" endpoint={baseURL + "morphology"} /> */}
            <MorphologicalOperations onFileChange={handleFileChange} setDefaultDisplay={setDefaultDisplay} />
          </div>
        </section>
        <section className="border-2 border-black p-4">
          <h1 className="font-bold text-xl mb-4">Pattern Recognition</h1>
          <div className="flex justify-center">
            <PatternRecognition
              onFileChange={handleFileChange}
              setDefaultDisplay={setDefaultDisplay}
              setHasilDeteksi={setHasilDeteksi}
            />
          </div>
        </section>
      </div>

      <div className="w-full h-[87vh] flex flex-col justify-center border-2 border-black">
        <div className="w-full text-center">{getImage()}</div>

        <div className="container flex justify-center mt-4">
          {showHistogram && <Histogram filePaths={filePaths} />}
        </div>
      </div>
      {showRGB && <ShowRGB />}
    </section>
  );
};

export default ModifyImage;
