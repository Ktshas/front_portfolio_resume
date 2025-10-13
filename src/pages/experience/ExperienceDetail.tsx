import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';

// 섹션 컴포넌트들 import
import GaonGroupCase from './sections/GaonGroupCase';

const ExperienceDetail: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <GaonGroupCase />
      </div>
    </ThemeProvider>
  );
};

export default ExperienceDetail;
