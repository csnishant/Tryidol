import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { detectFileType } from "../utils/fileTypeDetector";

function Home() {
  const [file, setFile] = useState(null);
  const fileType = file ? detectFileType(file) : null;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Offline Document Viewer</h1>

        <FileUploader onFileSelect={setFile} />
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Detected file type: <b>{fileType}</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
