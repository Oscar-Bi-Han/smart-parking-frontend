import React from "react";
import { Link } from "react-router-dom";
import ParkingLotItem from "./ParkingLotItem";

const lots = [
  {
    id: 1,
    name: "Central Plaza",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    available: 3, 
  },
  {
    id: 2,
    name: "West End Lot",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    available: 3,
  },
  {
    id: 3,
    name: "Mall Parking",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    available: 0,
  },
];

const ParkingLots = () => {
  return (
    <div className="py-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-4">Tracked Parking Lots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:py-5">
        {lots.map((lot) => (
          <Link key={lot.id} to={`/lots/${lot.id}`} className="block">
            <ParkingLotItem lot={lot} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ParkingLots;
