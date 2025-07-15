import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="bg">
      <h1 className="tarot-title">TAROT</h1>
      <div className="card-row">
        {/* 왼쪽 카드 (왼쪽 3cm 이동) */}
        <div className="tarot-card left-card">
          <img src="/card_back.png" alt="카드 뒷면" className="card-image" />
        </div>
        {/* 오른쪽 카드 (오른쪽 3cm 이동) */}
        <div className="tarot-card right-card">
          <img src="/card_back2.png" alt="카드 뒷면" className="card-image" />
        </div>
      </div>
      <button className="start-btn">START</button>
    </div>
  );
}

export default App;