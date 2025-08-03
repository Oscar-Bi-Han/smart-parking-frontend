import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
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
        const res = await fetch(`${API}/admin/logs?page=${page}&limit=${limit}`,
          { credentials: "include" });
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

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Parking Logs</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownloadPDF(logs, page)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Current Page (PDF)
          </button>
          <button
            onClick={handleDownloadAllPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download All Logs (PDF)
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
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
        <div className="overflow-x-auto">
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
        <span className="px-2 py-1">Page {page} of {Math.max(1, Math.ceil(total / limit))}</span>
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

// Download current page logs as PDF
const handleDownloadPDF = (logsToDownload, pageNum) => {
  const doc = new jsPDF();
  doc.text(`Parking Logs - Page ${pageNum}`, 14, 15);
  autoTable(doc, {
    startY: 25,
    head: [["Sensor", "Status", "Timestamp"]],
    body: logsToDownload.map((log) => [log.sensor, log.status, log.timestamp]),
  });
  doc.save(`parking_logs_page_${pageNum}.pdf`);
};

// Download all logs as PDF
const handleDownloadAllPDF = async () => {
  try {
    const res = await fetch(`${API}/admin/logs?page=1&limit=100000`, { credentials: "include" });
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
};

export default AdminLogs;
