import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/globals.css';

// Temporary placeholder - will be replaced with full App in Branch 2
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">BetterLGU Template</h1>
        <p className="text-gray-600 mb-4">Vite + React + TypeScript</p>
        <p className="text-sm text-gray-400">Branch 1: Vite Foundation - Complete</p>
        <p className="text-sm text-gray-400 mt-2">
          Run <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code> to start
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
