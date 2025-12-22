// import './LoginPage.css';
// import { useState } from 'react';

// const LoginPage = ({ onLogin }: { onLogin: (adminFlag: boolean) => void }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username && password) {
//       // простая проверка на админа
//       if (username === 'admin' && password === 'admin123') {
//         onLogin(true);   // админ
//       } else {
//         onLogin(false);  // обычный пользователь
//       }
//     } else {
//       alert('Пожалуйста, введите логин и пароль');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2>Добро пожаловать</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Логин"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <div className="password-field">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Пароль"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <img
//               src={showPassword ? '/images/eye-open.svg' : '/images/eye-closed.svg'}
//               alt="Показать пароль"
//               className="eye-icon"
//               onClick={() => setShowPassword((prev) => !prev)}
//             />
//           </div>
//           <button type="submit">Войти</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import './LoginPage.css';
// import { useState } from 'react';
// import * as api from '../../api'; // наш API для работы с JSON

// interface LoginPageProps {
//   onLogin: (adminFlag: boolean, username?: string) => void;
// }

// const LoginPage = ({ onLogin }: LoginPageProps) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!username || !password) {
//       alert('Пожалуйста, введите логин и пароль');
//       return;
//     }

//     // проверка на администратора
//     if (username === 'admin' && password === 'admin123') {
//       onLogin(true); // админ
//       return;
//     }

//     try {
//       const students = await api.getStudents();
//       const student = students.find(
//         (s) => s.name === username && s.password === password
//       );

//       if (student) {
//         onLogin(false, student.name); // обычный пользователь
//       } else {
//         alert('Неверный логин или пароль');
//       }
//     } catch (err) {
//       console.error('Ошибка при проверке логина:', err);
//       alert('Ошибка сервера, попробуйте позже');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2>Добро пожаловать</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Логин"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <div className="password-field">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Пароль"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <img
//               src={showPassword ? '/images/eye-open.svg' : '/images/eye-closed.svg'}
//               alt="Показать пароль"
//               className="eye-icon"
//               onClick={() => setShowPassword((prev) => !prev)}
//             />
//           </div>
//           <button type="submit">Войти</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import './LoginPage.css';
import { useState } from 'react';
import * as api from '../../api'; // наш API для работы с JSON

interface LoginPageProps {
  onLogin: (adminFlag: boolean, student?: api.Student) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Пожалуйста, введите логин и пароль');
      return;
    }

    // проверка на администратора
    if (username === 'admin' && password === 'admin123') {
      onLogin(true); // админ
      return;
    }

    try {
      const students = await api.getStudents();
      const student = students.find(
        (s) => s.name === username && s.password === password
      );

      if (student) {
        onLogin(false, student); // передаем весь объект студента
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (err) {
      console.error('Ошибка при проверке логина:', err);
      alert('Ошибка сервера, попробуйте позже');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Добро пожаловать</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? '/images/eye-open.svg' : '/images/eye-closed.svg'}
              alt="Показать пароль"
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
