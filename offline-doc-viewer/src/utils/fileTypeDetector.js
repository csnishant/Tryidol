export function detectFileType(file) {
  if (!file) return null;

  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) return "pdf";

  if (name.endsWith(".docx")) return "docx";

  if (name.endsWith(".md") || name.endsWith(".markdown")) return "markdown";

  if (name.endsWith(".xls") || name.endsWith(".xlsx")) return "excel";

  if (name.endsWith(".rtf")) return "rtf";

  if (
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".webp")
  )
    return "image";

  return "unsupported";
}
