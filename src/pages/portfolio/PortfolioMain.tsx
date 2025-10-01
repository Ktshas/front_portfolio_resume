import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { FileText, Activity, TrendingUp } from 'lucide-react';

// 공통 컴포넌트들 import
import GlobalHeader from '../../components/shared/GlobalHeader';

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
  margin-bottom: 3rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SectionCard = styled(motion(Link))`
  display: block;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.gradients.primary};
  }
`;

const SectionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const SectionDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SectionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;


const PortfolioMain: React.FC = () => {
  const portfolioSections = [
    {
      id: 'work-portfolio',
      title: '실무 포트폴리오',
      description: '실제 업무에서 진행한 프로젝트들과 개발 경험을 담은 포트폴리오입니다. 다양한 기술 스택과 문제 해결 과정을 확인하실 수 있습니다.',
      icon: <FileText size={24} />,
      path: '/portfolio/work',
      tags: ['Go', 'Python', 'Django', 'MSA설계', '풀스택', '성능최적화', '실무경험']
    },
    {
      id: 'running-schedule',
      title: '러닝 스케줄 날씨 알림',
      description: '러닝 스케줄을 기록하고 기상청 API와 연동하여 러닝 스케줄에 우천 상태 변경이 있으면 알림을 주는 서비스입니다.',
      icon: <Activity size={24} />,
      path: '/portfolio/running',
      tags: ['React', 'API 연동', '풀스택', '개인프로젝트', '비동기처리', 'SpringBoot']
    },
    {
      id: 'stock-alerts',
      title: '주식 알림',
      description: '보유 주식의 실시간 가격 정보를 확인하고 목표가 알림을 받을 수 있는 서비스입니다. 상승/하락 상황을 한눈에 파악할 수 있습니다.',
      icon: <TrendingUp size={24} />,
      path: '/portfolio/stock',
      tags: ['React', 'API 연동', '실시간 데이터', '개인프로젝트', '금융 데이터', '알림 시스템']
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioContainer>
          <PortfolioTitle>프로젝트 포트폴리오</PortfolioTitle>
          

          <SectionsContainer>
            {portfolioSections.map((section, index) => (
              <SectionCard
                key={section.id}
                to={section.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SectionIcon>
                  {section.icon}
                </SectionIcon>
                
                <SectionTitle>{section.title}</SectionTitle>
                
                <SectionDescription>
                  {section.description}
                </SectionDescription>
                
                <SectionTags>
                  {section.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
                </SectionTags>
              </SectionCard>
            ))}
          </SectionsContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default PortfolioMain;
