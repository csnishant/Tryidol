import { useEffect, useState } from "react";

export default function RtfViewer({ file }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result;

      // basic RTF cleanup (plain-text extraction)
      content = content
        .replace(/\\par[d]?/g, "\n")
        .replace(/\\'[0-9a-fA-F]{2}/g, "")
        .replace(/\\[a-z]+\d*/g, "")
        .replace(/[{}]/g, "");

      setText(content);
    };

    reader.readAsText(file);
  }, [file]);

  return (
    <pre className="whitespace-pre-wrap text-sm text-gray-800">
      {text || "Loading RTF..."}
    </pre>
  );
}
