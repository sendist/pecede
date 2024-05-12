import { ChangeEvent, useState } from "react";

interface Props {
  onUpload: (fileUpload: string, filePath: string[]) => void;
}

const FileUpload = ({onUpload} : Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.filePath);
      onUpload(data.filePath, [data.filePath]);
    } else {
      console.error("File upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className="border-2 bg-slate-800 px-2 py-1 text-white" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
