'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
      <main className="min-h-screen p-8">
        <div className="p-8">Student not found.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl">
        <h1 className="mb-4 text-2xl font-semibold">Edit Marks — {student.name}</h1>
        <MarksTable
          marks={student.marks}
          editable
          onSave={(marks) => {
            const ok = updateMarks(student.id, marks);
            if (ok) {
              alert('Marks updated');
              setStudent({ ...student, marks });
            } else {
              alert('Failed to update marks');
            }
          }}
        />
      </div>
    </main>
  );
}
