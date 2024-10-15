import React from 'react';

interface PredictionResultProps {
  prediction: string;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  return (
    <div>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default PredictionResult;
