import { useEffect, useState } from "react";
import { marked } from "marked";

export default function MarkdownViewer({ file }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsedHtml = marked.parse(text);
        setHtml(parsedHtml);
      } catch (err) {
        setError("Failed to render Markdown file");
        console.error(err);
      }
    };

    reader.readAsText(file);
  }, [file]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="prose max-w-none overflow-auto p-4">
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="text-gray-500">Loading Markdown...</p>
      )}
    </div>
  );
}
