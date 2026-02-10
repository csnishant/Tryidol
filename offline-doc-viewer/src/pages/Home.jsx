import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { detectFileType } from "../utils/fileTypeDetector";
import PdfViewer from "../components/PdfViewer";
import ImageViewer from "../components/ImageViewer";
import DocxViewer from "../components/DocxViewer";
import RtfViewer from "../components/RtfViewer";
import MarkdownViewer from "../components/MarkdownViewer";
import ExcelViewer from "../components/ExcelViewer";

const VIEWER_MAP = {
  docx: DocxViewer,
  markdown: MarkdownViewer,
  pdf: PdfViewer,
  image: ImageViewer,
  rtf: RtfViewer,
  excel: ExcelViewer,
};

function Home() {
  const [file, setFile] = useState(null);
  const fileType = file ? detectFileType(file) : null;

  const renderViewer = () => {
    if (!file) return null;
    const Viewer = VIEWER_MAP[fileType];

    return Viewer ? (
      <Viewer file={file} />
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500 italic">
        Preview not available for this file type.
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              OFFLINE READER
            </h1>
            <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-medium">
              Privacy-first document viewing
            </p>
          </div>

          {file && (
            <button
              onClick={() => setFile(null)}
              className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-tighter transition-colors border border-red-200 px-3 py-1 rounded bg-red-50">
              Clear File [X]
            </button>
          )}
        </div>

        <main>
          {!file ? (
            /* Upload State */
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-10 md:p-20 text-center shadow-sm">
              <div className="max-w-xs mx-auto">
                <FileUploader onFileSelect={setFile} />
                <p className="mt-4 text-xs text-gray-400 font-mono">
                  Supported: PDF • DOCX • XLSX • MD • IMG • RTF
                </p>
              </div>
            </div>
          ) : (
            /* Viewer State */
            <div className="flex flex-col bg-white rounded-xl shadow-2xl ring-1 ring-gray-200 overflow-hidden">
              {/* File Info Bar */}
              <div className="px-5 py-3 bg-gray-900 text-white flex justify-between items-center overflow-hidden">
                <span className="text-sm font-mono truncate mr-4">
                  {file.name}
                </span>
                <span className="text-[10px] bg-white text-gray-900 px-2 py-0.5 rounded font-black uppercase flex-shrink-0">
                  {fileType}
                </span>
              </div>

              {/* Responsive Viewer Window */}
              <div className="relative w-full h-[65vh] md:h-[75vh] bg-gray-100 overflow-auto scrollbar-thin">
                <div className="min-h-full p-2 md:p-6">{renderViewer()}</div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
            No data leaves your device
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
