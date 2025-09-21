import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../theme';
import { Calendar, Cloud, Activity } from 'lucide-react';

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
  margin-bottom: 2rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const NavButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: transform 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
  }

  &.secondary {
    background: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
  }
`;

const ComingSoonCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin: 2rem 0;
`;

const ComingSoonTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ComingSoonDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  h4 {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const RunningSchedule: React.FC = () => {
  const features = [
    {
      icon: <Calendar size={20} />,
      title: '일정 관리',
      description: '러닝 계획을 체계적으로 관리'
    },
    {
      icon: <Cloud size={20} />,
      title: '날씨 정보',
      description: '기상청 API로 실시간 날씨 확인'
    },
    {
      icon: <Activity size={20} />,
      title: '운동 기록',
      description: '러닝 활동 데이터 추적'
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioContainer>
          <PortfolioTitle>러닝 스케줄 관리</PortfolioTitle>
          
          <NavigationContainer>
            <NavButton to="/portfolio">
              ← 포트폴리오 메인
            </NavButton>
            <NavButton to="/portfolio/work" className="secondary">
              실무 포트폴리오 →
            </NavButton>
          </NavigationContainer>

          <ContentContainer>
            <ComingSoonCard>
              <ComingSoonTitle>🏃‍♂️ 곧 공개 예정입니다!</ComingSoonTitle>
              <ComingSoonDescription>
                기상청 API를 활용한 스마트 러닝 스케줄 관리 시스템을 개발 중입니다.
                날씨 정보를 기반으로 최적의 러닝 일정을 추천하고 관리할 수 있는 기능을 제공할 예정입니다.
              </ComingSoonDescription>
              
              <FeatureList>
                {features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>
                      {feature.icon}
                    </FeatureIcon>
                    <FeatureText>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </FeatureText>
                  </FeatureItem>
                ))}
              </FeatureList>
            </ComingSoonCard>
          </ContentContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default RunningSchedule;
