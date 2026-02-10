# Offline Document Viewer

A 100% **Offline-First Document Viewer** built with **React + Vite**, supporting multiple file formats, fully processed in the browser without any server uploads.  

---

## 📌 Features

- **Multi-Format Support**
  - PDF
  - Excel (XLSX / XLS)
  - Word (DOCX)
  - RTF
  - Markdown
  - Images

- **Privacy-First**
  - All files are processed locally in the browser
  - No server uploads or data transmission
  - Files are cleared on page refresh to ensure privacy

- **Optimized Rendering**
  - Large Excel datasets rendered with virtualization (`@tanstack/react-virtual`)
  - Smooth scrolling and minimal DOM updates
  - Offline-first, fast performance

- **Offline Usage**
  - Fully functional without internet after initial page load
  - All file processing happens locally

---

## 🛠 Tech Stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Excel Processing:** `xlsx`
- **Virtualization:** `@tanstack/react-virtual`
- **Markdown Rendering:** `marked`
- **PDF Rendering:** `react-pdf`

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/csnishant/Tryidol.git
cd offline-doc-viewer
npm install
npm run dev
