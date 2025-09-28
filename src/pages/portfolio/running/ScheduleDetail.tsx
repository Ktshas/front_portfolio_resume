import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Edit
} from 'lucide-react';
import { theme } from '../../../theme';
import { RunningSchedule, WeatherInfo } from '../../../types/schedule';
import { 
  getRunningCondition 
} from '../../../data/mockWeatherData';
import { scheduleApi } from '../../../services/scheduleApi';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScheduleDetail = async () => {
      if (!scheduleId) {
        setError('스케줄 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        console.log('스케줄 상세 정보 로드 시작:', scheduleId);
        
        // API로 스케줄 상세 정보 조회
        const detailedSchedule = await scheduleApi.getRunningScheduleById(scheduleId);
        
        // API 응답을 프론트엔드 타입으로 변환
        const convertedSchedule = scheduleApi.mapApiResponseToSchedule(detailedSchedule);
        setSchedule(convertedSchedule);
        
        console.log('스케줄 상세 정보 로드 완료:', convertedSchedule);
        console.log('weatherInfo 존재 여부:', !!convertedSchedule.weatherInfo);

        // 날씨 정보 처리 - API에서 weatherInfo가 있는 경우만 표시
        if (convertedSchedule.weatherInfo) {
          // API에서 weatherInfo가 있는 경우 해당 정보 사용
          console.log('API weatherInfo 사용:', convertedSchedule.weatherInfo);
          setWeatherData([convertedSchedule.weatherInfo]);
        } else {
          // weatherInfo가 null인 경우 날씨 카드 표시하지 않음
          console.log('weatherInfo가 null, 날씨 카드 표시하지 않음');
          setWeatherData([]);
        }
      } catch (error) {
        console.error('스케줄 상세 조회 실패:', error);
        
        // API 실패 시 URL state나 로컬스토리지에서 fallback
        if (location.state?.schedule) {
          const scheduleData = location.state.schedule as RunningSchedule;
          setSchedule(scheduleData);
          // API 실패 시에도 weatherInfo가 있으면 사용, 없으면 표시하지 않음
          if (scheduleData.weatherInfo) {
            setWeatherData([scheduleData.weatherInfo]);
          } else {
            setWeatherData([]);
          }
        } else {
          // 로컬스토리지에서 스케줄 찾기
          const savedSchedules = localStorage.getItem('runningSchedules');
          if (savedSchedules) {
            const schedules: RunningSchedule[] = JSON.parse(savedSchedules);
            const foundSchedule = schedules.find(s => s.id === scheduleId);
            
            if (foundSchedule) {
              setSchedule(foundSchedule);
              // 로컬스토리지에서도 weatherInfo가 있으면 사용, 없으면 표시하지 않음
              if (foundSchedule.weatherInfo) {
                setWeatherData([foundSchedule.weatherInfo]);
              } else {
                setWeatherData([]);
              }
            } else {
              setError('스케줄을 찾을 수 없습니다.');
            }
          } else {
            setError('스케줄을 찾을 수 없습니다.');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadScheduleDetail();
  }, [scheduleId, location.state]);


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
    // HHMM 형식을 HH:mm 형식으로 변환
    if (time.length === 4 && !time.includes(':')) {
      return time.substring(0, 2) + ':' + time.substring(2, 4);
    }
    return time; // 이미 HH:mm 형식인 경우 그대로 사용
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalHeader />
          <PortfolioNavigation />
          <PortfolioContainer>
            <ContentContainer>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem', color: '#6366f1' }}>스케줄 정보를 불러오는 중...</div>
              </div>
            </ContentContainer>
          </PortfolioContainer>
        </div>
      </ThemeProvider>
    );
  }

  if (error || !schedule) {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <GlobalHeader />
          <PortfolioNavigation />
          <PortfolioContainer>
            <ContentContainer>
              <ErrorMessage>
                {error || '스케줄을 찾을 수 없습니다.'}
              </ErrorMessage>
            </ContentContainer>
          </PortfolioContainer>
        </div>
      </ThemeProvider>
    );
  }

  const runningCondition = getRunningCondition(weatherData.length > 0 ? weatherData[0] : null);

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
                    <p>
                      {schedule.location}
                      {schedule.placeDetail && ` - ${schedule.placeDetail}`}
                    </p>
                    {schedule.addressName && (
                      <p style={{ marginTop: '0.25rem' }}>
                        {schedule.placeUrl ? (
                          <a 
                            href={schedule.placeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              color: '#6366f1', 
                              textDecoration: 'none',
                              borderBottom: '1px solid #6366f1'
                            }}
                          >
                            {schedule.addressName}
                          </a>
                        ) : (
                          schedule.addressName
                        )}
                      </p>
                    )}
                  </DetailContent>
                </DetailItem>
              </ScheduleDetails>
            </ScheduleCard>

            <RunningConditionBadge color={runningCondition.color}>
              {runningCondition.message}
            </RunningConditionBadge>

            {weatherData.length > 0 && (
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
            )}
          </ContentContainer>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default ScheduleDetail;
