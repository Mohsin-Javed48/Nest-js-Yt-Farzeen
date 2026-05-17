'use client';

import React, { useState } from 'react';
import { Marks } from '../lib/mock';

export default function MarksTable({
  marks,
  editable = false,
  onSave,
}: {
  marks: Marks[];
  editable?: boolean;
  onSave?: (marks: Marks[]) => void;
}) {
  const [local, setLocal] = useState<Marks[]>(marks.map((m) => ({ ...m })));

  function updateMark(idx: number, value: number) {
    const copy = local.map((m) => ({ ...m }));
    copy[idx].marks = value;
    setLocal(copy);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Marks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {local.map((m, i) => (
            <tr key={m.subject}>
              <td className="px-4 py-3 text-sm text-gray-800">{m.subject}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {editable ? (
                  <input
                    type="number"
                    value={m.marks}
                    onChange={(e) => updateMark(i, Number(e.target.value))}
                    className="w-24 rounded border-gray-300 px-2 py-1"
                  />
                ) : (
                  m.marks
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editable && (
        <div className="mt-4">
          <button
            onClick={() => onSave && onSave(local)}
            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Save Marks
          </button>
        </div>
      )}
    </div>
  );
}
