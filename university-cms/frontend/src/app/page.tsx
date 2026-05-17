'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [backendHealth, setBackendHealth] = useState<string>('Checking...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/health');
        const data = await response.json();
        setBackendHealth(data.status);
      } catch (error) {
        setBackendHealth('Backend connection failed');
      }
    };

    checkBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          University CMS
        </h1>
        <p className="mb-6 text-gray-600">
          Welcome to the University Content Management System
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
        <div className="space-y-4">
          <div className="rounded bg-green-100 p-3">
            <p className="text-green-800">
              ✅ Frontend is running on port 3000
            </p>
          </div>
          <div className="rounded bg-blue-100 p-3">
            <p className="text-blue-800">
              Backend status: {backendHealth}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
