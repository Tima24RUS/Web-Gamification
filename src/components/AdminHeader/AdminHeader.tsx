import { useState } from 'react';
import './AdminHeader.css';
import * as api from '../../api';

interface AdminHeaderProps {
  groups?: api.Group[];
  onGroupSelect?: (groupName: string) => void;
  onAddStudent?: () => void;
  onCreateGroup?: (groupName: string) => void;
}

const AdminHeader = ({ groups = [], onGroupSelect, onAddStudent, onCreateGroup }: AdminHeaderProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSelectChange = (value: string) => {
    if (value === '+ создать группу') {
      setShowCreateForm(true);
    } else {
      onGroupSelect?.(value);
    }
  };

  const handleCreateGroup = () => {
    const trimmedName = newGroupName.trim();
    if (trimmedName && onCreateGroup) {
      onCreateGroup(trimmedName); // передаём только название
      setNewGroupName('');
      setShowCreateForm(false);
    }
  };

  return (
    <header className="admin-header">
      <button className="logo1">лого</button>

      <div className="admin-controls">
        <select className="group-select" onChange={(e) => handleSelectChange(e.target.value)}>
          <option>список групп</option>
          {groups.map((group) => (
            <option key={group.id}>{group.name}</option>
          ))}
          <option>+ создать группу</option>
        </select>

        <button className="add-student" onClick={onAddStudent}>
          + добавить студента
        </button>
      </div>

      <button className="profile-btn">персонаж</button>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Создать группу</h2>
            <input
              type="text"
              placeholder="номер группы"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button onClick={handleCreateGroup}>Создать</button>
            <button onClick={() => setShowCreateForm(false)}>Отмена</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
