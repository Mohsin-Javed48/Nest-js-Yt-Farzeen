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
    <div className="overflow-x-auto">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Roll</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((s) => (
            <tr
              key={s.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onRowClick && onRowClick(s.id)}
            >
              <td className="px-4 py-3 text-sm text-gray-800">{s.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{s.roll}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
