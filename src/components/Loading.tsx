import React from 'react';

interface LoadingProps {
  size?: number; // Optional size for the spinner
}

const Loading: React.FC<LoadingProps> = ({ size = 16 }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block border-4 rounded-full text-gray-600"
        style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${size / 4}px` }}
        role="status"
      >
      </div>
    </div>
  );
};

export default Loading; 