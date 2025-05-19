import React from "react";

const ParkingLotItem = ({ lot }) => (
  <div className="bg-white rounded-xl shadow flex flex-col items-center relative">
    <img
      src={lot.image}
      alt={lot.name}
      className="w-full h-32 object-cover rounded-t-lg mb-2"
    />
    <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
      {lot.available} available
    </span>
    <div className="text-center py-3">
      <h3 className="font-semibold text-base md:text-lg">{lot.name}</h3>
    </div>
  </div>
);

export default ParkingLotItem;
