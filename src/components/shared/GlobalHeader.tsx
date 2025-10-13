import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Github, Linkedin, Mail } from 'lucide-react';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1rem 0;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  cursor: pointer;
`;

const LogoIcon = styled(Code)`
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(motion(Link))`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.gradients.primary};
    border-radius: 1px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(motion(Link))`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileSocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const GlobalHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pageItems = [
    { path: '/resume', label: '이력서(자기소개)' },
    { path: '/experience', label: '경력기술서' },
    { path: '/portfolio', label: '포트폴리오' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <HeaderContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isScrolled 
            ? 'rgba(15, 15, 35, 0.95)' 
            : 'rgba(15, 15, 35, 0.8)'
        }}
      >
        <Nav>
          <Logo
            as={Link}
            to="/resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogoIcon size={24} />
            Portfolio
          </Logo>

          <NavLinks>
            {pageItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <SocialLinks>
            <SocialLink
              href="https://github.com/Ktshas/front_portfolio_resume"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </SocialLink>
            <SocialLink
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} />
            </SocialLink>
          </SocialLinks>

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          {pageItems.map((item, index) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <MobileSocialLinks>
            <SocialLink
              href="https://github.com/Ktshas/front_portfolio_resume"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </SocialLink>
            <SocialLink
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </SocialLink>
          </MobileSocialLinks>
        </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;
