'use client';

import React from 'react';
import { Student } from '../lib/mock';

export default function StudentTable({
  students,
  onRowClick,
}: {
  students: Student[];
  onRowClick?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="cms-data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr
              key={s.id}
              className="cursor-pointer bg-white transition-colors hover:bg-teal-50/45"
              onClick={() => onRowClick && onRowClick(s.id)}
            >
              <td className="font-medium text-slate-800">{s.name}</td>
              <td className="text-slate-600">{s.email}</td>
              <td className="text-slate-600">{s.roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
