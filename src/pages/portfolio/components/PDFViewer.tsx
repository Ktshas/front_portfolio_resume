import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

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
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
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
`;

const PDFFrame = styled.iframe`
  width: 100%;
  height: 85vh;
  border: none;
  transition: all 0.3s ease;
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.click();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <PDFViewerContainer>
      <PDFControls>
        <DownloadButton
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          다운로드
        </DownloadButton>
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
