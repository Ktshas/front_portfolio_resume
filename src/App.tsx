import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// 페이지 컴포넌트들 import
import Resume from './pages/resume/Resume';
import Portfolio from './pages/portfolio/Portfolio';
import Contact from './pages/contact/Contact';
import ExperienceDetail from './pages/experience/ExperienceDetail';

function App() {
  return (
    <Router basename="/front_portfolio_resume">
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/resume" replace />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio/*" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<ExperienceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;