
import * as XLSX from "xlsx";

const ExcelViewer = ({ file }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  }, [file]);

  return (
    <div>
      <h2>Excel Viewer</h2>
      <table border="1">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewer;
