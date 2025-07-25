import './LoginPage.css';
import { useState } from 'react';

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(); 
    } else {
      alert('Пожалуйста, введите логин и пароль');
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
