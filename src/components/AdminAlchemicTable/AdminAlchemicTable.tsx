// import React, { useState } from "react";
// import * as api from '../../api';
// import "./AdminAlchemicTable.css";

// type Props = {
//   studentId: number;
//   labIndex: number;
//   students: api.Student[];
//   setStudents: React.Dispatch<React.SetStateAction<api.Student[]>>;
//   onBack: () => void;
// };

// const AdminAlchemicTable: React.FC<Props> = ({ studentId, labIndex, students, setStudents, onBack }) => {
//   const student = students.find(s => s.id === studentId);
//   const [grade, setGrade] = useState<number>(student?.labs[labIndex] || 0);

//   if (!student) return <div>Студент не найден</div>;

//   const handleSendGrade = async () => {
//     // Создаём копию студентов и обновляем оценку конкретной лабораторной
//     const updatedStudents = students.map(s => {
//       if (s.id === studentId) {
//         const newLabs = [...s.labs];
//         newLabs[labIndex] = grade;

//         return {
//           ...s,
//           labs: newLabs,
//           total: newLabs.reduce((acc, val) => acc + val, 0) + '/60'
//         };
//       }
//       return s;
//     });

//     setStudents(updatedStudents);

//     // Сохраняем изменения в db.json через API
//     const updatedStudent = updatedStudents.find(s => s.id === studentId);
//     if (updatedStudent) {
//       try {
//         await api.updateStudent(updatedStudent.id, updatedStudent);
//         alert('Оценка успешно сохранена');
//       } catch (err) {
//         console.error('Ошибка при сохранении оценки', err);
//       }
//     }
//   };

//   return (
//     <div className="admin-alchemic-table">
//       <div className="top-bar">
//         <button className="back-btn" onClick={onBack}>
//           ← К таблице
//         </button>
//         <span className="page-title">Алхимический стол</span>
//         <span className="student-name">👤 {student.name}</span>
//       </div>

//       {/* Верхняя строка с книгами */}
//       <div className="book-bar">
//         {[...Array(7)].map((_, i) => (
//           <div key={i} className="book-item">
//             <img src={`/images/book${i + 1}.png`} alt={`Book ${i + 1}`} />
//             <span>{["Фолиант Замысла", "Путевой Пергамент", "Кодекс Артефактов", "Хроники Мира", "Скрижаль знаний", "Фолиант Замысла", "Фолиант Замысла"][i]}</span>
//           </div>
//         ))}
//       </div>

//       <div className="main-content">
//         <div className="book-container">
//           <img src="/images/book-open.png" alt="Книга" className="book-image" />
//           <div className="lab-title">Лабораторная работа №{labIndex + 1}</div>
//           <div className="book-tasks">
//             <p>Задание</p>
//             <p>Задание</p>
//             <p>Задание</p>
//             <p>Задание</p>
//             <p>Задание</p>
//           </div>
//         </div>

//         <div className="right-panel">
//           <div className="deadline">
//             <p className="deadline-label">Срок сдачи: <b>12 марта 01:00</b></p>
//             <p className="deadline-now">11 марта 23:59</p>
//           </div>

//           <div className="scrolls">
//             <h4>Примененные свитки</h4>
//             <div className="scrolls-list">
//               {[...Array(4)].map((_, i) => (
//                 <img key={i} src="/images/scroll-icon.png" alt="Свиток" />
//               ))}
//             </div>
//           </div>

//           <div className="lab-check">
//             <label>Ссылка на работу студента</label>
//             <input type="text" placeholder="https://example.com/student/lab/12345" />

//             <label>Очки вдохновения</label>
//             <input type="number" min="0" max="3" placeholder="0 до 3" />

//             <label>Проверка работы</label>
//             <div className="grade-section">
//               <input
//                 type="number"
//                 min="0"
//                 max="5"
//                 value={grade}
//                 onChange={(e) => setGrade(Number(e.target.value))}
//               />
//               <span>макс. балл – 5</span>
//             </div>

//             <div className="status-section">
//               <span>Статус</span>
//               <button className="status-btn accepted">✔ принято</button>
//               <span>/</span>
//               <button className="status-btn revision">✘ доработка</button>
//             </div>

//             <button className="send-btn" onClick={handleSendGrade}>Отправить студенту</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAlchemicTable;

import React, { useState, useEffect } from "react";
import * as api from '../../api';
import "./AdminAlchemicTable.css";

type Props = {
  studentId: number;
  labIndex: number;
  students: api.Student[];
  setStudents: React.Dispatch<React.SetStateAction<api.Student[]>>;
  onBack: () => void;
};

const AdminAlchemicTable: React.FC<Props> = ({ studentId, labIndex, students, setStudents, onBack }) => {
  const student = students.find(s => s.id === studentId);
  const [grade, setGrade] = useState<number>(0);

  useEffect(() => {
    if (student) {
      setGrade(student.labs[labIndex] || 0);
    }
  }, [student, labIndex]);

  if (!student) return <div>Студент не найден</div>;

  const handleSendGrade = async () => {
    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        const newLabs = [...s.labs];
        newLabs[labIndex] = grade;

        return {
          ...s,
          labs: newLabs,
          total: `${newLabs.reduce((acc, val) => acc + val, 0)}/60`,
          progress: Math.round((newLabs.reduce((acc, val) => acc + val, 0) / 60) * 100)
        };
      }
      return s;
    });

    setStudents(updatedStudents);

    const updatedStudent = updatedStudents.find(s => s.id === studentId);
    if (updatedStudent) {
      try {
        await api.updateStudent(updatedStudent.id, updatedStudent);
        alert('Оценка успешно сохранена');
      } catch (err) {
        console.error('Ошибка при сохранении оценки', err);
      }
    }
  };

  return (
    <div className="admin-alchemic-table">
      <div className="top-bar">
        <button className="back-btn" onClick={onBack}>← К таблице</button>
        <span className="page-title">Алхимический стол</span>
        <span className="student-name">👤 {student.name}</span>
      </div>

      <div className="book-bar">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="book-item">
            <img src={`/images/book${i + 1}.png`} alt={`Book ${i + 1}`} />
            <span>{
              ["Фолиант Замысла","Путевой Пергамент","Кодекс Артефактов","Хроники Мира","Скрижаль знаний","Фолиант Замысла","Фолиант Замысла"][i]
            }</span>
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="book-container">
          <img src="/images/book-open.png" alt="Книга" className="book-image" />
          <div className="lab-title">Лабораторная работа №{labIndex + 1}</div>
          <div className="book-tasks">
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
          </div>
        </div>

        <div className="right-panel">
          <div className="deadline">
            <p className="deadline-label">Срок сдачи: <b>12 марта 01:00</b></p>
            <p className="deadline-now">11 марта 23:59</p>
          </div>

          <div className="scrolls">
            <h4>Примененные свитки</h4>
            <div className="scrolls-list">
              {[...Array(4)].map((_, i) => (
                <img key={i} src="/images/scroll-icon.png" alt="Свиток" />
              ))}
            </div>
          </div>

          <div className="lab-check">
            <label>Ссылка на работу студента</label>
            <input type="text" placeholder="https://example.com/student/lab/12345" />

            <label>Очки вдохновения</label>
            <input type="number" min="0" max="3" placeholder="0 до 3" />

            <label>Проверка работы</label>
            <div className="grade-section">
              <input
                type="number"
                min={0}
                max={5}
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
              />
              <span>макс. балл – 5</span>
            </div>

            <div className="status-section">
              <span>Статус</span>
              <button className="status-btn accepted">✔ принято</button>
              <span>/</span>
              <button className="status-btn revision">✘ доработка</button>
            </div>

            <button className="send-btn" onClick={handleSendGrade}>Отправить студенту</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlchemicTable;

