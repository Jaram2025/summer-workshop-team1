import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Chatting from './pages/Chatting';
import Main from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <div className='container'>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/chat" element={<Chatting />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </div>
  )
}

export default App
