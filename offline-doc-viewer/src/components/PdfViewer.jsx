import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // legacy build works better with Vite
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry"; // worker entry

// Offline-safe worker using a blob
pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
  new Blob([pdfjsWorker], { type: "application/javascript" }),
);

export default function PdfViewer({ file }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(reader.result).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        renderTaskRef.current = page.render({
          canvasContext: context,
          viewport,
        });
        await renderTaskRef.current.promise;
        renderTaskRef.current = null;
      } catch (err) {
        if (err?.name !== "RenderingCancelledException") {
          console.error(err);
        }
      }
    };

    reader.readAsArrayBuffer(file);

    return () => {
      if (renderTaskRef.current) renderTaskRef.current.cancel();
    };
  }, [file]);

  return <canvas ref={canvasRef} />;
}
