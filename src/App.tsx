import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { Completed } from './pages/Completed'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:genre" element={<Game />} />
        <Route path="/completed/:genre" element={<Completed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;