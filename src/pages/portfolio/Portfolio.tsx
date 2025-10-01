import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 포트폴리오 하위 페이지들 import
import PortfolioMain from './PortfolioMain';
import WorkPortfolio from './work/WorkPortfolio';
import RunningSchedule from './running/RunningSchedule';
import ScheduleDetail from './running/ScheduleDetail';
import StockAlerts from './stock/StockAlerts';

const Portfolio: React.FC = () => {
  return (
    <Routes>
      <Route index element={<PortfolioMain />} />
      <Route path="work" element={<WorkPortfolio />} />
      <Route path="running" element={<RunningSchedule />} />
      <Route path="running/schedule/:scheduleId" element={<ScheduleDetail />} />
      <Route path="stock" element={<StockAlerts />} />
    </Routes>
  );
};

export default Portfolio;
