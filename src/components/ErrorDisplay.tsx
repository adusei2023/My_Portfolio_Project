import React from 'react';

interface ErrorDisplayProps {
  error: Error | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {error.message}
        </pre>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay; 