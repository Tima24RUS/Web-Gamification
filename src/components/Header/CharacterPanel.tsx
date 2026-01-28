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


