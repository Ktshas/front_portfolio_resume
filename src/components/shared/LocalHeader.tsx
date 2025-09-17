import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  min-width: 120px;
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

const NavDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  transition: all 0.3s ease;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 10px;
    height: 10px;
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
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

const LocalHeader: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience'];
      const scrollPosition = window.scrollY + 160; // GlobalHeader + LocalHeader 높이 고려 (약간 증가)

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
  ];

  return (
    <LocalNavContainer
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <LocalNav>
        {sectionItems.map((item) => (
          <NavItem
            key={item.id}
            active={activeSection === item.id}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavDot active={activeSection === item.id} />
            <NavLabel active={activeSection === item.id}>
              {item.label}
            </NavLabel>
          </NavItem>
        ))}
      </LocalNav>
    </LocalNavContainer>
  );
};

export default LocalHeader;
