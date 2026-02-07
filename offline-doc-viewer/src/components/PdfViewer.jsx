import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfViewer({ file }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const pdf = await pdfjsLib.getDocument(reader.result).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  return <canvas ref={canvasRef} />;
}
