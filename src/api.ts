// const BASE_URL = 'http://localhost:3001';

// export interface Student {
//   id: number;
//   name: string;
//   password: string;
//   group: string;
//   test: number;
//   labs: number[];
//   total: string;
//   progress: number;
//   level: number;       // новый уровень
//   experience: number;  // новый опыт
//   gold: number;        // новое золото
// }

// export interface Group {
//   id: number;
//   name: string;
// }

// // Получение всех групп
// export const getGroups = async (): Promise<Group[]> => {
//   const res = await fetch(`${BASE_URL}/groups`);
//   return res.json();
// };

// // Получение всех студентов
// export const getStudents = async (): Promise<Student[]> => {
//   const res = await fetch(`${BASE_URL}/students`);
//   return res.json();
// };

// // Создание новой группы
// export const createGroup = async (group: Group): Promise<Group> => {
//   const res = await fetch(`${BASE_URL}/groups`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(group),
//   });
//   return res.json();
// };

// // Добавление нового студента
// export const addStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
//   const newStudent = {
//     ...student,
//     level: 0,
//     experience: 0,
//     gold: 0,
//   };
//   const res = await fetch(`${BASE_URL}/students`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newStudent),
//   });
//   return res.json();
// };

// // Обновление данных студента (для оценки)
// export const updateStudent = async (id: number, student: Student): Promise<Student> => {
//   const res = await fetch(`${BASE_URL}/students/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(student),
//   });
//   return res.json();
// };


const BASE_URL = 'http://localhost:3001';

export interface Student {
  id: number;
  name: string;
  password: string;
  group: string;
  test: number;
  labs: number[];
  total: string;
  progress: number;
  level: number;
  experience: number;
  gold: number;
}

export interface Group {
  id: number;
  name: string;
}

// Получение всех групп
export const getGroups = async (): Promise<Group[]> => {
  const res = await fetch(`${BASE_URL}/groups`);
  return res.json();
};

// Получение всех студентов
export const getStudents = async (): Promise<Student[]> => {
  const res = await fetch(`${BASE_URL}/students`);
  return res.json();
};

// Создание новой группы
export const createGroup = async (group: Group): Promise<Group> => {
  const res = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(group),
  });
  return res.json();
};

// Добавление нового студента
export const addStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  return res.json();
};

// Обновление данных студента
export const updateStudent = async (id: number, student: Student): Promise<Student> => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  return res.json();
};
