import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, X } from 'lucide-react';

const ProjectsSection = styled.section`
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
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.active ? props.theme.gradients.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${props => props.theme.gradients.secondary};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const LiveLink = styled(ProjectLink)`
  background: ${props => props.theme.gradients.primary};
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const CodeLink = styled(ProjectLink)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem 2rem;
`;

const ModalImage = styled.div`
  height: 300px;
  background: ${props => props.theme.gradients.secondary};
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ModalTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: '풀스택 이커머스 플랫폼으로 React, Node.js, PostgreSQL을 사용하여 구축했습니다.',
      longDescription: '사용자 인증, 상품 관리, 결제 시스템, 주문 추적 등 완전한 이커머스 기능을 구현했습니다. 마이크로서비스 아키텍처를 적용하여 확장성을 고려했습니다.',
      image: '🛒',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
      category: 'fullstack',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: '팀 협업을 위한 태스크 관리 애플리케이션입니다.',
      longDescription: '실시간 협업 기능, 드래그 앤 드롭 인터페이스, 알림 시스템을 구현했습니다. WebSocket을 사용하여 실시간 업데이트를 제공합니다.',
      image: '📋',
      tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
      category: 'frontend',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    {
      id: 3,
      title: 'API Gateway Service',
      description: '마이크로서비스 아키텍처를 위한 API 게이트웨이 서비스입니다.',
      longDescription: '인증, 라우팅, 로드 밸런싱, 모니터링 기능을 포함한 완전한 API 게이트웨이를 구현했습니다. Kubernetes 환경에서 운영됩니다.',
      image: '🚪',
      tech: ['Node.js', 'Kubernetes', 'Redis', 'Prometheus'],
      category: 'backend',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: '실시간 데이터 시각화 대시보드입니다.',
      longDescription: 'D3.js와 Chart.js를 활용하여 인터랙티브한 데이터 시각화를 구현했습니다. 실시간 데이터 스트리밍과 필터링 기능을 제공합니다.',
      image: '📊',
      tech: ['React', 'D3.js', 'WebSocket', 'Python'],
      category: 'frontend',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    {
      id: 5,
      title: 'Mobile Banking App',
      description: '모바일 뱅킹 애플리케이션의 백엔드 API입니다.',
      longDescription: '보안이 강화된 금융 서비스 API로 JWT 인증, 암호화, 거래 검증 시스템을 구현했습니다. 높은 가용성과 보안을 보장합니다.',
      image: '🏦',
      tech: ['Node.js', 'PostgreSQL', 'Redis', 'AWS'],
      category: 'backend',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    },
    {
      id: 6,
      title: 'Social Media Platform',
      description: '소셜 미디어 플랫폼의 풀스택 구현입니다.',
      longDescription: '사용자 프로필, 포스트, 댓글, 좋아요, 팔로우 기능을 포함한 완전한 소셜 미디어 플랫폼입니다. 이미지 업로드와 실시간 알림을 지원합니다.',
      image: '📱',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
      category: 'fullstack',
      liveUrl: 'https://example.com',
      codeUrl: 'https://github.com'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          다양한 기술 스택으로 구현한 프로젝트들을 소개합니다
        </SectionSubtitle>

        <FilterContainer>
          {filters.map((filter) => (
            <FilterButton
              key={filter.id}
              active={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectsGrid>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <ProjectImage>
                  {project.image}
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.tech.map((tech, techIndex) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                  <ProjectLinks>
                    <LiveLink
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                      Live Demo
                    </LiveLink>
                    <CodeLink
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </CodeLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>

        <AnimatePresence>
          {selectedProject && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHeader>
                  <ModalTitle>{selectedProject.title}</ModalTitle>
                  <CloseButton
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </CloseButton>
                </ModalHeader>
                <ModalBody>
                  <ModalImage>
                    {selectedProject.image}
                  </ModalImage>
                  <ModalDescription>{selectedProject.longDescription}</ModalDescription>
                  <ModalTech>
                    {selectedProject.tech.map((tech: string, techIndex: number) => (
                      <TechTag key={techIndex}>{tech}</TechTag>
                    ))}
                  </ModalTech>
                  <ModalLinks>
                    <LiveLink
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </LiveLink>
                    <CodeLink
                      href={selectedProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      View Code
                    </CodeLink>
                  </ModalLinks>
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
