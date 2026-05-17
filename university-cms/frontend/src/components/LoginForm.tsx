'use client';

import React, { useState } from 'react';

export default function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin(email.trim(), password);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          className="mt-1 w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          className="mt-1 w-full rounded border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Login</button>
      </div>
      <div className="text-sm text-gray-500">Tip: use an email containing "teacher" to login as teacher.</div>
    </form>
  );
}
