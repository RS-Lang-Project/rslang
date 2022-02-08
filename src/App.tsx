import { FC, Suspense, lazy } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import './styles/App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const MainPage = lazy(() => import('./pages/MainPage'));
const TextbookPage = lazy(() => import('./pages/TextbookPage'));
const AudioGamePage = lazy(() => import('./pages/AudioGamePage'));
const SprintGamePage = lazy(() => import('./pages/SprintGamePage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));

const App: FC = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/textbook" element={<TextbookPage />} />
          <Route path="/audio" element={<AudioGamePage />} />
          <Route path="/sprint" element={<SprintGamePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
