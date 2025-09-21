import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { RunningSchedule } from '../../types/schedule';

interface CalendarProps {
  schedules: RunningSchedule[];
  onDateSelect: (date: string) => void;
  onScheduleClick: (schedule: RunningSchedule) => void;
  selectedDate?: string;
}

const CalendarContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const MonthTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  min-width: 200px;
  text-align: center;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const WeekHeader = styled.div`
  display: contents;
`;

const DayHeader = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CalendarDay = styled(motion.div)<{ 
  isCurrentMonth: boolean; 
  isSelected: boolean; 
  hasSchedules: boolean;
  isToday: boolean;
}>`
  background: ${props => props.theme.colors.surface};
  min-height: 120px;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  
  ${props => !props.isCurrentMonth && `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.textSecondary};
  `}
  
  ${props => props.isSelected && `
    background: ${props.theme.colors.primary}20;
    border: 2px solid ${props.theme.colors.primary};
  `}
  
  ${props => props.isToday && `
    box-shadow: inset 0 0 0 2px ${props.theme.colors.accent};
  `}

  &:hover {
    background: ${props => props.isCurrentMonth ? props.theme.colors.primary : props.theme.colors.background}10;
  }
`;

const DayNumber = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const ScheduleList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ScheduleItem = styled(motion.div)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const AddScheduleButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  cursor: pointer;
  margin-top: auto;
  align-self: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CalendarDay}:hover & {
    opacity: 1;
  }
`;

const Calendar: React.FC<CalendarProps> = ({ 
  schedules, 
  onDateSelect, 
  onScheduleClick, 
  selectedDate 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // 달력에 표시할 날짜들 계산
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // 이전 달의 마지막 날들
  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth, -i);
    prevMonthDays.push(date);
  }
  
  // 현재 달의 날들
  const currentMonthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    currentMonthDays.push(date);
  }
  
  // 다음 달의 첫 날들
  const nextMonthDays = [];
  const totalCells = 42; // 6주 * 7일
  const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    nextMonthDays.push(date);
  }
  
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const getSchedulesForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return schedules.filter(schedule => schedule.date === dateStr);
  };
  
  const isToday = (date: Date) => {
    return formatDate(date) === formatDate(today);
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };
  
  const isSelected = (date: Date) => {
    return selectedDate === formatDate(date);
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentYear, currentMonth + (direction === 'next' ? 1 : -1), 1));
  };
  
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton
            onClick={() => navigateMonth('prev')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
          </NavButton>
          
          <MonthTitle>
            {currentYear}년 {monthNames[currentMonth]}
          </MonthTitle>
          
          <NavButton
            onClick={() => navigateMonth('next')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} />
          </NavButton>
        </MonthNavigation>
      </CalendarHeader>
      
      <CalendarGrid>
        <WeekHeader>
          {weekdays.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
        </WeekHeader>
        
        {allDays.map((date, index) => {
          const daySchedules = getSchedulesForDate(date);
          const dateStr = formatDate(date);
          
          return (
            <CalendarDay
              key={index}
              isCurrentMonth={isCurrentMonth(date)}
              isSelected={isSelected(date)}
              hasSchedules={daySchedules.length > 0}
              isToday={isToday(date)}
              onClick={() => onDateSelect(dateStr)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DayNumber>{date.getDate()}</DayNumber>
              
              <ScheduleList>
                {daySchedules.slice(0, 3).map((schedule) => (
                  <ScheduleItem
                    key={schedule.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onScheduleClick(schedule);
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {schedule.title}
                  </ScheduleItem>
                ))}
                {daySchedules.length > 3 && (
                  <ScheduleItem
                    whileHover={{ scale: 1.02 }}
                    style={{ background: '#666' }}
                  >
                    +{daySchedules.length - 3}개 더
                  </ScheduleItem>
                )}
              </ScheduleList>
              
              {isCurrentMonth(date) && (
                <AddScheduleButton
                  onClick={(e) => {
                    e.stopPropagation();
                    onDateSelect(dateStr);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus size={12} />
                </AddScheduleButton>
              )}
            </CalendarDay>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
