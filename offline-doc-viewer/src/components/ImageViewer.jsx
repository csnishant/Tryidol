import { useEffect, useState } from "react";

export default function ImageViewer({ file }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!src) return null;

  return (
    <img src={src} alt="Preview" className="max-w-full max-h-[600px] mx-auto" />
  );
}
