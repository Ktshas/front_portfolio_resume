import React from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const MadeWith = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const HeartIcon = styled(Heart)`
  color: ${props => props.theme.colors.error};
  animation: heartbeat 2s infinite;
  
  @keyframes heartbeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <Copyright>
          © 2025 . All rights reserved.
        </Copyright>
        <MadeWith>
          Made with <HeartIcon size={16} /> by 김태성 & cursor AI
        </MadeWith>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
