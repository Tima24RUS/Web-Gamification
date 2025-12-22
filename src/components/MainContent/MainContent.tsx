import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-contents">
      <div className="content-wrapper">
        <div className="text-block">
          <h1>Курс по геймификации</h1>
          <p className="subtitle">
            Уникальный онлайн-курс, который превращает процесс обучения в захватывающее путешествие
          </p>
          <p className="description">
            Освойте основы гейм-дизайна, нарратива и игровых механик, чтобы вдохновлять и волновать свою аудиторию
          </p>
        </div>
        <div className="arrow-container">
          <button className="arrow-button">
            <img src="/images/arrow-down.png" alt="Scroll down" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;