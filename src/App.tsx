// import { useState } from 'react';
// import Header from './components/Header/Header';
// import MainContent from './components/MainContent/MainContent';
// import LibraryPage from './components/LibraryPage/LibraryPage';
// import DungeonPage from './components/DungeonPage/DungeonPage';
// import AchievementsPage from './components/AchievementsPage/AchievementsPage';
// import AlchemicTablePage from './components/AlchemicTablePage/AlchemicTablePage';
// import LoginPage from './components/LoginPage/LoginPage'; 
// import AdminPage from './components/AdminPage/AdminPage';
// import AdminHeader from './components/AdminHeader/AdminHeader';
// import ShopPage from './components/ShopPage/ShopPage';
// import * as api from './api';

// import './App.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('main');
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [currentUser, setCurrentUser] = useState<api.Student | null>(null);

//   const handleLogin = (adminFlag: boolean, student?: api.Student) => {
//     setIsAuthenticated(true); 
//     setIsAdmin(adminFlag);
//     if (student) {
//       setCurrentUser(student);
//     }
//   };

//   const handleNavClick = (item: string) => {
//     switch(item) {
//       case 'Библиотека знаний':
//         setCurrentPage('library');
//         break;
//       case 'Главная':
//         setCurrentPage('main');
//         break;
//       case 'Подземелье':
//         setCurrentPage('dungeon'); 
//         break;
//       case 'Зал достижений':
//         setCurrentPage('achievements');
//         break;
//       case 'Алхимический стол':
//         setCurrentPage('alchemictable');
//         break;
//       case 'Магазин':
//         setCurrentPage('shop');
//         break;
//       default:
//         setCurrentPage('main');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div
//         className="app"
//         style={{
//           backgroundImage: "url('/images/background.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <LoginPage onLogin={handleLogin} />
//       </div>
//     );
//   }

//   if (isAdmin) {
//     return (
//       <div className="app"
//         style={{
//           backgroundImage: "url('/images/background.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed",
//         }}
//       >
//         <AdminHeader />
//         <AdminPage />
//       </div>
//     );
//   }

//   return (
//     <div
//       className="app"
//       style={{
//         backgroundImage: "url('/images/background.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <Header onNavItemClick={handleNavClick} currentUser={currentUser} />

//       <div className="content-container">
//         {currentPage === 'main' && <MainContent />}
//         {currentPage === 'library' && <LibraryPage />}
//         {currentPage === 'dungeon' && <DungeonPage />}
//         {currentPage === 'achievements' && <AchievementsPage />}
//         {currentPage === 'alchemictable' && <AlchemicTablePage />}
//         {currentPage === 'shop' && <ShopPage />}
//       </div>
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from 'react';
// import Header from './components/Header/Header';
// import MainContent from './components/MainContent/MainContent';
// import LibraryPage from './components/LibraryPage/LibraryPage';
// import DungeonPage from './components/DungeonPage/DungeonPage';
// import AchievementsPage from './components/AchievementsPage/AchievementsPage';
// import AlchemicTablePage from './components/AlchemicTablePage/AlchemicTablePage';
// import LoginPage from './components/LoginPage/LoginPage'; 
// import AdminPage from './components/AdminPage/AdminPage';
// import AdminHeader from './components/AdminHeader/AdminHeader';
// import ShopPage from './components/ShopPage/ShopPage';
// import AdminAlchemicTable from './components/AdminAlchemicTable/AdminAlchemicTable';
// import * as api from './api';
// import './App.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('main');
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [currentUser, setCurrentUser] = useState<api.Student | null>(null);

//   const [students, setStudents] = useState<api.Student[]>([]); // список студентов
//   const [selectedLab, setSelectedLab] = useState<{ studentId: number; labIndex: number } | null>(null);

//   // Загружаем всех студентов сразу при монтировании
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const studentsData = await api.getStudents();
//         setStudents(studentsData);
//       } catch (err) {
//         console.error('Ошибка при загрузке студентов', err);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const handleLogin = (adminFlag: boolean, student?: api.Student) => {
//     setIsAuthenticated(true); 
//     setIsAdmin(adminFlag);
//     if (student) setCurrentUser(student);
//   };

//   const handleNavClick = (item: string) => {
//     switch(item) {
//       case 'Библиотека знаний': setCurrentPage('library'); break;
//       case 'Главная': setCurrentPage('main'); break;
//       case 'Подземелье': setCurrentPage('dungeon'); break;
//       case 'Зал достижений': setCurrentPage('achievements'); break;
//       case 'Алхимический стол': setCurrentPage('alchemictable'); break;
//       case 'Магазин': setCurrentPage('shop'); break;
//       default: setCurrentPage('main');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="app" style={{
//         backgroundImage: "url('/images/background.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}>
//         <LoginPage onLogin={handleLogin} />
//       </div>
//     );
//   }

//   if (isAdmin) {
//     return (
//       <div className="app" style={{
//         backgroundImage: "url('/images/background.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}>
//         <AdminHeader />

//         {selectedLab ? (
//           <AdminAlchemicTable
//             studentName={students.find(s => s.id === selectedLab.studentId)?.name || ''}
//             labIndex={selectedLab.labIndex}
//             onBack={() => setSelectedLab(null)}
//           />
//         ) : (
//           <AdminPage 
//             students={students} 
//             setStudents={setStudents} 
//             onOpenLab={(studentId, labIndex) => setSelectedLab({ studentId, labIndex })} 
//           />
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="app" style={{
//       backgroundImage: "url('/images/background.png')",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundAttachment: "fixed",
//     }}>
//       <Header onNavItemClick={handleNavClick} currentUser={currentUser} />

//       <div className="content-container">
//         {currentPage === 'main' && <MainContent />}
//         {currentPage === 'library' && <LibraryPage />}
//         {currentPage === 'dungeon' && <DungeonPage />}
//         {currentPage === 'achievements' && <AchievementsPage />}
//         {currentPage === 'alchemictable' && <AlchemicTablePage />}
//         {currentPage === 'shop' && <ShopPage />}
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import LibraryPage from './components/LibraryPage/LibraryPage';
import DungeonPage from './components/DungeonPage/DungeonPage';
import AchievementsPage from './components/AchievementsPage/AchievementsPage';
import AlchemicTablePage from './components/AlchemicTablePage/AlchemicTablePage';
import LoginPage from './components/LoginPage/LoginPage'; 
import AdminPage from './components/AdminPage/AdminPage';
import AdminHeader from './components/AdminHeader/AdminHeader';
import ShopPage from './components/ShopPage/ShopPage';
import AdminAlchemicTable from './components/AdminAlchemicTable/AdminAlchemicTable';
import * as api from './api';
import './App.css';

type SelectedLab = {
  studentId: number;
  labIndex: number;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<api.Student | null>(null);

  const [students, setStudents] = useState<api.Student[]>([]);
  const [selectedLab, setSelectedLab] = useState<SelectedLab | null>(null);

  // Загружаем всех студентов при монтировании
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await api.getStudents();
        setStudents(studentsData);
      } catch (err) {
        console.error('Ошибка при загрузке студентов', err);
      }
    };
    fetchStudents();
  }, []);

  const handleLogin = (adminFlag: boolean, student?: api.Student) => {
    setIsAuthenticated(true); 
    setIsAdmin(adminFlag);
    if (student) setCurrentUser(student);
  };

  const handleNavClick = (item: string) => {
    switch(item) {
      case 'Библиотека знаний': setCurrentPage('library'); break;
      case 'Главная': setCurrentPage('main'); break;
      case 'Подземелье': setCurrentPage('dungeon'); break;
      case 'Зал достижений': setCurrentPage('achievements'); break;
      case 'Алхимический стол': setCurrentPage('alchemictable'); break;
      case 'Магазин': setCurrentPage('shop'); break;
      default: setCurrentPage('main');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app" style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="app" style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
        <AdminHeader />

        {selectedLab ? (
          <AdminAlchemicTable
            studentId={selectedLab.studentId}
            labIndex={selectedLab.labIndex}
            students={students}
            setStudents={setStudents}
            onBack={() => setSelectedLab(null)}
          />
        ) : (
          <AdminPage 
            students={students} 
            setStudents={setStudents} 
            onOpenLab={(studentId: number, labIndex: number) =>
              setSelectedLab({ studentId, labIndex })
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="app" style={{
      backgroundImage: "url('/images/background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      <Header onNavItemClick={handleNavClick} currentUser={currentUser} />

      <div className="content-container">
        {currentPage === 'main' && <MainContent />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'dungeon' && <DungeonPage />}
        {currentPage === 'achievements' && <AchievementsPage />}
        {currentPage === 'alchemictable' && <AlchemicTablePage />}
        {currentPage === 'shop' && <ShopPage />}
      </div>
    </div>
  );
};

export default App;


