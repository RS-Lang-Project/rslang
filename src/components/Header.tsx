import '../styles/Header.css';

import { FC } from 'react';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';

import MainPage from '../pages/MainPage';
import TextbookPage from '../pages/TextbookPage';
import AudioGamePage from '../pages/AudioGamePage';
import SprintGamePage from '../pages/SprintGamePage';
import StatisticsPage from '../pages/StatisticsPage';

const Header: FC = () => (
  <header className="header">
    <BrowserRouter>
      <div className="container">
        <div className="header-wrapper">
          <div>RS Lang</div>
          <nav className="header-nav">
            <Link className="header-link" to="/">Главная</Link>
            <Link className="header-link" to="/textbook">Учебник</Link>
            <div className="drop-down-menu">
              <div>Игры</div>
              <Link className="header-link" to="/audio">Аудиовызов</Link>
              <Link className="header-link" to="/sprint">Спринт</Link>
            </div>
            <Link className="header-link" to="/statistics">Статистика</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/textbook" element={<TextbookPage />} />
          <Route path="/audio" element={<AudioGamePage />} />
          <Route path="/sprint" element={<SprintGamePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </header>
);

export default Header;
