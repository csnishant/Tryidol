
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfViewer = ({ file }) => {
  return (
    <div>
      <h2>PDF Viewer</h2>
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfViewer;
