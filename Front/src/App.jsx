import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Actual from './pages/Actual';
import WrittenOff from './pages/WrittenOff';
import Repair from './pages/Repair';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actual" element={<Actual />} />
        <Route path="/written-off" element={<WrittenOff />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
