import './styles/App.css';

import { FC } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

const App: FC = () => (
  <div className="App">
    <Header />
    <Footer />
  </div>
);

export default App;
