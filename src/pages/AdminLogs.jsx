import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/admin/logs?page=${page}&limit=${limit}`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();
        setLogs(data.logs || []);
        setTotal(data.total || 0);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch logs");
        setLoading(false);
      }
    };
    fetchLogs();
  }, [page]);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      navigate("/admin/login");
    } catch {
      navigate("/admin/login");
    }
  };

  // Download current page logs as PDF
  function handleDownloadPDF(logsToDownload, pageNum) {
    const doc = new jsPDF();
    doc.text(`Parking Logs - Page ${pageNum}`, 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [["Sensor", "Status", "Timestamp"]],
      body: logsToDownload.map((log) => [
        log.sensor,
        log.status,
        log.timestamp,
      ]),
    });
    doc.save(`parking_logs_page_${pageNum}.pdf`);
  }

  // Download all logs as PDF
  async function handleDownloadAllPDF() {
    try {
      const res = await fetch(`${API}/admin/logs?page=1&limit=100000`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch all logs");
      const data = await res.json();
      const allLogs = data.logs || [];
      const doc = new jsPDF();
      doc.text("Parking Logs - All", 14, 15);
      autoTable(doc, {
        startY: 25,
        head: [["Sensor", "Status", "Timestamp"]],
        body: allLogs.map((log) => [log.sensor, log.status, log.timestamp]),
      });
      doc.save("parking_logs_all.pdf");
    } catch (err) {
      alert("Failed to download all logs as PDF.");
    }
  }

  window.addEventListener("click", () => setShowOptions(false));

  return (
    <div className="max-w-4xl mx-auto mt-4 mb-8 px-2 sm:px-4">
      <div className="flex justify-between items-center gap-4 mb-3 py-4">
        <h1 className="text-3xl font-bold">Parking Logs</h1>
        {/* Collapsible download options for mobile */}
        <div className="w-max sm:hidden relative">
          <button
            className="w-max bg-gray-100 px-4 py-2 rounded font-medium text-gray-700 focus:outline-none flex justify-between items-center"
            onClick={(e) => { setShowOptions((v) => !v); e.stopPropagation(); }}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={showOptions}
          >
            Options
            <svg className={`ml-2 transition-transform ${showOptions ? 'rotate-180' : ''}`} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div
            className={`absolute right-0 z-20 w-max bg-white border border-gray-200 rounded shadow transition-opacity duration-200 ${showOptions ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} origin-top mt-1`}
            role="listbox"
          >
            <div
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800"
              onClick={(e) => { handleDownloadPDF(logs, page); setShowOptions(false); e.stopPropagation(); }}
              role="option"
            >
              Download Current Page (PDF)
            </div>
            <div
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-800"
              onClick={(e) => { handleDownloadAllPDF(); setShowOptions(false); e.stopPropagation(); }}
              role="option"
            >
              Download All Logs (PDF)
            </div>
            <div
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-red-600"
              onClick={(e) => { handleLogout(); setShowOptions(false); e.stopPropagation(); }}
              role="option"
            >
              Logout
            </div>
          </div>
        </div>
        {/* Download options for desktop */}
        <div className="hidden sm:flex flex-row gap-2 w-max sm:w-auto">
          <button
            onClick={(e) => { handleDownloadPDF(logs, page); e.stopPropagation(); }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Current Page (PDF)
          </button>
          <button
            onClick={(e) => { handleDownloadAllPDF(); e.stopPropagation(); }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download All Logs (PDF)
          </button>
          <button
            onClick={(e) => { handleLogout(); e.stopPropagation(); }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2 sm:mt-0"
          >
            Logout
          </button>
        </div>
        {/* Logout button always visible */}
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : logs.length === 0 ? (
        <div>No logs found.</div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-start">Sensor</th>
                <th className="py-2 px-4 border-b text-start">Status</th>
                <th className="py-2 px-4 border-b text-start">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="py-2 px-4 border-b">{log.sensor}</td>
                  <td className="py-2 px-4 border-b">{log.status}</td>
                  <td className="py-2 px-4 border-b">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-2 py-1">
          Page {page} of {Math.max(1, Math.ceil(total / limit))}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminLogs;
