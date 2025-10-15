import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Code, Lightbulb, Heart, Globe, Award, GraduationCap, MapPin, Download, FileText, Briefcase, FolderOpen, ExternalLink, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AboutSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.surface};
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const VisualContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const DownloadSection = styled.div`
  text-align: center;
`;

const DownloadTitle = styled(motion.h3)`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const DownloadButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DownloadButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const DownloadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionSectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PortfolioSection = styled.div`
  text-align: center;
`;

const PortfolioTitle = styled(motion.h3)`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const PortfolioButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PortfolioButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const PortfolioIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 경력기술서 섹션 스타일
const ExperienceButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }
`;

const ExperienceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 포트폴리오 미리보기 버튼 스타일
const PortfolioTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PreviewButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }
`;

// 모달 스타일
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  max-width: 90vw;
  max-height: 90vh;
  width: 800px;
  height: 700px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }
`;

const SlideContainer = styled.div`
  position: relative;
  height: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const SlideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
`;

const SlideTextContainer = styled.div`
  text-align: center;
  flex-shrink: 0;
`;

const SlideTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const SlideSubtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const SlideImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-height: 0;
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const SlideNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const SlideIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

const IndicatorDot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const portfolioImages = [
    {
      title: '실무 포트폴리오',
      images: [
        {
          image: '/portfolio-work-1.png',
          title: '실무 포트폴리오',
          subtitle: 'Golang 프로젝트 소개'
        },
        {
          image: '/portfolio-work-2.png',
          title: '실무 포트폴리오',
          subtitle: 'Golang 셋탑 원격관제 시스템 MSA 설계'
        },
        {
          image: '/portfolio-work-3.png',
          title: '실무 포트폴리오',
          subtitle: 'Python 특허, 상표검색 시스템'
        },
        {
          image: '/portfolio-work-4.png',
          title: '실무 포트폴리오',
          subtitle: 'Python 전자계약 사이트'
        },
        {
          image: '/portfolio-work-5.png',
          title: '실무 포트폴리오',
          subtitle: 'Python PC 포렌식 관리 서비스'
        }
      ]
    },
    {
      title: '투자자산 알림',
      images: [
        {
          image: '/portfolio-stock-1.png',
          title: '투자자산 알림',
          subtitle: '내 관심 주식/가상화폐 목표가 도달 자동알림 시스템'
        }
      ]
    }
  ];

  const allImages = portfolioImages.flatMap(portfolio => 
    portfolio.images.map(imageData => ({ ...portfolio, ...imageData }))
  );

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentSlide(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const features = [
    {
      icon: <Code size={20} />,
      title: '풀스택 개발',
      description: '백엔드·프론트엔드 프로젝트를 경험하며, 언어·프레임워크·데이터베이스에 구애받지 않고 시스템을 설계하고 구현합니다.'
    },
    {
      icon: <Globe size={20} />,
      title: '국제적 경험',
      description: '일본 현지에서 7년간 근무하며 네이티브 수준의 비즈니스 일본어 능력을 갖추었습니다.'
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'AI 활용',
      description: 'AI를 적극 활용하여 업무, 학습 속도가 폭발적으로 향상되어 더 높은 퍼포먼스와 완성물을 낼 수 있습니다.'
    },
    {
      icon: <Heart size={20} />,
      title: '협업 중심',
      description: '팀원간 협업을 중요시하며, 업무 충돌 방지와 원활한 소통을 위한 문화를 만들어갑니다.'
    }
  ];

  const portfolioProjects = [
    {
      name: '실무 포트폴리오',
      url: '/front_portfolio_resume/portfolio/work',
      icon: <Briefcase size={18} />
    },
    {
      name: '투자자산 알림',
      url: '/front_portfolio_resume/portfolio/stock',
      icon: <ExternalLink size={18} />
    },
    {
      name: '러닝 스케줄 날씨 알림',
      url: '/front_portfolio_resume/portfolio/running',
      icon: <ExternalLink size={18} />
    }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          13년 차 풀스택 개발자이자 시스템 설계자로서의 여정을 소개합니다
        </SectionSubtitle>

        <Content>
          <TextContent>
            <Description
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left' }}
            >
              안녕하세요! 저는 <Highlight>13년 차 풀스택 개발자이자 시스템 설계자</Highlight>입니다. 
              다양한 산업군에서 백엔드·프론트엔드 프로젝트를 경험하였으며, 언어·프레임워크·데이터베이스에 구애받지 않고 속도·안정성·확장성을 모두 만족시키는 시스템을 설계하고 구현해왔습니다.
            </Description>
            
            <Description
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left' }}
            >
              일본 현지에서 <Highlight>7년간 근무</Highlight>하며 네이티브 수준의 비즈니스 일본어 능력을 갖추었고, 여전히 비즈니스 레벨의 일본어 능력을 유지하고 있습니다. 
              최근에는 AI를 적극 활용하여 업무, 학습 속도가 폭발적으로 향상되어 경험이 거의 없던 스프링 부트나 리액트 개발에서 AI를 활용하지 않는 개발자들과 비교해 더 높은 퍼포먼스와 완성물을 낼 수 있게 되었습니다.
            </Description>
            
            <Description
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left' }}
            >
              팀원간 협업을 중요시하며 실현 방법으로는 진행할 업무내용을 사전 공유하고, 팀원들 또한 진행할 업무에 대해 팀 전체에 공유하고 진행하는 문화를 만들기 위해 노력합니다.
              이렇게 하므로써 동일한 업무를 여러 사람이 진행하거나, 관리자가 모르는 업무를 팀원이 혼자 진행하여 관리되지 않는 타스크가 발생하는 일을 줄여갈 수 있습니다.
              또한 팀간의 협업 또한 잘 이뤄져야 서비스의 완성도가 높아진다고 생각하기 때문에 타 팀과의 협업에 대해서도 방어적으로 대하는 문화를 지양하며, 적극적으로 협업하는 문화를 만들어가려 노력합니다.
            </Description>

            <StatsContainer>
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <StatNumber>13+</StatNumber>
                <StatLabel>년 경력</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <StatNumber>7</StatNumber>
                <StatLabel>일본 근무년수</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <StatNumber>N2</StatNumber>
                <StatLabel>일본어 능력</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                <StatNumber>4.39</StatNumber>
                <StatLabel>학점 (4.5만점)</StatLabel>
              </StatCard>
            </StatsContainer>

            <PortfolioSection>
              <PortfolioTitleContainer>
                <PortfolioTitle
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  경력기술서 페이지
                </PortfolioTitle>
                <ExperienceButton
                  onClick={() => navigate('/experience')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExperienceIcon>
                    <Briefcase size={18} />
                  </ExperienceIcon>
                  바로가기
                </ExperienceButton>
                <PortfolioTitle
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  포트폴리오 페이지
                </PortfolioTitle>
                <PreviewButton
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openModal}
                >
                  <Eye size={16} />
                  미리보기
                </PreviewButton>
              </PortfolioTitleContainer>
              
              <PortfolioButtons>
                {portfolioProjects.map((project, index) => (
                  <PortfolioButton
                    key={index}
                    href={project.url}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PortfolioIcon>
                      {project.icon}
                    </PortfolioIcon>
                    {project.name}
                  </PortfolioButton>
                ))}
              </PortfolioButtons>
            </PortfolioSection>

          </TextContent>

          <VisualContainer>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}

            <DownloadSection>
              <DownloadTitle
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                viewport={{ once: true }}
              >
                자료 다운로드
              </DownloadTitle>
              
              <DownloadButtons>
                <DownloadButton
                  href={`${process.env.PUBLIC_URL}/김태성_이력서.pdf`}
                  download="김태성_이력서.pdf"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon>
                    <FileText size={18} />
                  </DownloadIcon>
                  이력서 다운로드
                </DownloadButton>
                
                <DownloadButton
                  href={`${process.env.PUBLIC_URL}/프로젝트 포트폴리오_김태성.pdf`}
                  download="김태성_실무포트폴리오.pdf"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon>
                    <FolderOpen size={18} />
                  </DownloadIcon>
                  실무 포트폴리오 다운로드
                </DownloadButton>
              </DownloadButtons>
            </DownloadSection>
          </VisualContainer>
        </Content>
      </Container>

      {/* 포트폴리오 미리보기 모달 */}
      {isModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                포트폴리오 미리보기 - {currentSlide + 1} / {allImages.length}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            
            <SlideContainer>
              <SlideContent>
                <SlideTextContainer>
                  <SlideTitle>{allImages[currentSlide]?.title}</SlideTitle>
                  <SlideSubtitle>{allImages[currentSlide]?.subtitle}</SlideSubtitle>
                </SlideTextContainer>
                
                <SlideImageContainer>
                  <SlideImage 
                    src={`${process.env.PUBLIC_URL}${allImages[currentSlide]?.image}`}
                    alt={allImages[currentSlide]?.title}
                    onError={(e) => {
                      // 이미지 로드 실패 시 기본 이미지 표시
                      (e.target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/logo512.png`;
                    }}
                  />
                </SlideImageContainer>
              </SlideContent>
              
              <SlideNavigation className="prev" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </SlideNavigation>
              
              <SlideNavigation className="next" onClick={nextSlide}>
                <ChevronRight size={20} />
              </SlideNavigation>
              
              <SlideIndicator>
                {allImages.map((_, index) => (
                  <IndicatorDot
                    key={index}
                    active={index === currentSlide}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </SlideIndicator>
            </SlideContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AboutSection>
  );
};

export default About;
