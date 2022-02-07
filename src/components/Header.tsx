import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: FC = () => (
  <header className="header">
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
    </div>
  </header>
);

export default Header;
