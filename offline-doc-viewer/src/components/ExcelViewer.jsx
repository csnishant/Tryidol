import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useVirtualizer } from "@tanstack/react-virtual";

const ROW_HEIGHT = 36;

export default function ExcelViewer({ file }) {
  const [rows, setRows] = useState([]);
  const parentRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setRows(data || []);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  if (!rows.length) return <p>Loading Excel…</p>;

  return (
    <div
      ref={parentRef}
      style={{
        height: "500px",
        overflow: "auto",
        border: "1px solid #ddd",
      }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
              display: "flex",
              borderBottom: "1px solid #eee",
            }}>
            {(rows[virtualRow.index] || []).map((cell, i) => (
              <div
                key={i}
                style={{
                  minWidth: 150,
                  padding: "6px 8px",
                  borderRight: "1px solid #eee",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
