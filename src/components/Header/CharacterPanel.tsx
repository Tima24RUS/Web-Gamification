// import './Header.css';

// const CharacterDropdown = () => {
//   return (
//     <div className="character-dropdown">
//       <div className="dropdown-content">
//         <p>Уровень: 5</p>
//         <p>Опыт: 1200/2000</p>
//         <p>Золото: 350</p>
//       </div>
//     </div>
//   );
// };

// export default CharacterDropdown;

// import './Header.css';

// interface CharacterDropdownProps {
//   username: string | null;
// }

// const CharacterDropdown = ({ username }: CharacterDropdownProps) => {
//   return (
//     <div className="character-dropdown">
//       <div className="dropdown-content">
//         <p><strong>{username || 'Гость'}</strong></p>
//         <p>Уровень: 5</p>
//         <p>Опыт: 1200/2000</p>
//         <p>Золото: 350</p>
//       </div>
//     </div>
//   );
// };

// export default CharacterDropdown;

import './Header.css';
import * as api from '../../api';

interface CharacterDropdownProps {
  student: api.Student | null;
}

const CharacterDropdown = ({ student }: CharacterDropdownProps) => {
  return (
    <div className="character-dropdown">
      <div className="dropdown-content">
        <p><strong>{student?.name || 'Гость'}</strong></p>
        <p>Уровень: {student?.level ?? 0}</p>
        <p>Опыт: {student?.experience ?? 0}/2000</p>
        <p>Золото: {student?.gold ?? 0}</p>
      </div>
    </div>
  );
};

export default CharacterDropdown;


