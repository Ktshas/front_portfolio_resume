import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Activity, TrendingUp } from 'lucide-react';

const LocalNavContainer = styled(motion.div)`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  background: rgba(15, 15, 35, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    right: 1rem;
    padding: 0.75rem 0.5rem;
  }
`;

const LocalNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.75rem;
  }
`;

const NavItem = styled(motion.div)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-width: 140px;
  justify-content: flex-start;
  
  background: ${props => props.active 
    ? props.theme.gradients.primary 
    : 'transparent'};
  
  border: 1px solid ${props => props.active 
    ? props.theme.colors.primary 
    : 'transparent'};

  &:hover {
    background: ${props => props.active 
      ? props.theme.gradients.primary 
      : 'rgba(99, 102, 241, 0.1)'};
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateX(-5px);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: auto;
    padding: 0.5rem;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
  }
`;

const NavIcon = styled.div<{ active: boolean }>`
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  }
`;

const NavLabel = styled.span<{ active: boolean }>`
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const PortfolioNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const portfolioSections = [
    { 
      path: '/portfolio/work', 
      label: '실무 포트폴리오',
      icon: <FileText size={16} />
    },
    { 
      path: '/portfolio/stock', 
      label: '내 투자 자산',
      icon: <TrendingUp size={16} />
    },
    { 
      path: '/portfolio/running', 
      label: '러닝 스케줄',
      icon: <Activity size={16} />
    }
  ];

  const isActivePath = (path: string) => {
    // 현재 경로가 해당 섹션에 속하는지 확인
    if (path === '/portfolio/running') {
      return location.pathname.startsWith('/portfolio/running');
    }
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <LocalNavContainer
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <LocalNav>
        {portfolioSections.map((section) => {
          const isActive = isActivePath(section.path);
          
          return (
            <NavItem
              key={section.path}
              active={isActive}
              onClick={() => handleNavigation(section.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavIcon active={isActive}>
                {section.icon}
              </NavIcon>
              <NavLabel active={isActive}>
                {section.label}
              </NavLabel>
            </NavItem>
          );
        })}
      </LocalNav>
    </LocalNavContainer>
  );
};

export default PortfolioNavigation;
