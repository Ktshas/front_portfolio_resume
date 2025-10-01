import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../../components/shared/GlobalHeader';
import PortfolioNavigation from '../../../components/shared/PortfolioNavigation';
import PDFViewer from '../../../components/ui/PDFViewer';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  padding-top: 6rem; /* GlobalHeader 높이만큼 여백 추가 */

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
    padding-top: 5rem;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const PDFContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;


const WorkPortfolio: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioNavigation />
        <PortfolioContainer>
          <PortfolioTitle>실무 포트폴리오</PortfolioTitle>
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
