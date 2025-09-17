import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Settings,
  Zap,
  Shield,
  GitBranch,
  Server,
  MessageSquare,
  Globe,
  Bot
} from 'lucide-react';

const SkillsSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.background};
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SkillCategory = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillBadge = styled(motion.div)<{ level: 'expert' | 'advanced' | 'intermediate' }>`
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => {
    switch (props.level) {
      case 'expert':
        return `
          background: ${props.theme.gradients.primary};
          color: white;
          box-shadow: ${props.theme.shadows.glow};
        `;
      case 'advanced':
        return `
          background: ${props.theme.colors.accent};
          color: white;
        `;
      case 'intermediate':
        return `
          background: ${props.theme.colors.surface};
          color: ${props.theme.colors.text};
          border: 1px solid ${props.theme.colors.border};
        `;
      default:
        return '';
    }
  }}

  &:hover {
    transform: scale(1.05);
  }
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const TechCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
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

const TechIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: ${props => props.theme.gradients.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const TechName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const TechDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Skills: React.FC = () => {
  const skillCategories = [
    {
      icon: <Server size={24} />,
      title: '백엔드 개발',
      skills: [
        { name: 'Go', level: 'expert' as const },
        { name: 'Python', level: 'expert' as const },
        { name: 'Java', level: 'expert' as const },
        { name: 'C#', level: 'advanced' as const },
        { name: 'ASP.NET', level: 'advanced' as const },
        { name: 'Django', level: 'expert' as const },
        { name: 'FastAPI', level: 'expert' as const },
        { name: 'Spring Boot', level: 'advanced' as const },
      ]
    },
    {
      icon: <Code size={24} />,
      title: '프론트엔드 개발',
      skills: [
        { name: 'React', level: 'expert' as const },
        { name: 'Vue.js', level: 'advanced' as const },
        { name: 'Thymeleaf', level: 'advanced' as const },
        { name: 'jQuery', level: 'expert' as const },
        { name: 'TypeScript', level: 'advanced' as const },
        { name: 'HTML/CSS', level: 'expert' as const },
      ]
    },
    {
      icon: <Smartphone size={24} />,
      title: '모바일 앱',
      skills: [
        { name: 'Xamarin (Android/iOS)', level: 'expert' as const },
        { name: 'Android (Java)', level: 'advanced' as const },
      ]
    },
    {
      icon: <Cloud size={24} />,
      title: '클라우드 환경 활용',
      skills: [
        { name: 'AWS', level: 'advanced' as const },
        { name: 'GCP', level: 'advanced' as const },
      ]
    },
    {
      icon: <GitBranch size={24} />,
      title: 'DevOps 협업 경험',
      skills: [
        { name: 'Jenkins', level: 'advanced' as const },
        { name: 'TeamCity', level: 'advanced' as const },
        { name: 'Jira', level: 'expert' as const },
      ]
    },
    {
      icon: <Database size={24} />,
      title: '데이터베이스',
      skills: [
        { name: 'MySQL', level: 'expert' as const },
        { name: 'PostgreSQL', level: 'expert' as const },
        { name: 'Oracle', level: 'advanced' as const },
        { name: 'MongoDB', level: 'expert' as const },
        { name: 'Redis', level: 'advanced' as const },
        { name: 'Elasticsearch', level: 'advanced' as const },
      ]
    },
    {
      icon: <MessageSquare size={24} />,
      title: '메시징 & 프로토콜',
      skills: [
        { name: 'RabbitMQ', level: 'expert' as const },
        { name: 'Pub/Sub', level: 'advanced' as const },
        { name: 'gRPC', level: 'expert' as const },
        { name: 'REST API', level: 'expert' as const },
        { name: 'CWMP', level: 'advanced' as const },
        { name: 'XMPP', level: 'advanced' as const },
      ]
    },
    {
      icon: <Settings size={24} />,
      title: '아키텍처 설계',
      skills: [
        { name: '마이크로서비스', level: 'expert' as const },
        { name: '분산 시스템', level: 'expert' as const },
      ]
    }
  ];

  const techStack = [
    {
      icon: <Bot size={24} />,
      name: 'AI 활용',
      description: 'Cursor, Claude 등 활용 경험, 업무 퍼포먼스 최소 3배~10배 향상'
    },
    {
      icon: <Globe size={24} />,
      name: '언어 능력',
      description: '일본어(JLPT N2, JPT 960), 영어(TOEIC 635)\n* 최고 점수 기준, 유효기간 내 점수 아님'
    },
    {
      icon: <Zap size={24} />,
      name: '성능 최적화',
      description: 'SQL/MongoDB 인덱싱, 로직 개선, 분산처리, 병렬처리를 통한 성능 최적화'
    },
    {
      icon: <Shield size={24} />,
      name: '시스템 설계',
      description: '시스템 구조 설계, DB 설계, 프로그램 설계 등 유지보수성과 확장성을 고려한 시스템 설계 경험'
    }
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          핵심 역량
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          13년간 다양한 기술 스택을 활용하여 최적의 솔루션을 제공해왔습니다
        </SectionSubtitle>

        <SkillsGrid>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryHeader>
                <CategoryIcon>
                  {category.icon}
                </CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              
              <SkillsList>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skillIndex}
                    level={skill.level}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill.name}
                  </SkillBadge>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>

        <TechStack>
          {techStack.map((tech, index) => (
            <TechCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TechIcon>
                {tech.icon}
              </TechIcon>
              <TechName>{tech.name}</TechName>
              <TechDescription>{tech.description}</TechDescription>
            </TechCard>
          ))}
        </TechStack>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
