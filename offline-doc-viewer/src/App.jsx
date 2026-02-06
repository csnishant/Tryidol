import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Selected File:", selectedFile);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Offline Document Viewer</h1>
      <input type="file" onChange={handleFile} />
      {file && <p>Selected File: {file.name}</p>}
    </div>
  );
}

export default App;
