// import { useState } from 'react';
// import CharacterDropdown from './CharacterPanel';
// import NavButton from './NavButton';
// import './Header.css';

// const Header = ({ onNavItemClick }: { onNavItemClick: (item: string) => void }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navItems = ['Главная', 'Библиотека знаний', 'Подземелье', 'Зал достижений', 'Алхимический стол', 'Магазин'];

//   return (
//     <header className="header">
//       <div className="logo">Логотип</div>
      
//       <nav className="nav-menu">
//         {navItems.map((item) => (
//           <NavButton 
//             key={item} 
//             text={item}
//             onClick={() => onNavItemClick(item)}
//           />
//         ))}
//       </nav>

//       <div 
//         className="character-button-wrapper"
//         onMouseEnter={() => setShowDropdown(true)}
//         onMouseLeave={() => setShowDropdown(false)}
//       >
//         <button className="character-button">
//           Персонаж
//         </button>
//         {showDropdown && <CharacterDropdown />}
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { useState } from 'react';
// import CharacterDropdown from './CharacterPanel';
// import NavButton from './NavButton';
// import './Header.css';

// interface HeaderProps {
//   onNavItemClick: (item: string) => void;
//   username: string | null;
// }

// const Header = ({ onNavItemClick, username }: HeaderProps) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navItems = ['Главная', 'Библиотека знаний', 'Подземелье', 'Зал достижений', 'Алхимический стол', 'Магазин'];

//   return (
//     <header className="header">
//       <div className="logo">Логотип</div>
      
//       <nav className="nav-menu">
//         {navItems.map((item) => (
//           <NavButton 
//             key={item} 
//             text={item}
//             onClick={() => onNavItemClick(item)}
//           />
//         ))}
//       </nav>

//       <div 
//         className="character-button-wrapper"
//         onMouseEnter={() => setShowDropdown(true)}
//         onMouseLeave={() => setShowDropdown(false)}
//       >
//         <button className="character-button">
//           Персонаж
//         </button>
//         {showDropdown && <CharacterDropdown username={username} />}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState } from 'react';
import CharacterDropdown from './CharacterPanel';
import NavButton from './NavButton';
import './Header.css';
import * as api from '../../api';

interface HeaderProps {
  onNavItemClick: (item: string) => void;
  currentUser: api.Student | null;
}

const Header = ({ onNavItemClick, currentUser }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navItems = ['Главная', 'Библиотека знаний', 'Подземелье', 'Зал достижений', 'Алхимический стол', 'Магазин'];

  return (
    <header className="header">
      <div className="logo">Логотип</div>
      
      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavButton 
            key={item} 
            text={item}
            onClick={() => onNavItemClick(item)}
          />
        ))}
      </nav>

      <div 
        className="character-button-wrapper"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button className="character-button">
          Персонаж
        </button>
        {showDropdown && <CharacterDropdown student={currentUser} />}
      </div>
    </header>
  );
};

export default Header;

