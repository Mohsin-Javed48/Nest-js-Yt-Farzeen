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

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl">
        <h1 className="mb-4 text-2xl font-semibold">All Students</h1>
        <StudentTable
          students={students}
          onRowClick={(id) => router.push(`/teacher/${id}`)}
        />
      </div>
    </main>
  );
}
