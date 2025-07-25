
import './LibraryPage.css';
import { useState } from 'react';

const LibraryPage = () => {
  const lectures = [
    {
      id: 1,
      title: "Геймификация как язык и метод: от игр к обучению",
      description: "Познакомьтесь с основами геймификации, её целями и отличиями от игр",
      unlocked: true,
      video: "/videos/lecture-1.mp4",
      image: '/images/lecture-1-bg.png'
    },
    {
      id: 2,
      title: "Механики игрофикации",
      description: "Изучите основные игровые механики и их применение",
      unlocked: true,
      video: "/videos/lecture-2.mp4",
      image: '/images/lecture-1-bg.png'
    },
    {
      id: 3,
      title: "Подготовка содержания: перевод знаний в игровой опыт",
      description: "Научитесь превращать сухой текст в вовлекающие сценарии",
      unlocked: false,
      video: "/videos/lecture-3.mp4",
      image: '/images/lecture-1-bg.png'
    },
    {
      id: 4,
      title: "Игровые метафоры и архитектура контента",
      description: "Выстраиваем целостную систему обучения в игровом формате",
      unlocked: false,
      video: "/videos/lecture-4.mp4",
      image: '/images/lecture-1-bg.png'
    },
    {
      id: 5,
      title: "Подведение итогов: практика и анализ",
      description: "Разбираем реальные кейсы и лучшие практики геймификации",
      unlocked: false,
      video: "/videos/lecture-5.mp4",
      image: '/images/lecture-1-bg.png'
    },
  ];

  const [selectedLecture, setSelectedLecture] = useState<null | typeof lectures[0]>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLectureClick = (lecture: typeof lectures[0]) => {
    if (!lecture.unlocked) return;
    setSelectedLecture(lecture);
    setIsPlaying(false);
  };

  const handleBack = () => {
    setSelectedLecture(null);
    setIsPlaying(false);
  };

  return (
    <div className="library-page">
      {!selectedLecture ? (
        <div className="library-content">
          <h1>Библиотека знаний</h1>
          <p className="subtitle">Здесь вы найдете все модули и лекции курса...</p>
          <div className="lectures-grid">
            {lectures.map(lecture => (
              <div
                key={lecture.id}
                className={`lecture-card ${lecture.unlocked ? '' : 'locked'}`}
                style={{ backgroundImage: `url(${lecture.image})`, cursor: lecture.unlocked ? 'pointer' : 'default' }}
                onClick={() => handleLectureClick(lecture)}
              >
                {!lecture.unlocked && (
                  <div className="lock-overlay">
                    <img src="/images/lock-icon.png" alt="Заблокировано" className="lock-icon" />
                  </div>
                )}
                <div className="lecture-content">
                  <span className="lecture-label">лекция {lecture.id}</span>
                  <h3>{lecture.title}</h3>
                  <p>{lecture.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="lecture-player">
          <h2>Лекция {selectedLecture.id}. {selectedLecture.title}</h2>
          <div className="video-wrapper">
            {!isPlaying ? (
              <img
                src="/images/custom-play.png" 
                alt="Play"
                className="custom-play-button"
                onClick={() => setIsPlaying(true)}
              />
            ) : (
              <video controls autoPlay>
                <source src={selectedLecture.video} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            )}
          </div>
          <button className="back-button" onClick={handleBack}>← Назад к лекциям</button>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
