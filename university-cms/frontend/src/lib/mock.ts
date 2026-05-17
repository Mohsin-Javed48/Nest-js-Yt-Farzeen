export type Marks = { subject: string; marks: number };

export type Student = {
  id: string;
  name: string;
  email: string;
  roll: string;
  marks: Marks[];
};

const students: Student[] = [
  {
    id: 's1',
    name: 'Alice Johnson',
    email: 'alice@student.univ.edu',
    roll: 'U2021001',
    marks: [
      { subject: 'Mathematics', marks: 78 },
      { subject: 'Physics', marks: 85 },
      { subject: 'Chemistry', marks: 72 },
    ],
  },
  {
    id: 's2',
    name: 'Bob Smith',
    email: 'bob@student.univ.edu',
    roll: 'U2021002',
    marks: [
      { subject: 'Mathematics', marks: 65 },
      { subject: 'Physics', marks: 70 },
      { subject: 'Chemistry', marks: 68 },
    ],
  },
  {
    id: 's3',
    name: 'Carla Gomez',
    email: 'carla@student.univ.edu',
    roll: 'U2021003',
    marks: [
      { subject: 'Mathematics', marks: 92 },
      { subject: 'Physics', marks: 88 },
      { subject: 'Chemistry', marks: 90 },
    ],
  },
];

let data = students.map((s) => ({ ...s }));

export function login(email: string, password: string) {
  // Very simple mock login: teacher if email contains "teacher", else student
  if (email.includes('teacher')) {
    const teacher = { role: 'teacher', name: 'Prof. Martin' };
    // persist to localStorage if running in browser
    try {
      localStorage.setItem('ucms_user', JSON.stringify(teacher));
    } catch (e) {}
    return teacher;
  }

  const student = data.find((s) => s.email === email) || data[0];
  const user = { role: 'student', id: student.id, name: student.name };
  try {
    localStorage.setItem('ucms_user', JSON.stringify(user));
  } catch (e) {}
  return user;
}

export function getAllStudents(): Student[] {
  return data.map((s) => ({ ...s }));
}

export function getStudentById(id: string): Student | undefined {
  return data.find((s) => s.id === id);
}

export function updateMarks(studentId: string, marks: Marks[]) {
  const idx = data.findIndex((s) => s.id === studentId);
  if (idx !== -1) {
    data[idx].marks = marks.map((m) => ({ ...m }));
    return true;
  }
  return false;
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('ucms_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
