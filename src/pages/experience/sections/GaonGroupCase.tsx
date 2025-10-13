import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Building2, Code, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ExperienceSection = styled.section`
  padding: 8rem 0 6rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  min-height: 100vh;
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

const CaseStudyCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CompanyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const CompanyPeriod = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin: 0;
`;

const TechStack = styled.div`
  margin-bottom: 2rem;
`;

const TechStackTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${props => props.theme.colors.primary}40;
`;

const ProblemSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitleStyled = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProblemDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  text-align: left;
  font-size: 1rem;
`;

const ImprovementSection = styled.div`
  margin-bottom: 2rem;
`;

const ImprovementDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  text-align: left;
  font-size: 1rem;
`;

const TechnicalDetails = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const TechnicalTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TechnicalDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
  text-align: left;
`;

const GaonGroupCase: React.FC = () => {
  return (
    <ExperienceSection id="experience-detail">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          경력기술서
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          실무에서 겪은 의미있는 문제 해결 과정과, 성공/실패 사례를 상세하게 소개합니다.
        </SectionSubtitle>

        <CaseStudyCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CompanyHeader>
            <CompanyIcon>
              <Building2 size={24} />
            </CompanyIcon>
            <CompanyInfo>
              <CompanyName>가온그룹</CompanyName>
              <CompanyPeriod>2023.11 - 2025.03</CompanyPeriod>
            </CompanyInfo>
          </CompanyHeader>

          <TechStack>
            <TechStackTitle>
              <Code size={18} />
              기술 스택
            </TechStackTitle>
            <TechTags>
              <TechTag>Go (Golang)</TechTag>
              <TechTag>gRPC</TechTag>
              <TechTag>RabbitMQ</TechTag>
              <TechTag>XMPP</TechTag>
              <TechTag>MySQL</TechTag>
              <TechTag>Docker</TechTag>
              <TechTag>Redis</TechTag>
            </TechTags>
          </TechStack>

          <ProblemSection>
            <SectionTitleStyled>
              <AlertTriangle size={18} />
              XMPP 디바이스 커넥트 서비스의 레거시 코드 문제 개선
            </SectionTitleStyled>
            <ProblemDescription>
              디바이스와의 접속 상태를 관리하고, 메시지 통신을 위한 기본이 되는 XMPP 서버의 레거시 코드가 Golang의 채널과 버스로 복잡하게 구성되어 있으나 자료도 없고 주석도 없으며 수많은 장비로부터 메시지가 끝없이 올라오고 병렬 처리로 인해 로그를 봐도 프로그램의 동작 순서를 파악하기조차 어려운 상황이었습니다.
              디바이스의 전원이 꺼졌는데 시스템에서는 Online으로 표시된다. 디바이스가 Online 상태로 표시되고 있는데, 시스템에서 명령을 내리면 장치가 꺼져있다고 한다, 전원Off 명령을 내렸는데 시스템에서 1분 30초가 지나야 Off로 나온다 등
              똑같은 내용의 질문이 매번 나오는데 아무도 명확하게 설명하지 못하고 XMPP 서비스를 들여다볼 엄두도 못내는 상황이였습니다
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled>
              <CheckCircle size={18} />
              개선 사항
            </SectionTitleStyled>
            <ImprovementDescription>
              먼저 XMPP 서버의 코드를 분석하기위해 인프라팀에 협조를 구해 도커로 간단한 개인 테스트 환경을 만들고, 테스트 환경에 디바이스를 한대 붙였습니다.<br/>
              디바이스에 메세지에 의한 전원 Off, 재부팅과 물리적인 전원제거, 네트워크케이블 제거 등 다양항 상황에서 증상을 재현하고 정리하며.<br/>
              디바이스와 XMPP가 어떻게 커넥션을 맺고 On/Off 상태를 유지하며, 전원상태가 올바르게 싱크되는 상황과 되지 않는 상황을 파악하였습니다.<br/>
              그 과정에서 디버깅을 통해 파악한 소스코드의 흐름은 전부 주석으로 설명하여 그 이후에 입사한 개발자들은 XMPP의 처리를 제대로 이해할 수 있도록 했습니다.<br/>
              물리적인 전원, 네트워크 케이블 제거에 의한 OffLine 처리는 시스템에서 네트워크 불안 상황을 고려하여 30초간격 3번의 핑퐁체크에 의해 1분30초라는 텀이 발생하는 것이라는 등.
              의문의 증상들에 대해 명확히 파악하여 정보를 공유하므로써 더이상 같은 팀 개발자, 상사, QA에서는 동일한 질문이 반복해서 나오지 않도록 하였습니다.
            </ImprovementDescription>
          </ImprovementSection>

        </CaseStudyCard>
      </Container>
    </ExperienceSection>
  );
};

export default GaonGroupCase;
