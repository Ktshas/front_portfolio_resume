import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';
import PDFViewer from '../../components/ui/PDFViewer';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  padding-top: 6rem; /* GlobalHeader 높이만큼 여백 추가 */
`;

const PortfolioTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PDFContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: transform 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &.secondary {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

const WorkPortfolio: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioContainer>
          <PortfolioTitle>실무 포트폴리오</PortfolioTitle>
          <NavigationContainer>
            <NavButton to="/portfolio">
              ← 포트폴리오 메인
            </NavButton>
            <NavButton to="/portfolio/running" className="secondary">
              러닝 스케줄 날씨 알림 →
            </NavButton>
          </NavigationContainer>
          <PDFContainer>
            <PDFViewer 
              pdfUrl={`${process.env.PUBLIC_URL}/프로젝트 포트폴리오_김태성.pdf`}
              fileName="프로젝트 포트폴리오_김태성.pdf"
            />
          </PDFContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default WorkPortfolio;
