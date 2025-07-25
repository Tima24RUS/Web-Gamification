import { useState } from 'react';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import LibraryPage from './components/LibraryPage/LibraryPage';
import DungeonPage from './components/DungeonPage/DungeonPage';
import AchievementsPage from './components/AchievementsPage/AchievementsPage';
import AlchemicTablePage from './components/AlchemicTablePage/AlchemicTablePage';
import LoginPage from './components/LoginPage/LoginPage'; 

import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  const handleNavClick = (item: string) => {
    switch(item) {
      case 'Библиотека знаний':
        setCurrentPage('library');
        break;
      case 'Главная':
        setCurrentPage('main');
        break;
      case 'Подземелье':
        setCurrentPage('dungeon'); 
        break;
      case 'Зал достижений':
        setCurrentPage('achievements');
        break;
      case 'Алхимический стол':
        setCurrentPage('alchemictable');
        break;
      default:
        setCurrentPage('main');
    }
  };

  
  if (!isAuthenticated) {
    return (
      <div
        className="app"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  
  return (
    <div
      className="app"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Header onNavItemClick={handleNavClick} />

      <div className="content-container">
        {currentPage === 'main' && <MainContent />}
        {currentPage === 'library' && <LibraryPage />}
        {currentPage === 'dungeon' && <DungeonPage />}
        {currentPage === 'achievements' && <AchievementsPage />}
        {currentPage === 'alchemictable' && <AlchemicTablePage />}
      </div>
    </div>
  );
};

export default App;
