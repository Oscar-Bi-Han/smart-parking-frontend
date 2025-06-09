import React, { useState, useEffect } from "react";
import axios from "axios";
import { reserveSpace, cancelReservation, fetchSpaces } from "../utils/spacesApi";
import LogoutButton from "../components/LogoutButton";

const LotSpaces = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [reserved, setReserved] = useState({});
  const [backendSpaces, setBackendSpaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const spaces = await fetchSpaces();
        setBackendSpaces(spaces);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
    return () => {
      setBackendSpaces([]); // Cleanup function to reset spaces
      setReserved({}); // Reset reserved state on unmount
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const handleReserve = async (spaceId) => {
    try {
      if (reserved[spaceId]) {
        await cancelReservation(spaceId);
        console.log(`Reservation canceled for space ID: ${spaceId}`);
      } else {
        await reserveSpace(spaceId);
        console.log(`Space reserved successfully for space ID: ${spaceId}`);
      }
      setReserved((prev) => ({ ...prev, [spaceId]: !prev[spaceId] }));
    } catch (error) {
      console.error("Error handling reservation:", error);
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Spaces in Central Plaza</h2>
        <LogoutButton /> 
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {backendSpaces.map((space) => (
          <div
            key={space.id}
            className={`rounded-lg p-4 flex flex-col items-center shadow border-2 transition-all ${space.status === 0 ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50 opacity-70"}`}
          >
            <span className="text-lg font-bold mb-2">{space.sensor}</span>
            <span className={`text-xs font-semibold ${space.status === 0 ? "text-green-700" : "text-red-600"}`}>
              {space.status === 0 ? "Available" : "Occupied"}
            </span>
            {space.status === 0 ? (
              <button
                className={`mt-3 px-4 py-1 rounded font-semibold text-xs transition text-white ${reserved[space.id] ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                onClick={() => handleReserve(space.id)}
              >
                {reserved[space.id] ? "Cancel Reservation" : "Reserve"}
              </button>
            ) : (
              <span className="mt-3 px-4 py-1 bg-gray-400 text-white rounded font-semibold text-xs cursor-not-allowed">
                Occupied
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotSpaces;
