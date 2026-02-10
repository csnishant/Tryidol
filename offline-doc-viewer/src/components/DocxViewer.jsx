import { useEffect, useState } from "react";
import mammoth from "mammoth";

export default function DocxViewer({ file }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setHtml(result.value);
      } catch (err) {
        setError("Failed to render DOCX file");
        console.error(err);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="prose max-w-none overflow-auto p-4">
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="text-gray-500">Loading DOCX...</p>
      )}
    </div>
  );
}
