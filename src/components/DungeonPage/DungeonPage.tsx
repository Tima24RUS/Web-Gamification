import './DungeonPage.css';

const bosses = [
  {
    id: 1,
    name: 'Улу Тойон',
    module: 'модуль 1',
    unlocked: true,
    image: '/images/boss-ulu.png',
  },
  {
    id: 2,
    name: 'Имя Босса',
    module: 'модуль 2',
    unlocked: false,
  },
  {
    id: 3,
    name: 'Имя Босса',
    module: 'модуль 3',
    unlocked: false,
  },
  {
    id: 4,
    name: 'Имя Босса',
    module: 'модуль 4',
    unlocked: false,
  },
  {
    id: 5,
    name: 'Имя Босса',
    module: 'модуль 5',
    unlocked: false,
  },
];

const DungeonPage = () => {
  const handleEnterDungeon = () => {
    alert('Переход в бой с Улу Тойон...');
  };

  return (
    <div className="dungeon-page">
      <h1>Подземелье</h1>
      <p className="dungeon-description">
        Здесь вы найдёте всех боссов курса. Сражайтесь с ними, чтобы открыть новые лекции и продвинуться в своём обучении. Каждый бой — это шаг к освоению геймификации!
      </p>

      <div className="boss-carousel">
        <img
          src="/images/arrow-down.png"
          alt="Назад"
          className="arrow-button rotate-left"
        />

        {bosses.map((boss) => (
          <div
            key={boss.id}
            className={`boss-card ${boss.unlocked ? 'unlocked' : 'locked'}`}
          >
            {boss.unlocked ? (
              <img src={boss.image} alt={boss.name} className="boss-image" />
            ) : (
              <img
                src="/images/lock-icon.png"
                alt="Заблокировано"
                className="boss-lock"
              />
            )}
            <div className="boss-name">{boss.name}</div>
            <div className="boss-module">{boss.module}</div>
          </div>
        ))}

        <img
          src="/images/arrow-down.png"
          alt="Вперёд"
          className="arrow-button rotate-right"
        />
      </div>

      <div className="enter-dungeon-wrapper">
        <img
          src="/images/scroll.png"
          alt="Свиток"
          className="scroll-background"
        />
        <div className="enter-dungeon-text" onClick={handleEnterDungeon}>
          ВОЙТИ В ПОДЗЕМЕЛЬЕ<br />
          <span className="boss-info">модуль 1. Босс — Улу Тойон</span>
        </div>
      </div>
    </div>
  );
};

export default DungeonPage;
