import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Trash2,
  Edit
} from 'lucide-react';
import { theme } from '../../../theme';
import { RunningSchedule, WeatherInfo } from '../../../types/schedule';
import { 
  generateMockWeatherData, 
  getRunningCondition 
} from '../../../data/mockWeatherData';

// 공통 컴포넌트들 import
import GlobalHeader from '../../../components/shared/GlobalHeader';
import PortfolioNavigation from '../../../components/shared/PortfolioNavigation';
import WeatherCard from './components/WeatherCard';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  padding-top: 6rem;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;


const ScheduleCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const ScheduleTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)<{ variant?: 'edit' | 'delete' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.variant === 'delete' ? `
    background: ${props.theme.colors.error}20;
    color: ${props.theme.colors.error};
    &:hover {
      background: ${props.theme.colors.error};
      color: white;
    }
  ` : `
    background: ${props.theme.colors.primary}20;
    color: ${props.theme.colors.primary};
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
    }
  `}
`;

const ScheduleDetails = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DetailIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  border-radius: 0.5rem;
`;

const DetailContent = styled.div`
  flex: 1;
  
  h4 {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const RunningConditionBadge = styled.div<{ color: string }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 1rem;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-align: center;
  border: 1px solid ${props => props.color}30;
`;

const WeatherContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const WeatherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const WeatherTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.error};
`;

const ScheduleDetail: React.FC = () => {
  const { scheduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [schedule, setSchedule] = useState<RunningSchedule | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherInfo[]>([]);

  useEffect(() => {
    // URL state에서 스케줄 정보 가져오기
    if (location.state?.schedule) {
      const scheduleData = location.state.schedule as RunningSchedule;
      setSchedule(scheduleData);
      
      // 날씨 데이터 생성
      const weather = generateMockWeatherData(
        scheduleData.date,
        scheduleData.startTime,
        scheduleData.endTime
      );
      setWeatherData(weather);
    } else {
      // 로컬스토리지에서 스케줄 찾기
      const savedSchedules = localStorage.getItem('runningSchedules');
      if (savedSchedules) {
        const schedules: RunningSchedule[] = JSON.parse(savedSchedules);
        const foundSchedule = schedules.find(s => s.id === scheduleId);
        
        if (foundSchedule) {
          setSchedule(foundSchedule);
          const weather = generateMockWeatherData(
            foundSchedule.date,
            foundSchedule.startTime,
            foundSchedule.endTime
          );
          setWeatherData(weather);
        }
      }
    }
  }, [scheduleId, location.state]);

  const handleDelete = () => {
    if (schedule && window.confirm('정말로 이 스케줄을 삭제하시겠습니까?')) {
      const savedSchedules = localStorage.getItem('runningSchedules');
      if (savedSchedules) {
        const schedules: RunningSchedule[] = JSON.parse(savedSchedules);
        const updatedSchedules = schedules.filter(s => s.id !== schedule.id);
        localStorage.setItem('runningSchedules', JSON.stringify(updatedSchedules));
      }
      navigate('/portfolio/running');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (time: string) => {
    return time.replace(':', '시 ') + '분';
  };

  if (!schedule) {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalHeader />
          <PortfolioContainer>
            <ContentContainer>
              <ErrorMessage>
                스케줄을 찾을 수 없습니다.
              </ErrorMessage>
            </ContentContainer>
          </PortfolioContainer>
        </div>
      </ThemeProvider>
    );
  }

  const runningCondition = getRunningCondition(weatherData[0] || {} as WeatherInfo);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioNavigation />
        <PortfolioContainer>
          <ContentContainer>

            <ScheduleCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScheduleHeader>
                <div>
                  <ScheduleTitle>{schedule.title}</ScheduleTitle>
                </div>
                <ActionButtons>
                  <ActionButton
                    variant="edit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit size={16} />
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={handleDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                  </ActionButton>
                </ActionButtons>
              </ScheduleHeader>

              <ScheduleDetails>
                <DetailItem>
                  <DetailIcon>
                    <Calendar size={20} />
                  </DetailIcon>
                  <DetailContent>
                    <h4>날짜</h4>
                    <p>{formatDate(schedule.date)}</p>
                  </DetailContent>
                </DetailItem>

                <DetailItem>
                  <DetailIcon>
                    <Clock size={20} />
                  </DetailIcon>
                  <DetailContent>
                    <h4>시간</h4>
                    <p>{formatTime(schedule.startTime)} ~ {formatTime(schedule.endTime)}</p>
                  </DetailContent>
                </DetailItem>

                <DetailItem>
                  <DetailIcon>
                    <MapPin size={20} />
                  </DetailIcon>
                  <DetailContent>
                    <h4>장소</h4>
                    <p>{schedule.location}</p>
                  </DetailContent>
                </DetailItem>
              </ScheduleDetails>
            </ScheduleCard>

            <RunningConditionBadge color={runningCondition.color}>
              {runningCondition.message}
            </RunningConditionBadge>

            <WeatherContainer>
              <WeatherHeader>
                <WeatherTitle>🌤️ 날씨 정보</WeatherTitle>
              </WeatherHeader>

              <WeatherGrid>
                {weatherData.map((weather, index) => (
                  <WeatherCard key={index} weather={weather} />
                ))}
              </WeatherGrid>
            </WeatherContainer>
          </ContentContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default ScheduleDetail;
