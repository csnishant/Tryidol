import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { detectFileType } from "../utils/fileTypeDetector";
import PdfViewer from "../components/PdfViewer";
import ImageViewer from "../components/ImageViewer";
import DocxViewer from "../components/DocxViewer";
import RtfViewer from "../components/RtfViewer";
import MarkdownViewer from "../components/MarkdownViewer";
import ExcelViewer from "../components/ExcelViewer";

function Home() {
  const [file, setFile] = useState(null);
  const fileType = file ? detectFileType(file) : null;

  const renderViewer = () => {
    if (!file) return null;

    if (fileType === "docx") {
      return <DocxViewer file={file} />;
    }

    if (fileType === "markdown") {
      return <MarkdownViewer file={file} />;
    }
    if (fileType === "pdf") {
      return <PdfViewer file={file} />;
    }
    if (fileType === "image") {
      return <ImageViewer file={file} />;
    }
    if (fileType === "rtf") {
      return <RtfViewer file={file} />;
    }
    if (fileType === "excel") {
      return <ExcelViewer file={file} />;
    }
  };

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
        <div className="mt-6 border rounded min-h-[400px] p-4 overflow-auto">
          {renderViewer()}
        </div>
      </div>
    </div>
  );
}

export default Home;
