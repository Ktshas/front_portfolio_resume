import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  fileName?: string;
}

const PDFViewerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.large};
`;

const PDFControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const OpenInNewTabButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const MobileMessage = styled.div`
  display: none;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const DownloadButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const PDFContainer = styled.div`
  position: relative;
  background: #f5f5f5;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 400px;
  }
`;

const PDFFrame = styled.iframe`
  width: 100%;
  height: 85vh;
  border: none;
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 70vh;
    min-height: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 75vh;
    min-height: 500px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, fileName = 'portfolio.pdf' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // 모바일에서는 PDF 뷰어 대신 다운로드 안내만 표시
  if (isMobile) {
    return (
      <PDFViewerContainer>
        <PDFControls>
          <MobileMessage>
            스마트폰에서는 PDF 파일을 다운로드해서 봐주세요.
          </MobileMessage>
          
          <ControlButtons>
            <DownloadButton
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              PDF 다운로드
            </DownloadButton>
          </ControlButtons>
        </PDFControls>
      </PDFViewerContainer>
    );
  }

  return (
    <PDFViewerContainer>
      <PDFControls>
        <ControlButtons>
          <DownloadButton
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            다운로드
          </DownloadButton>
          
          <OpenInNewTabButton
            onClick={handleOpenInNewTab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            새 탭에서 열기
          </OpenInNewTabButton>
        </ControlButtons>
      </PDFControls>

      <PDFContainer>
        {isLoading && (
          <LoadingContainer>
            <LoadingSpinner />
            <div>PDF를 불러오는 중...</div>
          </LoadingContainer>
        )}
        
        <PDFFrame
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          onLoad={handleIframeLoad}
          style={{
            display: isLoading ? 'none' : 'block'
          }}
        />
      </PDFContainer>
    </PDFViewerContainer>
  );
};

export default PDFViewer;
