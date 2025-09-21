import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 포트폴리오 하위 페이지들 import
import PortfolioMain from './PortfolioMain';
import WorkPortfolio from './WorkPortfolio';
import RunningSchedule from './RunningSchedule';

const Portfolio: React.FC = () => {
  return (
    <Routes>
      <Route index element={<PortfolioMain />} />
      <Route path="work" element={<WorkPortfolio />} />
      <Route path="running" element={<RunningSchedule />} />
    </Routes>
  );
};

export default Portfolio;
