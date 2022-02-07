import { FC } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import TextbookPage from './pages/TextbookPage';
import AudioGamePage from './pages/AudioGamePage';
import SprintGamePage from './pages/SprintGamePage';
import StatisticsPage from './pages/StatisticsPage';

const App: FC = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/textbook" element={<TextbookPage />} />
        <Route path="/audio" element={<AudioGamePage />} />
        <Route path="/sprint" element={<SprintGamePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
