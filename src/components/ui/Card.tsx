import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: string;
  className?: string;
}

const StyledCard = styled(motion.div)<CardProps>`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: ${props => props.padding || '1.5rem'};
  transition: all 0.3s ease;

  ${props => props.hover && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props.theme.shadows.large};
    }
  `}
`;

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  padding,
  className,
  ...props
}) => {
  return (
    <StyledCard
      hover={hover}
      padding={padding}
      className={className}
      whileHover={hover ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
