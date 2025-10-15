import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Building2, Code, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ExperienceSection = styled.section`
  padding: 6rem 0 6rem 0;
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

const SectionTitleStyled = styled.h4<{ variant?: 'warning' | 'success' | 'default' }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => {
      if (props.variant === 'warning') return '#f59e0b'; // amber-500
      if (props.variant === 'success') return '#3b82f6'; // blue-500
      return props.theme.colors.primary;
    }};
  }
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

const ExperienceCase: React.FC = () => {
  return (
    <ExperienceSection id="experience-detail">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          경력기술서
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6}}
          viewport={{ once: true }}
        >
          실무에서 겪은 의미있는 문제 해결 과정과, 성공/실패 사례를 상세하게 소개합니다.
        </SectionSubtitle>

        <CaseStudyCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CompanyHeader>
            <CompanyIcon>
              <Building2 size={24} />
            </CompanyIcon>
            <CompanyInfo>
              <CompanyName>가온그룹</CompanyName>
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
              <TechTag>MongoDB</TechTag>
              <TechTag>Docker</TechTag>
              <TechTag>Redis</TechTag>
            </TechTags>
          </TechStack>

          <ProblemSection>
            <SectionTitleStyled variant="warning">
              <AlertTriangle size={18} />
              XMPP 디바이스 커넥트 서비스의 레거시 코드 문제 개선 사례
            </SectionTitleStyled>
            <ProblemDescription>
              디바이스와의 접속 상태를 관리하고, 메시지 통신을 위한 기본이 되는 XMPP 서버의 레거시 코드가 Golang의 채널과 버스로 복잡하게 구성되어 있으나 자료도 없고 주석도 없으며 수많은 장비로부터 메시지가 끝없이 올라오고 병렬 처리로 인해 로그를 봐도 프로그램의 동작 순서를 파악하기조차 어려운 상황이었습니다.<br/>
              디바이스의 전원이 꺼졌는데 시스템에서는 Online으로 표시된다, 디바이스가 Online 상태로 표시되고 있는데, 시스템에서 명령을 내리면 장치가 꺼져있다고 한다, 전원Off 명령을 내렸는데 시스템에서 1분 30초가 지나야 Off로 나온다 등<br/>
              똑같은 내용의 질문이 매번 나오는데 아무도 명확하게 설명하지 못하고 XMPP 서비스를 들여다볼 엄두도 못내는 상황이였습니다
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled variant="success">
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

          <ProblemSection>
            <SectionTitleStyled variant="warning">
              <AlertTriangle size={18} />
              정의되지 않은 디바이스 액션과 타스크 관리 문제 해결 사례
            </SectionTitleStyled>
            <ProblemDescription>
              RMS 시스템을 통해 디바이스에 명령을 내릴 때, 어떨때는 장치가 바쁘다고 실패하고, 어떨때는 그냥 실패하고, 어떨때는 성공하는데.<br/>
              명령에 따라 어떤 경우에 어떤 Response 메세지를 받는지 정리되어 있지않아 질문을 받아도 답변을 못하는 상황이였습니다.<br/>
              또 장치가 바쁘다고 실패할때는, 결과를 바로 받는것이 아니라 5분이 지나 타임아웃이 발생해야 결과를 받을 수 있는 이상한 상황이였습니다.
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled variant="success">
              <CheckCircle size={18} />
              개선 사항
            </SectionTitleStyled>
            <ImprovementDescription>
              시스템을 전체적으로 재개발 하는 과정에서 장치별 명령을 Task로 명확하게 관리하기 위한 도메인을 추가하였습니다.<br/>
              장비팀과 협조하여 장치가 동시에 수행할 수 있는 액션과, 그렇지 못한 액션을 구분하여 정리했습니다.<br/>
              정리한 내용을 바탕으로, 장치에 명령을 내릴때는 반드시 Task를 통해 어떤 명령을 내렸는지 관리하도록 하였으며.<br/>
              Task에서 장치에 바로 명령을 내리거나, Queue에 쌓았다가 순차로 처리하도록 하거나, 다른 액션이 불가한 액션을 실행중이면 곧바로 실패 Response를 반환하도록 하였습니다.<br/>
              또한 Task는 몽고DB를 통해 장치 Endpoint와 유니크한 TaskId를 기반으로 관리하도록 하였습니다.<br/>
              이로 인해 각 장치에서 어떤 명령을 내렸는지 로그를 화면을 통해 쉽게 볼 수 있게 하였고, 디버깅에도 매우 유용하게 사용할 수 있었습니다.<br/>
            </ImprovementDescription>
          </ImprovementSection>

          <ProblemSection>
            <SectionTitleStyled variant="warning">
              <AlertTriangle size={18} />
              야간 통계데이터 작성, 실시간 통계 데이터 처리 성능 문제 해결 사례
            </SectionTitleStyled>
            <ProblemDescription>
              대학교에 배치된 AP에 접속/해제된 디바이스들의 연결시간 통계를 일간, 주간, 월간 단위로 작성하는 프로세스가 있었습니다.<br/>
              AP가 주는 정보는 합계된 접속 시간이 아니고, 해제된 시간은 따로 주지 않아 연결시간을 계산하기가 매우 어려웠습니다.<br/>
              또한, 수많은 학생들이 수십대의 AP에 접속/연결해제 된 이력이 다 담겨있기 때문에 최대한 BigO를 줄일 수 있는 로직으로 구현했습니다.<br/>
              6개월 정도는 아무 문제가 없었으나, 데이터가 점점 늘어나며 통계 작성 시간이 점점 늘어나다 하루를 초과하게 되었습니다. 
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled variant="success">
              <CheckCircle size={18} />
              개선 사항
            </SectionTitleStyled>
            <ImprovementDescription>
              로그 분석 결과 DB 검색에서 SlowQuery가 발생하고 있었고. 로직적으로 더 개선할수는 없는 상황이였습니다.<br/>
              반복해서 DB 검색하는 처리를 최소화 했기때문에 그 이상 쿼리를 줄일수도 없는 상황이였습니다.<br/>
              이를 해결하기 위해 인덱싱을 테스트하기 위해, 비슷한 양의 데이터를 개발서버에 구성하고, 검색 쿼리에 맞게 인덱싱을 추가했습니다.<br/>
              몇번의 시도끝에 어렵지않게 엄청난 효과를 볼 수 있었고, 하루를 넘어가던 처리가 30분 이내로 줄어들게 되었습니다.<br/>
              뿐만 아니라, MongoDB 검색도 인덱싱을 통해 최적화 할 수 있었고, 이로 인해 프로세스 <b>전체 실행시간이 15분 이내로</b> 줄어들게 되었습니다.<br/>
              <b>추가 대책으로</b>, 로그성 데이터이기 때문에 통계 작성이 완료된 후에는 필요 없으므로 <b>3개월의 TTL을 설정</b>하므로써 재발 가능성을 완전 배제했습니다.<br/>
              DB 인덱싱이 읽기성능 향상에 도움이 된다는건 알고는 있었지만 그 효과가 상상이상임을 체감하고 이 후 인덱싱을 통해 성능개선 경험을 계속 쌓아갈 수 있었습니다.<br/>
              통계 데이터 작성 뿐 아니라, 대시보드 등에서 실시간 통계 데이터를 조회하는 기능도 인덱싱을 통해 성능을 크게 개선할 수 있었습니다.<br/>
            </ImprovementDescription>
          </ImprovementSection>

        </CaseStudyCard>

        {/* 리걸테크 사례 */}
        <CaseStudyCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CompanyHeader>
            <CompanyIcon>
              <Building2 size={24} />
            </CompanyIcon>
            <CompanyInfo>
              <CompanyName>리걸테크</CompanyName>
            </CompanyInfo>
          </CompanyHeader>

          <TechStack>
            <TechStackTitle>
              <Code size={18} />
              기술 스택
            </TechStackTitle>
            <TechTags>
              <TechTag>Python</TechTag>
              <TechTag>Django</TechTag>
              <TechTag>Elasticsearch</TechTag>
              <TechTag>XSL</TechTag>
              <TechTag>MySQL</TechTag>
            </TechTags>
          </TechStack>

          <ProblemSection>
            <SectionTitleStyled variant="warning">
              <AlertTriangle size={18} />
              전자계약 시스템 개발 사례
            </SectionTitleStyled>
            <ProblemDescription>
              전자계약 시스템에서 핵심이 되는 계약서 작성, 수정, 서명, 상태변경, 이력관리 등 기능 개발을 담당했습니다.<br/>
              중요한건 계약서를 수정/삭제 하거나, 진행상태를 변경해도 되는 상태의 정리, 시스템에 가입되지 않은 사용자의 서명페이지 등의 명확한 정의가 중요했습니다.<br/>
              계약의 진행 상태가 이전상태로 돌아가는게 가능하기 때문에 꽤 복잡할 수 있게 되었고, 상태별 또는 상태를 되돌림에 따른 버그가 발생하기 쉬운 구성이였습니다.
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled variant="success">
              <CheckCircle size={18} />
              대처 방법
            </SectionTitleStyled>
            <ImprovementDescription>
              명확한 기능정의와 기획이 되지 않으면 어디까지가 의도된 처리이고 뭐가 버그인지 알 수 없는 시스템이 될 것이라 판단했습니다.<br/>
              시스템 설계 단계에서 기획자와 꾸준하게 협의했고, 개발 진행간에도 기획적 문제나 모순이 발견되면 바로 기획자와 협의해서 수정하며 진행했습니다.<br/>
              계약서 작성 프로세스에 대해 모든 상태별 가능/불가능한 처리, 상태 변경시 발생하는 모든 이벤트에 대해 명확하게 정의하고 진행했습니다.<br/>
              <b>당연한 얘기를 적은 것 같지만, 이 당연한 프로세스가 이뤄지지 않고 개발되는 시스템들이 정말 많습니다.</b><br/>
              그럴 때마다 기획서가 없어서 이게 버그인지 성능인지 모르겠다, 디버깅이 어려워서 유지보수가 어렵다는 이유로 매번 시스템을 다시만드는 경우를 너무 많이 봤습니다.<br/>
              그렇기에 저는 이 프로젝트가 가장 완성도높고 만족스러운 결과물을 만들어 낼 수 있었고, 시스템 완성도가 떨어지고 잘 돌아가지 않는 조직의 문제를 비교할 수 있는 가장 좋은 프로젝트로 기억하고 있습니다.
            </ImprovementDescription>
          </ImprovementSection>
        </CaseStudyCard>

        {/* 시스템 운영 비교 사례 */}
        <CaseStudyCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CompanyHeader>
            <CompanyIcon>
              <Building2 size={24} />
            </CompanyIcon>
            <CompanyInfo>
              <CompanyName>잘 운영되는 시스템 & 잘 운영되지 않는 시스템과 조직에 대한 비교 </CompanyName>
            </CompanyInfo>
          </CompanyHeader>

          <TechStack>
            <TechStackTitle>
              <Code size={18} />
              분석 대상 회사
            </TechStackTitle>
            <TechTags>
              <TechTag>가온그룹</TechTag>
              <TechTag>리걸테크</TechTag>
              <TechTag>그로테크</TechTag>
              <TechTag>어메스</TechTag>
              <TechTag>리스크제로</TechTag>
            </TechTags>
          </TechStack>

          <ProblemSection>
            <SectionTitleStyled variant="warning">
              <AlertTriangle size={18} />
              패치 때마다 버그발생, 사이드이펙트 발생하는 시스템과 조직의 문제.
            </SectionTitleStyled>
            <ProblemDescription>
              어메스와 리스크제로에서 경험한 문제점은 사람이 바뀔 때마다 "기존 시스템의 유지보수가 어렵다, 퀄리티가 떨어진다, 기획서가 없어서 버그인지 의도된 기능인지 모르겠다"는 이유로 시스템을 새로 만들려고 하는 상황이 반복되는 것이었습니다.<br/>
              그러나 시스템을 다시 만들고 나서도 결국 아무것도 개선되지 않고 동일한 문제가 반복해서 발생되고 있었습니다.<br/>
              이 두곳은 몇가지 공통점이 있었습니다.<br/>
              • 최소한의 기능정의, 기획서조차 없이 개발한다.<br/>
              • 시간 리소스가 부족해서 다시 만드는 상황에서 조차 기능정의를 제대로 하지 않고 만든다.<br/>
              • 개발팀의 인원 구조에 문제가 있다. 리드개발자 아래에 중간급 개발자 없이 시니어 개발자들만 존재하고, 리드개발자는 개발 업무보다 다른 업무들로 더 바쁘다.<br/>
              • 인적리소스, 구조, 시간리소스의 절대적인 부족이 근본적인 원인이나 이것을 개발론이나 프로젝트 관리방법을 통해 해결할 수 있다 생각하여 계속 새로운것을 시도하나 그것이 더 많은 리소스 낭비를 유발하여 악순환 발생.<br/>
            </ProblemDescription>
          </ProblemSection>

          <ImprovementSection>
            <SectionTitleStyled variant="success">
              <CheckCircle size={18} />
              잘 운영되는 시스템의 특징과 그로테크 문제 해결 사례
            </SectionTitleStyled>
            <ImprovementDescription>
              <strong>잘 운영되는 시스템 (가온그룹, 리걸테크):</strong><br/>
              • 기획서를 명확하게 작성하고 일을 진행, 가온그룹은 문서화가 잘 되어있지 않았지만 내가 근무하면서 설계서를 작성하고 일을 진행하는 문화를 만듦<br/>
              • 개발자 개개인이 전부 중급 이상으로 프로그램 수정 시 영향범위를 충분히 파악할 수 있고, 필요할 때 동료들과 상의할 수 있는 역량을 갖춤<br/>

              <strong>그로테크 문제 해결 사례:</strong><br/>
              그로테크는 초기에 어메스, 리스크제로와 유사한 문제를 가지고 있었습니다. 가상화폐 거래소 시스템이 복잡하게 얽혀있고, 기존 개발자들도 시스템을 이해하지 못하고 있는 상황이었습니다.<br/>
              팀의 개발자 구성도, 최고급 개발자가 팀장을 하고있고, 그 아래에 주니어급 개발자만 두명이 있었습니다.<br/>
              단, 이곳은 해야 할 일에대한 사전 문서작업이 매우 잘 이뤄지고 있었고, 문제는 그걸 팀장이 해야해서 팀장은 개발에 오롯이 집중할 수 없고 격무에 시달리고, 주니어들의 산출물은 배포때마다 버그를 발생시키고 있었습니다.<br/>
              제가 입사하고 두달정도 바쁜 프로젝트를 겪고 난 후에, 어느정도 시스템 구조를 파악하게 되었고. 팀장으로 부터 PL 업무를 해달라는 요청을 받았습니다.<br/>
              팀장은 고객으로 부터 오는 여러개의 요건들을 나눠서 저에게 분배하고 저는 각 요건들에 따른 시스템 영향범위를 고려하여 상세설계까지 마친 뒤, 주니어 개발자들에게 개발 업무를 분배했습니다.<br/>
              주니어들의 역량을 고려하여, 상세설계를 디테일하게 했기때문에 산출물의 퀄리티가 좋아졌고, 규모가 작았기 때문에 모든 커밋된 코드들은 제가 전부 리뷰했습니다.<br/>
              시스템이 코드링크 방식으로 화이트라벨을 많이 운영하고 있어서 사이드 이펙트 위험이 정말 높은 구성이였지만, 제가 중간급 개발자로 주니어들을 리딩하고 나서부터 패치후 버그나 사이드이펙트 발생이 현저하게 줄었습니다.<br/>
              팀장 또한 프로젝트 관리 외에 본인의 개발업무에 집중할 수 있게되었고 업무부담을 많이 줄일 수 있게 되었습니다.
            </ImprovementDescription>
          </ImprovementSection>
        </CaseStudyCard>
      </Container>
    </ExperienceSection>
  );
};

export default ExperienceCase;
