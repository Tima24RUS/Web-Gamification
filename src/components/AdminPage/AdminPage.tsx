// import { useEffect, useState } from 'react';
// import AdminHeader from '../AdminHeader/AdminHeader';
// import AddStudentModal from '../AddStudentModal/AddStudentModal';
// import * as api from '../../api';
// import './AdminPage.css';

// // Генератор случайного пароля
// const generatePassword = (length = 6) => {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
// };

// const AdminPage = () => {
//   const [groups, setGroups] = useState<api.Group[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<api.Group | null>(null);
//   const [students, setStudents] = useState<api.Student[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupsData = await api.getGroups();
//         setGroups(groupsData);

//         const studentsData = await api.getStudents();
//         setStudents(studentsData);
//       } catch (err) {
//         console.error('Ошибка при загрузке данных', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const getSemester = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 9 || month === 1) return 'осенний семестр';
//     if (month >= 2 && month <= 7) return 'весенний семестр';
//     return '';
//   };

//   // Добавление студентов
//   const handleAddStudents = async (count: number, bindToCurrent: boolean, groupName?: string) => {
//     const group = bindToCurrent ? selectedGroup : groups.find(g => g.name === groupName);
//     if (!group) return;

//     // ID внутри группы начинаем с 1
//     const groupStudents = students.filter(s => s.group === group.name);
//     const startingId = groupStudents.length > 0 ? Math.max(...groupStudents.map(s => s.id)) + 1 : 1;

//     const newStudents: api.Student[] = [];
//     for (let i = 0; i < count; i++) {
//       const studentToAdd: api.Student = {
//         id: startingId + i,
//         // Уникальное имя: префикс группы + порядковый номер
//         name: `${group.name}-player${startingId + i}`,
//         password: generatePassword(),
//         group: group.name,
//         test: 0,
//         labs: [0, 0, 0, 0, 0, 0, 0],
//         total: '0/60',
//         progress: 0,
//         level: 0,
//         experience: 0,
//         gold: 0,
//       };
//       const addedStudent = await api.addStudent(studentToAdd);
//       newStudents.push(addedStudent);
//     }

//     setStudents(prev => [...prev, ...newStudents]);
//   };

//   // Создание группы
//   const handleCreateGroup = async (groupName: string) => {
//     try {
//       const maxId = groups.length > 0 ? Math.max(...groups.map(g => Number(g.id))) : 0;
//       const newGroup: api.Group = { id: maxId + 1, name: groupName };

//       await api.createGroup(newGroup);
//       setGroups(prev => [...prev, newGroup]);
//       setSelectedGroup(newGroup);
//     } catch (err) {
//       console.error('Ошибка при создании группы', err);
//     }
//   };

//   const groupStudents = selectedGroup
//     ? students.filter(s => s.group === selectedGroup.name)
//     : [];

//   const isValidGroup = !!selectedGroup;

//   return (
//     <div className="admin-page">
//       <AdminHeader
//         groups={groups}
//         onGroupSelect={(groupName) => {
//           const group = groups.find(g => g.name === groupName) || null;
//           setSelectedGroup(group);
//         }}
//         onAddStudent={() => setIsModalOpen(true)}
//         onCreateGroup={handleCreateGroup}
//       />

//       <div className="admin-content">
//         <div className="filters">
//           {isValidGroup && (
//             <>
//               <p>
//                 Группа <b>{selectedGroup?.name}</b> {getSemester()}
//               </p>
//               <button className="filter-btn">👤 {groupStudents.length}</button>
//               <button className="filter-btn">⚙ – выбрать фильтр</button>
//               <button className="filter-btn">📤 экспорт данных</button>
//             </>
//           )}
//         </div>

//         <div className="group-box">
//           {!isValidGroup ? (
//             <>
//               <h2>Выберите группу</h2>
//               <p>чтобы начать работу</p>
//             </>
//           ) : (
//             <table className="students-table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>студент</th>
//                   <th>тест</th>
//                   <th>ЛБ1</th>
//                   <th>ЛБ2</th>
//                   <th>ЛБ3</th>
//                   <th>ЛБ4</th>
//                   <th>ЛБ5</th>
//                   <th>ЛБ6</th>
//                   <th>ЛБ7</th>
//                   <th>итог</th>
//                   <th>прогресс</th>
//                   <th>пров.</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {groupStudents.map(student => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.name}</td>
//                     <td>{student.test}</td>
//                     {student.labs.map((lab, idx) => (
//                       <td key={idx}>{lab}</td>
//                     ))}
//                     <td>{student.total}</td>
//                     <td>
//                       <div className="progress-bar">
//                         <div className="progress-fill" style={{ width: `${student.progress}%` }}>
//                           {student.progress}%
//                         </div>
//                       </div>
//                     </td>
//                     <td>✏️</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <AddStudentModal
//           onClose={() => setIsModalOpen(false)}
//           onAdd={handleAddStudents}
//           currentGroup={selectedGroup?.name}
//           groups={groups.map(g => g.name)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminPage;

// import { useEffect, useState } from 'react';
// import AdminHeader from '../AdminHeader/AdminHeader';
// import AddStudentModal from '../AddStudentModal/AddStudentModal';
// import * as api from '../../api';
// import './AdminPage.css';

// type Props = {
//   onOpenLab: (studentId: number, labIndex: number) => void;
// };

// // Генератор случайного пароля
// const generatePassword = (length = 6) => {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
// };

// const AdminPage: React.FC<Props> = ({ onOpenLab }) => {
//   const [groups, setGroups] = useState<api.Group[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<api.Group | null>(null);
//   const [students, setStudents] = useState<api.Student[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupsData = await api.getGroups();
//         setGroups(groupsData);

//         const studentsData = await api.getStudents();
//         setStudents(studentsData);
//       } catch (err) {
//         console.error('Ошибка при загрузке данных', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const getSemester = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 9 || month === 1) return 'осенний семестр';
//     if (month >= 2 && month <= 7) return 'весенний семестр';
//     return '';
//   };

//   // Добавление студентов
//   const handleAddStudents = async (count: number, bindToCurrent: boolean, groupName?: string) => {
//     const group = bindToCurrent ? selectedGroup : groups.find(g => g.name === groupName);
//     if (!group) return;

//     // ID внутри группы начинаем с 1
//     const groupStudents = students.filter(s => s.group === group.name);
//     const startingId = groupStudents.length > 0 ? Math.max(...groupStudents.map(s => s.id)) + 1 : 1;

//     const newStudents: api.Student[] = [];
//     for (let i = 0; i < count; i++) {
//       const studentToAdd: api.Student = {
//         id: startingId + i,
//         // Уникальное имя: префикс группы + порядковый номер
//         name: `${group.name}-player${startingId + i}`,
//         password: generatePassword(),
//         group: group.name,
//         test: 0,
//         labs: [0, 0, 0, 0, 0, 0, 0],
//         total: '0/60',
//         progress: 0,
//         level: 0,
//         experience: 0,
//         gold: 0,
//       };
//       const addedStudent = await api.addStudent(studentToAdd);
//       newStudents.push(addedStudent);
//     }

//     setStudents(prev => [...prev, ...newStudents]);
//   };

//   // Создание группы
//   const handleCreateGroup = async (groupName: string) => {
//     try {
//       const maxId = groups.length > 0 ? Math.max(...groups.map(g => Number(g.id))) : 0;
//       const newGroup: api.Group = { id: maxId + 1, name: groupName };

//       await api.createGroup(newGroup);
//       setGroups(prev => [...prev, newGroup]);
//       setSelectedGroup(newGroup);
//     } catch (err) {
//       console.error('Ошибка при создании группы', err);
//     }
//   };

//   const groupStudents = selectedGroup
//     ? students.filter(s => s.group === selectedGroup.name)
//     : [];

//   const isValidGroup = !!selectedGroup;

//   return (
//     <div className="admin-page">
//       <AdminHeader
//         groups={groups}
//         onGroupSelect={(groupName) => {
//           const group = groups.find(g => g.name === groupName) || null;
//           setSelectedGroup(group);
//         }}
//         onAddStudent={() => setIsModalOpen(true)}
//         onCreateGroup={handleCreateGroup}
//       />

//       <div className="admin-content">
//         <div className="filters">
//           {isValidGroup && (
//             <>
//               <p>
//                 Группа <b>{selectedGroup?.name}</b> {getSemester()}
//               </p>
//               <button className="filter-btn">👤 {groupStudents.length}</button>
//               <button className="filter-btn">⚙ – выбрать фильтр</button>
//               <button className="filter-btn">📤 экспорт данных</button>
//             </>
//           )}
//         </div>

//         <div className="group-box">
//           {!isValidGroup ? (
//             <>
//               <h2>Выберите группу</h2>
//               <p>чтобы начать работу</p>
//             </>
//           ) : (
//             <table className="students-table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>студент</th>
//                   <th>тест</th>
//                   <th>ЛБ1</th>
//                   <th>ЛБ2</th>
//                   <th>ЛБ3</th>
//                   <th>ЛБ4</th>
//                   <th>ЛБ5</th>
//                   <th>ЛБ6</th>
//                   <th>ЛБ7</th>
//                   <th>итог</th>
//                   <th>прогресс</th>
//                   <th>пров.</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {groupStudents.map(student => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.name}</td>
//                     <td>{student.test}</td>
//                     {student.labs.map((lab, idx) => (
//                       <td
//                         key={idx}
//                         className="lab-cell"
//                         onClick={() => onOpenLab(student.id, idx)}
//                         style={{ cursor: 'pointer' }}
//                       >
//                         {lab}
//                       </td>
//                     ))}
//                     <td>{student.total}</td>
//                     <td>
//                       <div className="progress-bar">
//                         <div className="progress-fill" style={{ width: `${student.progress}%` }}>
//                           {student.progress}%
//                         </div>
//                       </div>
//                     </td>
//                     <td>✏️</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <AddStudentModal
//           onClose={() => setIsModalOpen(false)}
//           onAdd={handleAddStudents}
//           currentGroup={selectedGroup?.name}
//           groups={groups.map(g => g.name)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminPage;

// import { useEffect, useState } from 'react';
// import AdminHeader from '../AdminHeader/AdminHeader';
// import AddStudentModal from '../AddStudentModal/AddStudentModal';
// import * as api from '../../api';
// import './AdminPage.css';

// type Props = {
//   onOpenLab: (studentId: number, labIndex: number) => void;
//   students: api.Student[];
//   setStudents: React.Dispatch<React.SetStateAction<api.Student[]>>;
// };

// // Генератор случайного пароля
// const generatePassword = (length = 6) => {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
// };

// const AdminPage: React.FC<Props> = ({ onOpenLab, students, setStudents }) => {
//   const [groups, setGroups] = useState<api.Group[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<api.Group | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupsData = await api.getGroups();
//         setGroups(groupsData);

//         // Теперь студенты приходят через пропсы, поэтому загрузку через API можно убрать
//         // const studentsData = await api.getStudents();
//         // setStudents(studentsData);
//       } catch (err) {
//         console.error('Ошибка при загрузке данных', err);
//       }
//     };
//     fetchData();
//   }, [setStudents]);

//   const getSemester = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 9 || month === 1) return 'осенний семестр';
//     if (month >= 2 && month <= 7) return 'весенний семестр';
//     return '';
//   };

//   // Добавление студентов
//   const handleAddStudents = async (count: number, bindToCurrent: boolean, groupName?: string) => {
//     const group = bindToCurrent ? selectedGroup : groups.find(g => g.name === groupName);
//     if (!group) return;

//     const groupStudents = students.filter(s => s.group === group.name);
//     const startingId = groupStudents.length > 0 ? Math.max(...groupStudents.map(s => s.id)) + 1 : 1;

//     const newStudents: api.Student[] = [];
//     for (let i = 0; i < count; i++) {
//       const studentToAdd: api.Student = {
//         id: startingId + i,
//         name: `${group.name}-player${startingId + i}`,
//         password: generatePassword(),
//         group: group.name,
//         test: 0,
//         labs: [0, 0, 0, 0, 0, 0, 0],
//         total: '0/60',
//         progress: 0,
//         level: 0,
//         experience: 0,
//         gold: 0,
//       };
//       const addedStudent = await api.addStudent(studentToAdd);
//       newStudents.push(addedStudent);
//     }

//     setStudents(prev => [...prev, ...newStudents]);
//   };

//   // Создание группы
//   const handleCreateGroup = async (groupName: string) => {
//     try {
//       const maxId = groups.length > 0 ? Math.max(...groups.map(g => Number(g.id))) : 0;
//       const newGroup: api.Group = { id: maxId + 1, name: groupName };

//       await api.createGroup(newGroup);
//       setGroups(prev => [...prev, newGroup]);
//       setSelectedGroup(newGroup);
//     } catch (err) {
//       console.error('Ошибка при создании группы', err);
//     }
//   };

//   const groupStudents = selectedGroup
//     ? students.filter(s => s.group === selectedGroup.name)
//     : [];

//   const isValidGroup = !!selectedGroup;

//   return (
//     <div className="admin-page">
//       <AdminHeader
//         groups={groups}
//         onGroupSelect={(groupName) => {
//           const group = groups.find(g => g.name === groupName) || null;
//           setSelectedGroup(group);
//         }}
//         onAddStudent={() => setIsModalOpen(true)}
//         onCreateGroup={handleCreateGroup}
//       />

//       <div className="admin-content">
//         <div className="filters">
//           {isValidGroup && (
//             <>
//               <p>
//                 Группа <b>{selectedGroup?.name}</b> {getSemester()}
//               </p>
//               <button className="filter-btn">👤 {groupStudents.length}</button>
//               <button className="filter-btn">⚙ – выбрать фильтр</button>
//               <button className="filter-btn">📤 экспорт данных</button>
//             </>
//           )}
//         </div>

//         <div className="group-box">
//           {!isValidGroup ? (
//             <>
//               <h2>Выберите группу</h2>
//               <p>чтобы начать работу</p>
//             </>
//           ) : (
//             <table className="students-table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>студент</th>
//                   <th>тест</th>
//                   <th>ЛБ1</th>
//                   <th>ЛБ2</th>
//                   <th>ЛБ3</th>
//                   <th>ЛБ4</th>
//                   <th>ЛБ5</th>
//                   <th>ЛБ6</th>
//                   <th>ЛБ7</th>
//                   <th>итог</th>
//                   <th>прогресс</th>
//                   <th>пров.</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {groupStudents.map(student => (
//                   <tr key={student.id}>
//                     <td>{student.id}</td>
//                     <td>{student.name}</td>
//                     <td>{student.test}</td>
//                     {student.labs.map((lab, idx) => (
//                       <td
//                         key={idx}
//                         className="lab-cell"
//                         onClick={() => onOpenLab(student.id, idx)}
//                         style={{ cursor: 'pointer' }}
//                       >
//                         {lab}
//                       </td>
//                     ))}
//                     <td>{student.total}</td>
//                     <td>
//                       <div className="progress-bar">
//                         <div className="progress-fill" style={{ width: `${student.progress}%` }}>
//                           {student.progress}%
//                         </div>
//                       </div>
//                     </td>
//                     <td>✏️</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <AddStudentModal
//           onClose={() => setIsModalOpen(false)}
//           onAdd={handleAddStudents}
//           currentGroup={selectedGroup?.name}
//           groups={groups.map(g => g.name)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminPage;

// import { useEffect, useState } from 'react';
// import AdminHeader from '../AdminHeader/AdminHeader';
// import AddStudentModal from '../AddStudentModal/AddStudentModal';
// import AdminAlchemicTable from '../AdminAlchemicTable/AdminAlchemicTable';
// import * as api from '../../api';
// import './AdminPage.css';

// type Props = {
//   students: api.Student[];
//   setStudents: React.Dispatch<React.SetStateAction<api.Student[]>>;
// };

// // Генератор случайного пароля
// const generatePassword = (length = 6) => {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
// };

// const AdminPage: React.FC<Props> = ({ students, setStudents }) => {
//   const [groups, setGroups] = useState<api.Group[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState<api.Group | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Новое состояние для открытой лаборатории
//   const [openedLab, setOpenedLab] = useState<{ studentId: number; labIndex: number } | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupsData = await api.getGroups();
//         setGroups(groupsData);
//       } catch (err) {
//         console.error('Ошибка при загрузке данных', err);
//       }
//     };
//     fetchData();
//   }, []);

//   const getSemester = () => {
//     const month = new Date().getMonth() + 1;
//     if (month >= 9 || month === 1) return 'осенний семестр';
//     if (month >= 2 && month <= 7) return 'весенний семестр';
//     return '';
//   };

//   const handleAddStudents = async (count: number, bindToCurrent: boolean, groupName?: string) => {
//     const group = bindToCurrent ? selectedGroup : groups.find(g => g.name === groupName);
//     if (!group) return;

//     const groupStudents = students.filter(s => s.group === group.name);
//     const startingId = groupStudents.length > 0 ? Math.max(...groupStudents.map(s => s.id)) + 1 : 1;

//     const newStudents: api.Student[] = [];
//     for (let i = 0; i < count; i++) {
//       const studentToAdd: api.Student = {
//         id: startingId + i,
//         name: `${group.name}-player${startingId + i}`,
//         password: generatePassword(),
//         group: group.name,
//         test: 0,
//         labs: [0, 0, 0, 0, 0, 0, 0],
//         total: '0/60',
//         progress: 0,
//         level: 0,
//         experience: 0,
//         gold: 0,
//       };
//       const addedStudent = await api.addStudent(studentToAdd);
//       newStudents.push(addedStudent);
//     }

//     setStudents(prev => [...prev, ...newStudents]);
//   };

//   const handleCreateGroup = async (groupName: string) => {
//     try {
//       const maxId = groups.length > 0 ? Math.max(...groups.map(g => Number(g.id))) : 0;
//       const newGroup: api.Group = { id: maxId + 1, name: groupName };

//       await api.createGroup(newGroup);
//       setGroups(prev => [...prev, newGroup]);
//       setSelectedGroup(newGroup);
//     } catch (err) {
//       console.error('Ошибка при создании группы', err);
//     }
//   };

//   const groupStudents = selectedGroup
//     ? students.filter(s => s.group === selectedGroup.name)
//     : [];

//   const isValidGroup = !!selectedGroup;

//   // Функция открытия лабораторной
//   const handleOpenLab = (studentId: number, labIndex: number) => {
//     setOpenedLab({ studentId, labIndex });
//   };

//   return (
//     <div className="admin-page">
//       <AdminHeader
//         groups={groups}
//         onGroupSelect={(groupName) => {
//           const group = groups.find(g => g.name === groupName) || null;
//           setSelectedGroup(group);
//         }}
//         onAddStudent={() => setIsModalOpen(true)}
//         onCreateGroup={handleCreateGroup}
//       />

//       {openedLab ? (
//         // Рендерим компонент алхимического стола
//         <AdminAlchemicTable
//           studentId={openedLab.studentId}
//           labIndex={openedLab.labIndex}
//           students={students}
//           setStudents={setStudents}
//           onBack={() => setOpenedLab(null)}
//         />
//       ) : (
//         // Рендерим таблицу студентов только если лаборатория не открыта
//         <div className="admin-content">
//           <div className="filters">
//             {isValidGroup && (
//               <>
//                 <p>
//                   Группа <b>{selectedGroup?.name}</b> {getSemester()}
//                 </p>
//                 <button className="filter-btn">👤 {groupStudents.length}</button>
//                 <button className="filter-btn">⚙ – выбрать фильтр</button>
//                 <button className="filter-btn">📤 экспорт данных</button>
//               </>
//             )}
//           </div>

//           <div className="group-box">
//             {!isValidGroup ? (
//               <>
//                 <h2>Выберите группу</h2>
//                 <p>чтобы начать работу</p>
//               </>
//             ) : (
//               <table className="students-table">
//                 <thead>
//                   <tr>
//                     <th>№</th>
//                     <th>студент</th>
//                     <th>тест</th>
//                     <th>ЛБ1</th>
//                     <th>ЛБ2</th>
//                     <th>ЛБ3</th>
//                     <th>ЛБ4</th>
//                     <th>ЛБ5</th>
//                     <th>ЛБ6</th>
//                     <th>ЛБ7</th>
//                     <th>итог</th>
//                     <th>прогресс</th>
//                     <th>пров.</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupStudents.map(student => (
//                     <tr key={student.id}>
//                       <td>{student.id}</td>
//                       <td>{student.name}</td>
//                       <td>{student.test}</td>
//                       {student.labs.map((lab, idx) => (
//                         <td
//                           key={idx}
//                           className="lab-cell"
//                           onClick={() => handleOpenLab(student.id, idx)}
//                           style={{ cursor: 'pointer' }}
//                         >
//                           {lab}
//                         </td>
//                       ))}
//                       <td>{student.total}</td>
//                       <td>
//                         <div className="progress-bar">
//                           <div className="progress-fill" style={{ width: `${student.progress}%` }}>
//                             {student.progress}%
//                           </div>
//                         </div>
//                       </td>
//                       <td>✏️</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       )}

//       {isModalOpen && (
//         <AddStudentModal
//           onClose={() => setIsModalOpen(false)}
//           onAdd={handleAddStudents}
//           currentGroup={selectedGroup?.name}
//           groups={groups.map(g => g.name)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminPage;

import { useEffect, useState } from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import AddStudentModal from '../AddStudentModal/AddStudentModal';
import AdminAlchemicTable from '../AdminAlchemicTable/AdminAlchemicTable';
import * as api from '../../api';
import './AdminPage.css';

type Props = {
  students: api.Student[];
  setStudents: React.Dispatch<React.SetStateAction<api.Student[]>>;
  onOpenLab: (studentId: number, labIndex: number) => void;
};

// Генератор случайного пароля
const generatePassword = (length = 6) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const AdminPage: React.FC<Props> = ({ students, setStudents, onOpenLab }) => {
  const [groups, setGroups] = useState<api.Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<api.Group | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsData = await api.getGroups();
        setGroups(groupsData);
      } catch (err) {
        console.error('Ошибка при загрузке данных', err);
      }
    };
    fetchData();
  }, []);

  const getSemester = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 9 || month === 1) return 'осенний семестр';
    if (month >= 2 && month <= 7) return 'весенний семестр';
    return '';
  };

  const handleAddStudents = async (count: number, bindToCurrent: boolean, groupName?: string) => {
    const group = bindToCurrent ? selectedGroup : groups.find(g => g.name === groupName);
    if (!group) return;

    // Находим текущий max id среди всех студентов
    const maxId = students.length > 0 ? Math.max(...students.map(s => s.id)) : 0;

    const newStudents: api.Student[] = [];
    for (let i = 0; i < count; i++) {
      const newId = maxId + i + 1; // уникальный числовой id

      const studentToAdd: api.Student = {
        id: newId,
        name: `${group.name}-player${newId}`, // имя по id
        password: generatePassword(),
        group: group.name,
        test: 0,
        labs: [0, 0, 0, 0, 0, 0, 0],
        total: '0/60',
        progress: 0,
        level: 0,
        experience: 0,
        gold: 0,
      };
      const addedStudent = await api.addStudent(studentToAdd);
      newStudents.push(addedStudent);
    }

    setStudents(prev => [...prev, ...newStudents]);
  };

  const handleCreateGroup = async (groupName: string) => {
    try {
      const maxId = groups.length > 0 ? Math.max(...groups.map(g => Number(g.id))) : 0;
      const newGroup: api.Group = { id: maxId + 1, name: groupName };

      await api.createGroup(newGroup);
      setGroups(prev => [...prev, newGroup]);
      setSelectedGroup(newGroup);
    } catch (err) {
      console.error('Ошибка при создании группы', err);
    }
  };

  const groupStudents = selectedGroup
    ? students.filter(s => s.group === selectedGroup.name)
    : [];

  const isValidGroup = !!selectedGroup;

  return (
    <div className="admin-page">
      <AdminHeader
        groups={groups}
        onGroupSelect={(groupName) => {
          const group = groups.find(g => g.name === groupName) || null;
          setSelectedGroup(group);
        }}
        onAddStudent={() => setIsModalOpen(true)}
        onCreateGroup={handleCreateGroup}
      />

      <div className="admin-content">
        {/* --- блок фильтров --- */}
        <div className="filters">
          {isValidGroup && (
            <>
              <p>
                Группа <b>{selectedGroup?.name}</b> {getSemester()}
              </p>
              <button className="filter-btn">👤 {groupStudents.length}</button>
              {/* <button className="filter-btn">⚙ – выбрать фильтр</button>
              <button className="filter-btn">📤 экспорт данных</button> */}
            </>
          )}
        </div>

        {!isValidGroup ? (
          <>
            <h2>Выберите группу</h2>
            <p>чтобы начать работу</p>
          </>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>№</th>
                <th>студент</th>
                <th>тест</th>
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i}>ЛБ{i + 1}</th>
                ))}
                <th>итог</th>
                <th>прогресс</th>
                <th>пров.</th>
              </tr>
            </thead>
            <tbody>
              {groupStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td> {/* порядковый номер */}
                  <td>{student.name}</td>
                  <td>{student.test}</td>
                  {student.labs.map((lab, idx) => (
                    <td
                      key={idx}
                      className="lab-cell"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenLab(student.id, idx)}
                    >
                      {lab}
                    </td>
                  ))}
                  <td>{student.total}</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${student.progress}%` }}>
                        {student.progress}%
                      </div>
                    </div>
                  </td>
                  <td>✏️</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <AddStudentModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddStudents}
          currentGroup={selectedGroup?.name}
          groups={groups.map(g => g.name)}
        />
      )}
    </div>
  );
};

export default AdminPage;




