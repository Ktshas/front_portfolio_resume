import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import { ScheduleFormData, SelectedLocation } from '../../types/schedule';
import AddressSearch from './AddressSearch';

interface ScheduleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleFormData) => void;
  selectedDate: string;
  onLocationSelect?: (location: any) => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const FormContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const CloseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.border};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TimeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimeInput = styled(Input)`
  flex: 1;
  min-width: 0;
`;

const FormInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

const TimeSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 500;
  padding-bottom: 0.75rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.variant === 'primary' ? `
    background: ${props.theme.gradients.primary};
    color: white;
  ` : `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
  `}

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const DateDisplay = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  onLocationSelect
}) => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: '',
    location: '',
    locationDetail: '',
    startTime: '',
    endTime: ''
  });
  
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [errors, setErrors] = useState<Partial<ScheduleFormData>>({});

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ScheduleFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!formData.location.trim()) {
      newErrors.location = '장소를 입력해주세요.';
    }

    if (!formData.startTime) {
      newErrors.startTime = '시작 시간을 선택해주세요.';
    }

    if (!formData.endTime) {
      newErrors.endTime = '종료 시간을 선택해주세요.';
    }

    if (formData.startTime && formData.endTime) {
      if (formData.startTime >= formData.endTime) {
        newErrors.endTime = '종료 시간은 시작 시간보다 늦어야 합니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        location: '',
        locationDetail: '',
        startTime: '',
        endTime: ''
      });
      setSelectedLocation(null);
      setErrors({});
      onClose();
    }
  };

  const handleLocationSelect = (location: SelectedLocation) => {
    setSelectedLocation(location);
    setFormData(prev => ({ ...prev, location: location.place_name }));
    
    // 부모 컴포넌트에 위치 정보 전달
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    
    // 에러가 있는 필드를 수정하면 에러 제거
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  const handleInputChange = (field: keyof ScheduleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 에러가 있는 필드를 수정하면 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <FormContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <FormHeader>
          <FormTitle>러닝 스케줄 등록</FormTitle>
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </CloseButton>
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              <Calendar size={16} />
              날짜 *
            </Label>
            <DateDisplay>
              {formatDisplayDate(selectedDate)}
            </DateDisplay>
          </FormGroup>

          <FormGroup>
            <Label>
              <Clock size={16} />
              제목 *
            </Label>
            <FormInput
              type="text"
              placeholder="러닝 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>
              <MapPin size={16} />
              장소 *
            </Label>
            <AddressSearch
              onLocationSelect={handleLocationSelect}
              placeholder="러닝 장소를 검색하세요"
            />
            {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}
            {selectedLocation && (
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.5rem', 
                background: '#f8f9fa', 
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                color: '#6c757d'
              }}>
                <strong>선택된 위치:</strong> {selectedLocation.place_name}<br/>
                <strong>주소:</strong> {selectedLocation.road_address_name || selectedLocation.address_name}
              </div>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              <MapPin size={16} />
              장소상세
            </Label>
            <FormInput
              type="text"
              placeholder="장소에 대한 추가 정보를 입력하세요 (예: 정문 앞, 2층 체육관 등)"
              value={formData.locationDetail}
              onChange={(e) => handleInputChange('locationDetail', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <Clock size={16} />
              시간 *
            </Label>
            <TimeInputGroup>
              <TimeInput
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
              
              <TimeSeparator>~</TimeSeparator>
              
              <TimeInput
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
              />
            </TimeInputGroup>
            {errors.startTime && <ErrorMessage>{errors.startTime}</ErrorMessage>}
            {errors.endTime && <ErrorMessage>{errors.endTime}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              등록
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </Overlay>
  );
};

export default ScheduleForm;
