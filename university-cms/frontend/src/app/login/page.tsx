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
    <main className="flex min-h-screen items-center py-6">
      <section className="cms-container grid gap-5 md:grid-cols-[1.1fr_1fr]">
        <article className="cms-card cms-rise p-6 md:p-8">
          <span className="cms-chip mb-4">Secure Sign-In</span>
          <h2 className="cms-heading text-3xl font-bold">Access University CMS</h2>
          <p className="cms-subtext mt-3 text-sm">
            Sign in to continue with your assigned dashboard experience.
          </p>
          <div className="mt-6">
            <LoginForm onLogin={handleLogin} />
          </div>
        </article>

        <aside className="cms-card cms-rise-delay p-6 md:p-8">
          <h3 className="cms-heading text-xl font-semibold">Quick Role Routing</h3>
          <p className="cms-subtext mt-2 text-sm">
            Teacher emails route to administration views. Student emails open the personal results panel.
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">Teacher Mode</p>
              <p className="text-slate-600">Use an email containing "teacher".</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="font-semibold text-slate-800">Student Mode</p>
              <p className="text-slate-600">Use any listed student email from mock data.</p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
