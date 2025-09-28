import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Loader } from 'lucide-react';
import { RunningSchedule } from '../../types/schedule';
import { getWeatherForTime } from '../../data/mockWeatherData';
import WeatherCard from '../../pages/portfolio/running/components/WeatherCard';
import { scheduleApi } from '../../services/scheduleApi';

interface UpcomingScheduleProps {
  schedules: RunningSchedule[];
}

const UpcomingContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const UpcomingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const UpcomingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ScheduleCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const ScheduleTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
`;

const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ScheduleDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;


const NoScheduleMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  padding: 1rem;
`;

const DaysUntil = styled.div`
  background: ${props => props.theme.gradients.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    align-self: center;
  }
`;

const UpcomingSchedule: React.FC<UpcomingScheduleProps> = ({ schedules }) => {
  const [upcomingSchedule, setUpcomingSchedule] = useState<RunningSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUpcomingScheduleId = (): string | null => {
    const today = new Date();
    // 오늘 날짜를 00:00:00으로 설정하여 날짜만 비교
    today.setHours(0, 0, 0, 0);
    
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);
    oneWeekLater.setHours(23, 59, 59, 999);

    // 오늘부터 1주일 이내의 스케줄만 필터링
    const upcomingSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0); // 시간 정보 제거하여 날짜만 비교
      return scheduleDate >= today && scheduleDate <= oneWeekLater;
    });

    // 날짜순으로 정렬해서 가장 가까운 스케줄 반환
    upcomingSchedules.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() === dateB.getTime()) {
        // 같은 날이면 시간 순으로 정렬
        return a.startTime.localeCompare(b.startTime);
      }
      return dateA.getTime() - dateB.getTime();
    });

    return upcomingSchedules.length > 0 ? upcomingSchedules[0].id : null;
  };

  // 다가오는 스케줄의 상세 정보를 로드
  useEffect(() => {
    const loadUpcomingScheduleDetail = async () => {
      const upcomingScheduleId = getUpcomingScheduleId();
      
      if (!upcomingScheduleId) {
        setUpcomingSchedule(null);
        return;
      }

      // 기존 스케줄 데이터 확인
      const existingSchedule = schedules.find(s => s.id === upcomingScheduleId);
      if (existingSchedule) {
        // 기존 데이터가 있으면 일단 표시하고, 상세 정보는 별도로 로드
        setUpcomingSchedule(existingSchedule);
      }

      setIsLoading(true);
      try {
        console.log('다가오는 스케줄 상세 정보 로드 시작:', upcomingScheduleId);
        
        // ID로 상세 스케줄 정보 조회 (기상정보 포함)
        const detailedSchedule = await scheduleApi.getRunningScheduleById(upcomingScheduleId);
        
        // API 응답을 프론트엔드 타입으로 변환
        const convertedSchedule = scheduleApi.mapApiResponseToSchedule(detailedSchedule);
        setUpcomingSchedule(convertedSchedule);
        
        console.log('다가오는 스케줄 상세 정보 로드 완료:', convertedSchedule);
      } catch (error) {
        console.error('다가오는 스케줄 상세 조회 실패:', error);
        // 실패 시 기존 데이터 사용 (기상정보 없음)
        const fallbackSchedule = schedules.find(s => s.id === upcomingScheduleId);
        setUpcomingSchedule(fallbackSchedule || null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUpcomingScheduleDetail();
  }, [schedules]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatTime = (time: string) => {
    // HHMM 형식을 HH:mm 형식으로 변환
    if (time.length === 4 && !time.includes(':')) {
      return time.substring(0, 2) + ':' + time.substring(2, 4);
    }
    return time; // 이미 HH:mm 형식인 경우 그대로 사용
  };

  const getDaysUntil = (dateStr: string): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜를 00:00:00으로 설정
    
    const scheduleDate = new Date(dateStr);
    scheduleDate.setHours(0, 0, 0, 0); // 스케줄 날짜도 00:00:00으로 설정
    
    const diffTime = scheduleDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '내일';
    if (diffDays === 2) return '모레';
    return `D-${diffDays}`;
  };

  if (isLoading) {
    return (
      <UpcomingContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UpcomingHeader>
          <Calendar size={20} color="#6366f1" />
          <UpcomingTitle>다가오는 러닝 스케줄</UpcomingTitle>
        </UpcomingHeader>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <Loader size={24} className="animate-spin" />
          <span style={{ marginLeft: '0.5rem', color: '#6366f1' }}>스케줄 정보를 불러오는 중...</span>
        </div>
      </UpcomingContainer>
    );
  }

  if (!upcomingSchedule) {
    return (
      <UpcomingContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <UpcomingHeader>
          <Calendar size={20} color="#6366f1" />
          <UpcomingTitle>다가오는 러닝 스케줄</UpcomingTitle>
        </UpcomingHeader>
        <NoScheduleMessage>
          일주일 이내에 예정된 러닝 스케줄이 없습니다.
        </NoScheduleMessage>
      </UpcomingContainer>
    );
  }

  // 시작 시간과 종료 시간의 날씨 정보 가져오기
  const startWeather = getWeatherForTime(upcomingSchedule.date, upcomingSchedule.startTime);
  const endWeather = getWeatherForTime(upcomingSchedule.date, upcomingSchedule.endTime);
  const weatherData = [startWeather, endWeather];

  return (
    <UpcomingContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <UpcomingHeader>
        <Calendar size={20} color="#6366f1" />
        <UpcomingTitle>다가오는 러닝 스케줄</UpcomingTitle>
      </UpcomingHeader>

      <ScheduleCard>
        <ScheduleHeader>
          <ScheduleInfo>
            <ScheduleTitle>{upcomingSchedule.title}</ScheduleTitle>
            <ScheduleDetails>
              <ScheduleDetailItem>
                <Calendar size={14} />
                {formatDate(upcomingSchedule.date)} {formatTime(upcomingSchedule.startTime)} ~ {formatTime(upcomingSchedule.endTime)}
              </ScheduleDetailItem>
              <ScheduleDetailItem>
                <MapPin size={14} />
                {upcomingSchedule.location}
              </ScheduleDetailItem>
            </ScheduleDetails>
          </ScheduleInfo>

          <DaysUntil>
            {getDaysUntil(upcomingSchedule.date)}
          </DaysUntil>
        </ScheduleHeader>

        <WeatherGrid>
          <WeatherCard weather={startWeather} />
          <WeatherCard weather={endWeather} />
        </WeatherGrid>
      </ScheduleCard>
    </UpcomingContainer>
  );
};

export default UpcomingSchedule;