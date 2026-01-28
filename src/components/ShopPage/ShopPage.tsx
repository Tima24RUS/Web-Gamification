import './ShopPage.css';
import { useState } from 'react';

const ShopPage = () => {
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<number | null>(null);
  const [selectedShopItem, setSelectedShopItem] = useState<number | null>(null);

  const items = Array(8).fill({ count: 2, icon: '/images/scroll-icon.png' }); 

  return (
    <div className="shop-page">
      <h1>Магазин</h1>
      <p className="shop-subtitle">
        Здесь ты можешь продать найденные артефакты или ненужные предметы, а на вырученные ресурсы приобрести новое
        снаряжение, усиления и редкие трофеи. Каждая покупка приближает тебя к следующей победе!
      </p>

      <div className="coin-display">
        <img src="/images/coin.png" alt="coin" />
        <span>1050</span>
      </div>

      <div className="shop-panels">
        {/* Инвентарь */}
        <div className="panel">
          <h2>Инвентарь</h2>
          <div className="items-grid">
            {items.map((item, index) => (
              <div
                key={index}
                className={`item ${selectedInventoryItem === index ? 'selected' : ''}`}
                onClick={() => setSelectedInventoryItem(index)}
              >
                <img src={item.icon} alt="item" />
                <span className="count">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="description-box">
            <strong>Свиток гарантированного урона</strong>
            <p>Наносит ¼ базового урона при ошибке в ответе. При правильном ответе урон остаётся стандартным.</p>
            <div className="item-stats">
              <span><img src="/images/coin.png" /> 100</span>
              <span><img src="/images/star.png" /> обычный</span>
              <span><img src="/images/damage-icon.png" /> +¼ урона</span>
            </div>
          </div>
        </div>

        {/* Стрелки */}
        <div className="arrow-buttons">
          <img
            src={selectedInventoryItem !== null ? '/images/arrow-orange.png' : '/images/arrow-grey.png'}
            className="arrow arrow-right"
            alt="sell"
          />
          <img
            src={selectedShopItem !== null ? '/images/arrow-orange.png' : '/images/arrow-grey.png'}
            className="arrow arrow-left"
            alt="buy"
          />
        </div>

        {/* Магазин */}
        <div className="panel">
          <h2>Магазин</h2>
          <div className="items-grid">
            {items.map((item, index) => (
              <div
                key={index}
                className={`item ${selectedShopItem === index ? 'selected' : ''}`}
                onClick={() => setSelectedShopItem(index)}
              >
                <img src={item.icon} alt="item" />
                <span className="count">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="description-box">
            <strong>Выберите предмет</strong>
            <p>Краткое описание</p>
            <div className="item-stats">
              <span><img src="/images/coin.png" /> -</span>
              <span><img src="/images/star.png" /> -</span>
              <span><img src="/images/damage-icon.png" /> -</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
