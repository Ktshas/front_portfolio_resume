import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${props => props.theme.gradients.background};
  overflow: hidden;
  padding-top: 120px; /* GlobalHeader + LocalHeader 높이만큼 여백 추가 */
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  z-index: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Greeting = styled(motion.div)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  margin: 0;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 500px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.gradients.primary};
  color: white;
  box-shadow: ${props => props.theme.shadows.medium};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.border};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const VisualContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CodeBlock = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: ${props => props.theme.shadows.large};
  max-width: 400px;
  width: 100%;
`;

const CodeLine = styled.div<{ indent?: number }>`
  margin-left: ${props => props.indent ? `${props.indent * 1.5}rem` : '0'};
  color: ${props => props.theme.colors.textSecondary};
`;

const Keyword = styled.span`
  color: ${props => props.theme.colors.primary};
`;

const String = styled.span`
  color: ${props => props.theme.colors.accent};
`;

const Comment = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  opacity: 0.7;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <BackgroundPattern />
      <Container>
        <Content>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            👋 안녕하세요, 저는
          </Greeting>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            풀스택 개발자
          </Title>
          
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            백엔드 중심의 웹 개발자
          </Subtitle>
          
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            사용자 경험을 중시하며, 확장 가능하고 효율적인 웹 애플리케이션을 개발합니다. 
            최신 기술 트렌드를 학습하고 적용하여 혁신적인 솔루션을 제공합니다.
          </Description>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <PrimaryButton
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
              프로젝트 보기
            </PrimaryButton>
            <SecondaryButton
              href={`${process.env.PUBLIC_URL}/김태성_이력서_경력기술서_250918.pdf`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} />
              이력서 다운로드
            </SecondaryButton>
          </ButtonGroup>
        </Content>

        <VisualContainer>
          <CodeBlock
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CodeLine>
              <Comment>// 풀스택 개발자로서의 여정</Comment>
            </CodeLine>
            <CodeLine>
              <Keyword>const</Keyword> developer = <Keyword>new</Keyword> <String>'FullStackDeveloper'</String>();
            </CodeLine>
            <CodeLine indent={1}>
              developer.<String>skills</String> = [
            </CodeLine>
            <CodeLine indent={2}>
              <String>'React'</String>, <String>'Node.js'</String>, <String>'TypeScript'</String>,
            </CodeLine>
            <CodeLine indent={2}>
              <String>'PostgreSQL'</String>, <String>'Docker'</String>, <String>'AWS'</String>
            </CodeLine>
            <CodeLine indent={1}>
              ];
            </CodeLine>
            <CodeLine>
              developer.<String>passion</String> = <String>'사용자 중심의 개발'</String>;
            </CodeLine>
            <CodeLine>
              developer.<String>goal</String> = <String>'혁신적인 솔루션 제공'</String>;
            </CodeLine>
          </CodeBlock>
        </VisualContainer>
      </Container>

      <ScrollIndicator
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ScrollText>더 알아보기</ScrollText>
        <ChevronDown size={20} />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
