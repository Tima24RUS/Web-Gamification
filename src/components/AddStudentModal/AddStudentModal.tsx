import { useState, useEffect } from 'react';
import './AddStudentModal.css';

interface AddStudentModalProps {
  onClose: () => void;
  onAdd: (count: number, bindToCurrent: boolean, groupName?: string) => void;
  currentGroup?: string | null;
  groups?: string[]; // список всех групп для валидации
}

const AddStudentModal = ({ onClose, onAdd, currentGroup, groups = [] }: AddStudentModalProps) => {
  const [count, setCount] = useState<number>(1);
  const [bindToCurrent, setBindToCurrent] = useState<boolean>(true);
  const [groupName, setGroupName] = useState<string>(currentGroup || '');

  useEffect(() => {
    // при открытии модалки всегда подставляем текущую группу
    setGroupName(currentGroup || '');
    setBindToCurrent(true);
    setCount(1);
  }, [currentGroup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (count <= 0) {
      alert('Введите количество студентов больше 0');
      return;
    }

    // если пользователь снимает привязку к текущей группе, проверяем корректность группы
    if (!bindToCurrent && !groups.includes(groupName)) {
      alert('Введите корректное название группы');
      return;
    }

    onAdd(count, bindToCurrent, groupName || currentGroup || undefined);
    handleClose();
  };

  const handleClose = () => {
    setCount(1);
    setBindToCurrent(true);
    setGroupName(currentGroup || '');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Добавить студента</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            placeholder="количество студентов"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={bindToCurrent}
              onChange={(e) => setBindToCurrent(e.target.checked)}
            />
            привязка студента к текущей группе
          </label>

          {!bindToCurrent && (
            <input
              type="text"
              placeholder="введите группу для привязки"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          )}

          <p className="hint">ник и пароль генерируются автоматически</p>

          <div className="modal-actions">
            <button type="submit" className="add-btn">Добавить</button>
            <button type="button" className="cancel-btn" onClick={handleClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
