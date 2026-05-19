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
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="cms-data-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {local.map((m, i) => (
            <tr key={m.subject} className="bg-white even:bg-slate-50/60">
              <td className="font-medium text-slate-800">{m.subject}</td>
              <td className="text-slate-700">
                {editable ? (
                  <input
                    type="number"
                    value={m.marks}
                    onChange={(e) => updateMark(i, Number(e.target.value))}
                    className="cms-input w-28 py-1.5"
                  />
                ) : (
                  <span className="cms-chip">{m.marks}%</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editable && (
        <div className="mt-4 px-1 pb-1">
          <button
            onClick={() => onSave && onSave(local)}
            className="cms-button cms-button-primary"
          >
            Save Marks
          </button>
        </div>
      )}
    </div>
  );
}
