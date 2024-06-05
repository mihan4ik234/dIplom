import React from 'react';
import './Home.css';

function Home() {
  return (
    <>
      <div className='ALLBLOCK'>
        <div className="home-container">
          <h1 className="home-title">ТМЦ ГБОУ "Оренбургская кадетская школа-интернат"</h1>
          <section className="home-section">
            <h2 className="home-subtitle">О системе</h2>
            <p className="home-text">Эта система предназначена для управления товарно-материальными ценностями (ТМЦ) школы. Она позволяет отслеживать актуальный список товаров, списанные товары и товары, находящиеся на ремонте.</p>
          </section>
          <section className="home-section">
            <h2 className="home-subtitle">О школе</h2>
            <p className="home-text">ГБОУ "Оренбургская кадетская школа-интернат" — это образовательное учреждение, предоставляющее учащимся кадетское воспитание и обучение. Школа стремится к высокому уровню образования и воспитания патриотически настроенной молодежи.</p>
          </section>
          <section className="home-section">
            <h2 className="home-subtitle">Зачем нужна эта система</h2>
            <p className="home-text">Система позволяет эффективно управлять ресурсами школы, отслеживать состояние имущества и обеспечивать своевременное обновление и ремонт товаров. Это помогает поддерживать высокий уровень организации и учета, что важно для учебного процесса и воспитательной работы.</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
