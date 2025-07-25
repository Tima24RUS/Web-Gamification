import './AchievementsPage.css';

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <h1>Достижения</h1>
      <p className="description">
        Здесь вы можете посмотреть, какие достижения доступны в курсе. Узнайте, как их открыть, и следите за своим прогрессом.
        Сравните результаты с другими участниками в таблице лидеров и стремитесь стать лучшим!
      </p>

      <div className="achievements-container">
        <div className="achievements-list">
          <h2>Список достижений</h2>
          <div className="achievement-cards">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="achievement-card"></div>
            ))}
          </div>
        </div>

        <div className="leaderboard">
          <h2>Лидерборд</h2>
          <div className="leaderboard-entries">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="leaderboard-item">
                <span className="position">{i + 1}</span>
                <div className="player-avatar"></div>
                <div className="player-info">
                  <div className="player-name">Player228</div>
                  <div className="player-level">уровень 10</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
