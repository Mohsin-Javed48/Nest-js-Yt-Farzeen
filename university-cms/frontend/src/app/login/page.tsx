'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/LoginForm';
import { login } from '../../lib/mock';

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(email: string, password: string) {
    const user = login(email, password as any);
    if (user.role === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/student');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}
