import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Actual from './pages/Actual';
import WrittenOff from './pages/WrittenOff';
import Repair from './pages/Repair';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // Убедитесь, что путь правильный
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actual" element={<PrivateRoute><Actual /></PrivateRoute>} />
        <Route path="/written-off" element={<PrivateRoute><WrittenOff /></PrivateRoute>} />
        <Route path="/repair" element={<PrivateRoute><Repair /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
