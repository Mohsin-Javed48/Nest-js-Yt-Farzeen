'use client';

import React, { useEffect, useState } from 'react';
import { getCurrentUser, getStudentById } from '../../lib/mock';
import MarksTable from '../../components/MarksTable';

export default function StudentPage() {
  const [student, setStudent] = useState<any | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'student') {
      const s = getStudentById(user.id);
      setStudent(s || null);
    } else {
      setStudent(null);
    }
  }, []);

  if (!student) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="cms-card p-8 text-center">
          <p className="text-slate-700">No student found. Please login as a student.</p>
        </div>
      </main>
    );
  }

  const total = student.marks.reduce((acc: number, item: any) => acc + item.marks, 0);
  const average = Math.round(total / student.marks.length);

  return (
    <main className="py-7">
      <section className="cms-container space-y-5">
        <header className="cms-card cms-rise p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student Dashboard</p>
          <h1 className="cms-heading mt-2 text-2xl font-bold md:text-3xl">{student.name}</h1>
          <p className="cms-subtext mt-1 text-sm">Roll no: {student.roll} • {student.email}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Subjects</p>
              <p className="mt-1 text-xl font-bold text-slate-800">{student.marks.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Average</p>
              <p className="mt-1 text-xl font-bold text-slate-800">{average}%</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2 md:col-span-1">
              <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
              <p className="mt-1 text-xl font-bold text-emerald-700">Active</p>
            </div>
          </div>
        </header>

        <section className="cms-card cms-rise-delay p-3 md:p-4">
          <MarksTable marks={student.marks} editable={false} />
        </section>
      </section>
    </main>
  );
}
