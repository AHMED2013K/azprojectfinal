import { useState } from 'react';

export default function ExcelImportModal({ onClose, onImport }) {
  const [file, setFile] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Import leads from XLSX or CSV</h3>
          <button type="button" onClick={onClose} className="text-slate-400">Close</button>
        </div>

        <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-center">
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="mx-auto block text-sm text-slate-200"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
          The backend now parses the uploaded file directly. Use common headers like `name`, `email`, `phone`, `country`, `campaign`, and `status`.
          {file && <p className="mt-3 text-cyan-200">Selected file: {file.name}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => file && onImport(file)}
            disabled={!file}
            className="rounded-2xl bg-gradient-to-r from-sky-700 to-cyan-600 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            Upload and import
          </button>
        </div>
      </div>
    </div>
  );
}
