import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';
import LocalHeader from '../../components/shared/LocalHeader';

// 섹션 컴포넌트들 import
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Footer from './sections/Footer';

const Resume: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <LocalHeader />
        <About />
        <Skills />
        <Experience />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Resume;
