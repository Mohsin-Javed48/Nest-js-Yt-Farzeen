'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllStudents, getCurrentUser } from '../../lib/mock';
import StudentTable from '../../components/StudentTable';

export default function TeacherPage() {
  const [students, setStudents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'teacher') {
      // do nothing — could redirect to login
    }
    setStudents(getAllStudents());
  }, []);

  const totalStudents = students.length;

  return (
    <main className="py-7">
      <section className="cms-container space-y-5">
        <header className="cms-card cms-rise p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Teacher Workspace</p>
          <h1 className="cms-heading mt-2 text-2xl font-bold md:text-3xl">Student Records</h1>
          <p className="cms-subtext mt-1 text-sm">Open any student profile to review and edit marks.</p>
          <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
            Total students: {totalStudents}
          </div>
        </header>

        <section className="cms-card cms-rise-delay p-3 md:p-4">
          <StudentTable
            students={students}
            onRowClick={(id) => router.push(`/teacher/${id}`)}
          />
        </section>
      </section>
    </main>
  );
}
