import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

const ExperienceSection = styled.section`
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

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.gradients.primary};
    transform: translateX(-50%);

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      left: 2rem;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ side: 'left' | 'right' }>`
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
  ${props => props.side === 'left' ? 'left: 0;' : 'left: 50%;'}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    left: 0;
    padding-left: 4rem;
  }

  &::before {
    content: '';
    position: absolute;
    ${props => props.side === 'left' ? 'right: -1rem;' : 'left: -1rem;'}
    top: 1rem;
    width: 1rem;
    height: 1rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.background};

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      left: 1.5rem;
      right: auto;
    }
  }
`;

const ExperienceCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  margin: 0 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0;
  }
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const JobIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const CompanyName = styled.h4`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const JobMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const JobDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const JobAchievements = styled.ul`
  list-style: none;
  padding: 0;
`;

const Achievement = styled.li`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: '풀스택 개발자',
      company: '리스크제로',
      period: '2025.03 - 현재',
      location: 'Seoul, Korea',
      description: '제로가드 시스템 풀스택 개발 및 신규 기능 구현을 담당하고 있습니다.',
      achievements: [
        '제로가드 v2.0을 처음부터 완전 신규 개발 (1.5개월)',
        '도급계약 개념 도입: 도급계약, 이행실적, 도급사평가, 수급체운영',
        '위험성평가 → 작업허가서 → TBM 자연스럽게 이어지는 기능 설계',
        '구독형 서비스로 운영 가능한 유연한 구조 설계'
      ],
      side: 'left' as const
    },
    {
      id: 2,
      title: '풀스택 개발자',
      company: '가온그룹',
      period: '2023.11 - 2025.03',
      location: 'Seoul, Korea',
      description: '다양한 시스템의 API 개발 및 성능 최적화를 담당했습니다.',
      achievements: [
        'Lghv 셋탑 개통·모니터링 API 개발',
        'KRMS 4.0 API 개발 및 기존 시스템 리뉴얼',
        'KRMS 통계 페이지 로딩 시간 20~30초 → 3초 이내로 개선',
        '상지대학교 공유기 통계 처리 시간 24시간 → 20분 이내로 단축'
      ],
      side: 'right' as const
    },
    {
      id: 3,
      title: '풀스택 개발자',
      company: '어메스',
      period: '2023.07 - 2023.10',
      location: 'Seoul, Korea',
      description: '부품정보 크롤러 및 OCR 파이프라인 개발을 담당했습니다.',
      achievements: [
        'BMW·Volvo·Audi 대상 부품정보 크롤러 개발',
        '처리속도 8시간 → 10분으로 대폭 개선',
        'OCR 이미지 보정 파이프라인 구축',
        'Atlas MongoDB 전환으로 타임아웃 이슈 해소'
      ],
      side: 'left' as const
    },
    {
      id: 4,
      title: '풀스택 개발자',
      company: '가온미디어',
      period: '2022.01 - 2023.07',
      location: 'Seoul, Korea',
      description: 'Web Remote Management 시스템 리뉴얼 및 브로드밴드 장비 관리 기능 개발을 담당했습니다.',
      achievements: [
        'Go·gRPC·RabbitMQ 기반 Web Remote Management 리뉴얼',
        '브로드밴드 장비 관리 기능 개발',
        '펌웨어 업데이트, 앱 설치/삭제, 통계 수집 기능 구현'
      ],
      side: 'right' as const
    },
    {
      id: 5,
      title: '풀스택 개발자',
      company: '리걸테크',
      period: '2019.11 - 2022.01',
      location: 'Seoul, Korea',
      description: 'PC포렌식 관리 서비스 및 블록체인 기반 전자계약 시스템 개발을 담당했습니다.',
      achievements: [
        'PC포렌식 관리 서비스 개발 (설치·라이선스·결과 전송 API)',
        '일본 특허검색 시스템 리뉴얼 (Elasticsearch·XSL 최적화)',
        '블록체인 기반 전자계약 시스템 구축',
        '계약 플로우·템플릿·PDF↔Word 변환 기능 구현'
      ],
      side: 'left' as const
    },
    {
      id: 6,
      title: 'SE/PL',
      company: 'グローテック(그로우테크)',
      period: '2017.09 - 2019.09',
      location: 'Japan',
      description: '가상화폐 거래소 프로젝트 리더 및 안드로이드 앱 개발팀 리더를 담당했습니다.',
      achievements: [
        '가상화폐 거래소 신규·유지보수 프로젝트 리더',
        '안드로이드 앱 개발팀 리더, 전 기능 네이티브 구현',
        '화이트라벨 거래소, ICO 플랫폼 개발',
        '결제·지갑 앱 개발 및 보안 시스템 구축'
      ],
      side: 'right' as const
    },
    {
      id: 7,
      title: '개발자',
      company: 'メイテック(메이테크)',
      period: '2014.11 - 2017.08',
      location: 'Japan',
      description: 'CAD/PLM 시스템 유지·개발 및 도면 견적등록 웹 시스템 성능 개선을 담당했습니다.',
      achievements: [
        'CAD/PLM 시스템 유지·개발',
        'SolidWorks 애드온·자동화 툴 개발',
        '도면 견적등록 웹 시스템 성능 개선',
        '기능 확장 및 사용자 경험 향상'
      ],
      side: 'left' as const
    },
    {
      id: 8,
      title: '개발자',
      company: 'ユーテック(유테크)',
      period: '2012.05 - 2014.08',
      location: 'Japan',
      description: 'SharePoint 그룹웨어 개발·운영 및 생산설비 점검 시스템 개발을 담당했습니다.',
      achievements: [
        'SharePoint 그룹웨어 개발·운영',
        '검색 시스템 재구축 및 성능 최적화',
        '생산설비 점검 시스템 프로토타입 개발',
        '생산설비 점검 시스템 정식 버전 개발'
      ],
      side: 'right' as const
    }
  ];

  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Work Experience
        </SectionTitle>
        
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          다양한 프로젝트와 팀에서 쌓은 경험을 소개합니다
        </SectionSubtitle>

        <Timeline>
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              side={experience.side}
              initial={{ opacity: 0, x: experience.side === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ExperienceCard>
                <JobHeader>
                  <JobIcon>
                    <Briefcase size={20} />
                  </JobIcon>
                  <JobInfo>
                    <JobTitle>{experience.title}</JobTitle>
                    <CompanyName>{experience.company}</CompanyName>
                  </JobInfo>
                </JobHeader>

                <JobMeta>
                  <MetaItem>
                    <Calendar size={16} />
                    {experience.period}
                  </MetaItem>
                  <MetaItem>
                    <MapPin size={16} />
                    {experience.location}
                  </MetaItem>
                </JobMeta>

                <JobDescription>{experience.description}</JobDescription>

                <JobAchievements>
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <Achievement key={achievementIndex}>
                      {achievement}
                    </Achievement>
                  ))}
                </JobAchievements>
              </ExperienceCard>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
