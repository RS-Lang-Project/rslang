import { FC, Suspense, lazy } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';

const MainPage = lazy(() => import('./pages/MainPage'));
const TextbookPage = lazy(() => import('./pages/TextbookPage'));
const AudioGamePage = lazy(() => import('./pages/AudioGamePage'));
const AudioPromoPage = lazy(() => import('./pages/AudioPromoPage'));
const SprintGamePage = lazy(() => import('./pages/SprintGamePage'));
const SprintPromoPage = lazy(() => import('./pages/SprintPromoPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));

const App: FC = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/textbook" element={<TextbookPage />} />
          <Route path="/audio" element={<AudioPromoPage />} />
          <Route path="/audio-game/:group/:page" element={<AudioGamePage />} />
          <Route path="/sprint" element={<SprintPromoPage />} />
          <Route path="/sprint-game/:group/:page" element={<SprintGamePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Suspense>
    </div>
  </BrowserRouter>
);

export default App;
