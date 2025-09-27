import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { theme } from '../../../theme';
import { RunningSchedule as RunningScheduleType, ScheduleFormData } from '../../../types/schedule';
import { scheduleApi } from '../../../services/scheduleApi';

// 공통 컴포넌트들 import
import GlobalHeader from '../../../components/shared/GlobalHeader';
import PortfolioNavigation from '../../../components/shared/PortfolioNavigation';
import Calendar from '../../../components/ui/Calendar';
import ScheduleForm from '../../../components/ui/ScheduleForm';
import UpcomingSchedule from '../../../components/ui/UpcomingSchedule';

const PortfolioContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  padding-top: 6rem; /* GlobalHeader 높이만큼 여백 추가 */
`;

const PortfolioTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;


const ComingSoonCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  margin: 2rem 0;
`;

const ComingSoonTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ComingSoonDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  h4 {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const RunningSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<RunningScheduleType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // 로컬스토리지에서 스케줄 데이터 로드
  useEffect(() => {
    const savedSchedules = localStorage.getItem('runningSchedules');
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }
  }, []);

  // 스케줄 데이터를 로컬스토리지에 저장
  const saveSchedules = (newSchedules: RunningScheduleType[]) => {
    setSchedules(newSchedules);
    localStorage.setItem('runningSchedules', JSON.stringify(newSchedules));
  };

  // 날짜 선택 핸들러
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsFormOpen(true);
  };

  // 스케줄 등록 핸들러
  const handleScheduleSubmit = async (formData: ScheduleFormData) => {
    try {
      // 선택된 위치 정보가 있는지 확인
      if (!selectedLocation) {
        alert('장소를 선택해주세요.');
        return;
      }

      // API 호출을 위한 데이터 준비
      const scheduleData = {
        title: formData.title,
        date: selectedDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        x: parseFloat(selectedLocation.x),
        y: parseFloat(selectedLocation.y),
        placeName: selectedLocation.place_name,
        placeDetail: formData.locationDetail,
        placeUrl: '', // 카카오 API에서 제공하지 않으므로 빈 문자열
        addressName: selectedLocation.road_address_name || selectedLocation.address_name,
      };

      console.log('스케줄 등록 요청 데이터:', scheduleData);

      // API 호출
      const response = await scheduleApi.createRunningSchedule(scheduleData);
      console.log('스케줄 등록 응답:', response);

      // 성공 시 로컬 상태 업데이트
      const newSchedule: RunningScheduleType = {
        id: response.id,
        title: response.title,
        location: response.placeName,
        startTime: response.startTime,
        endTime: response.endTime,
        date: response.date,
        createdAt: response.createdAt
      };

      const newSchedules = [...schedules, newSchedule];
      saveSchedules(newSchedules);
      setIsFormOpen(false);

      alert('스케줄이 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('스케줄 등록 실패:', error);
      alert('스케줄 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 스케줄 클릭 핸들러 (상세 페이지로 이동)
  const handleScheduleClick = (schedule: RunningScheduleType) => {
    navigate(`/portfolio/running/schedule/${schedule.id}`, { state: { schedule } });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <PortfolioNavigation />
        <PortfolioContainer>
          <PortfolioTitle>러닝 스케줄 날씨 알림</PortfolioTitle>
          

          <ContentContainer>
            <UpcomingSchedule schedules={schedules} />
            <Calendar
              schedules={schedules}
              onDateSelect={handleDateSelect}
              onScheduleClick={handleScheduleClick}
              selectedDate={selectedDate}
            />
          </ContentContainer>

          <AnimatePresence>
            {isFormOpen && (
              <ScheduleForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleScheduleSubmit}
                selectedDate={selectedDate}
                onLocationSelect={setSelectedLocation}
              />
            )}
          </AnimatePresence>
        </PortfolioContainer>
      </div>
    </ThemeProvider>
  );
};

export default RunningSchedule;
