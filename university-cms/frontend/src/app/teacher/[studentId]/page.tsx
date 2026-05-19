'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStudentById, updateMarks } from '../../../lib/mock';
import MarksTable from '../../../components/MarksTable';

export default function StudentDetailPage() {
  // useParams in app router isn't available as hook like this in older next versions,
  // but in this environment the simple approach works for client-side routing using location path.
  const [student, setStudent] = useState<any | null>(null);

  useEffect(() => {
    const parts = window.location.pathname.split('/');
    const id = parts[parts.length - 1];
    const s = getStudentById(id);
    setStudent(s || null);
  }, []);

  if (!student) {
    return (
      <main className="min-h-screen p-6">
        <div className="cms-container">
          <div className="cms-card p-8">Student not found.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-7">
      <section className="cms-container space-y-5">
        <header className="cms-card cms-rise p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student Profile</p>
              <h1 className="cms-heading mt-2 text-2xl font-bold md:text-3xl">Edit Marks: {student.name}</h1>
              <p className="cms-subtext mt-1 text-sm">{student.email} • Roll {student.roll}</p>
            </div>
            <Link href="/teacher" className="cms-button cms-button-secondary">
              Back to Students
            </Link>
          </div>
        </header>

        <section className="cms-card cms-rise-delay p-3 md:p-4">
          <MarksTable
            marks={student.marks}
            editable
            onSave={(marks) => {
              const ok = updateMarks(student.id, marks);
              if (ok) {
                alert('Marks updated successfully.');
                setStudent({ ...student, marks });
              } else {
                alert('Failed to update marks.');
              }
            }}
          />
        </section>
      </section>
    </main>
  );
}
