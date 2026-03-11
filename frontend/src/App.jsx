import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CheckPoint from './pages/CheckPoint.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkpoint" element={<CheckPoint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
