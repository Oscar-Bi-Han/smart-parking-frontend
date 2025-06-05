import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Example data for lots and their spaces
const lots = [
  {
    id: 1,
    name: "Central Plaza",
    spaces: [
      { id: 1, available: true },
      { id: 2, available: false },
      { id: 3, available: true },
      { id: 4, available: false },
      { id: 5, available: true },
    ],
  },
  {
    id: 2,
    name: "West End Lot",
    spaces: [
      { id: 1, available: true },
      { id: 2, available: true },
      { id: 3, available: false },
      { id: 4, available: true },
    ],
  },
  {
    id: 3,
    name: "Mall Parking",
    spaces: [
      { id: 1, available: false },
      { id: 2, available: false },
      { id: 3, available: false },
    ],
  },
];

const LotSpaces = () => {
  const { lotId } = useParams();
  const lot = lots.find((l) => l.id === Number(lotId));
  const [reserved, setReserved] = useState({});
  const [backendSpaces, setBackendSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/spaces", {withCredentials: true});
        setBackendSpaces(response.data);
        console.log("Fetched spaces from backend:", response.data);
      } catch (error) {
        console.error("Error fetching spaces from backend:", error);
      }
    };

    fetchSpaces();
  }, []);

  if (!lot) {
    return <div className="py-8 text-center text-lg">Lot not found.</div>;
  }
  const prefix = lot.name.charAt(0).toUpperCase();
  const handleReserve = (spaceId) => {
    setReserved((prev) => ({ ...prev, [spaceId]: !prev[spaceId] }));
  };
  return (
    <div className="py-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Spaces in {lot.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {lot.spaces.map((space, idx) => (
          <div
            key={space.id}
            className={`rounded-lg p-4 flex flex-col items-center shadow border-2 transition-all ${space.available ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50 opacity-70"}`}
          >
            <span className="text-lg font-bold mb-2">{`${prefix}${idx + 1}`}</span>
            <span className={`text-xs font-semibold ${space.available ? "text-green-700" : "text-red-600"}`}>
              {space.available ? "Available" : "Occupied"}
            </span>
            {space.available ? (
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
