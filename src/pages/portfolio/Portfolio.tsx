import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';
import PDFViewer from './components/PDFViewer';

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

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Portfolio: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioContainer>
          <PortfolioTitle>프로젝트 포트폴리오</PortfolioTitle>
          <BackLink to="/resume">
            ← 이력서 보기
          </BackLink>
          <PDFContainer>
            <PDFViewer 
              pdfUrl="/프로젝트 포트폴리오_김태성.pdf"
              fileName="프로젝트 포트폴리오_김태성.pdf"
            />
          </PDFContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
