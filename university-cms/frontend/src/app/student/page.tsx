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
      <main className="flex min-h-screen items-center justify-center">
        <div className="p-8">No student found. Please login as a student.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl">
        <h1 className="mb-4 text-2xl font-semibold">{student.name} — Results</h1>
        <MarksTable marks={student.marks} editable={false} />
      </div>
    </main>
  );
}
