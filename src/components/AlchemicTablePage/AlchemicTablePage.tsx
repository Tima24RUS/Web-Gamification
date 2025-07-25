import './AlchemicTablePage.css';

const AlchemicTablePage = () => {
  return (
    <div className="alchemic-page">
    

      
      <div className="alchemic-content">
        
        <div className="lab-task">
          <img src="/images/svitok.png" alt="Свиток" className="scroll-image" />
          <div className="scroll-text">
            <h2>Задание на лабораторную работу №1</h2>
            <p>Задание ол ол олиол иолилоии тдовидрф фди фои ф дгфидфи дифдги дфи дф ф дфии фд ифди фи дф ф фи фд дфои оф ф олфи</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            <p>Задание</p>
            
          </div>
        </div>

        {/* Правая панель */}
        <div className="side-panel">
          <div className="apply-scroll">
            <span>Применить свиток</span>
            <div className="checkbox" />
          </div>

          {/* Навигация по свиткам */}
          <div className="scroll-selector">
            <img src="/images/arrow-down.png" className="arrow rotate-left" alt="Назад" />
            <div className="scroll-cards">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="scroll-card" />
              ))}
            </div>
            <img src="/images/arrow-down.png" className="arrow rotate-right" alt="Вперёд" />
          </div>

          
          <button className="open-outline">
            Открыть конспект
            <div className="subtitle">(Диалоговое окно с конспектом)</div>
          </button>
          <button className="open-outline">Прикрепить файл</button>
          <button className="submit-button">Отправить на проверку</button>
        </div>
      </div>
    </div>
  );
};

export default AlchemicTablePage;
