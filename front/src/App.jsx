import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Chatting from './pages/Chatting';
import Main from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';
import CardSelector from './pages/CardSelector';


function App() {

  return (
    <div className='container'>

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chatting />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cardSelector" element={<CardSelector />} />
    </Routes>
    </div>
  )
}

export default App
