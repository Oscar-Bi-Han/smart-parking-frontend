import React, { useState } from 'react';
import ButtonLoader from './ButtonLoader';

const ParkingPrediction = () => {
  const [datetime, setDatetime] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!datetime) return;

    try {
      setLoading(true);
      setError('');
      setPrediction(null);

      const response = await fetch("https://parking-ml.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ datetime })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get prediction');

      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-10 md:max-w-2xl mx-auto z-50 rounded-md bg-white border-t border-gray-300 shadow-md p-4 flex flex-col items-center justify-between gap-2">
        <h1 className='text-xl md:text-2xl'>Check Predicted Lot Occupancy</h1>
        <span className='text-gray-500'>Select the date and time</span>
        <div className='flex flex-row items-center gap-4 w-full sm:w-auto'>
            <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="border px-3 py-2 rounded w-full sm:w-auto"
            />
            <button
                onClick={handlePredict}
                className={`bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading}
            >
                {loading ? <ButtonLoader /> : "Check"}
            </button>
        </div>

      {(prediction || error) && (
        <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-center sm:text-left">
          {error && <p className="text-red-500">{error}</p>}
          {prediction && (
            <div className="text-gray-800">
              <p><strong>Prediction:</strong> {Math.round((prediction.occupancy_percentage / 100) * 4)} out of 4 spaces will be occupied</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParkingPrediction;
