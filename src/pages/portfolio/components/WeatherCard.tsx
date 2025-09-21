import React from 'react';
import styled from 'styled-components';
import { Droplets, Wind } from 'lucide-react';
import { WeatherInfo } from '../../../types/schedule';
import { getWeatherEmoji } from '../../../data/mockWeatherData';

interface WeatherCardProps {
  weather: WeatherInfo;
}

const WeatherItem = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
`;

const WeatherTime = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const WeatherCondition = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const WeatherTemp = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const WeatherDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RainInfo = styled.div`
  background: ${props => props.theme.colors.primary}15;
  border: 1px solid ${props => props.theme.colors.primary}30;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-top: 0.5rem;
`;

const RainTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RainDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const RainAmount = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const RainProbability = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const formatTime = (time: string) => {
    return time.replace(':', '시 ') + '분';
  };

  const hasRain = (weather: WeatherInfo) => {
    return weather.precipitation > 0 || weather.precipitationProbability > 30;
  };

  return (
    <WeatherItem>
      <WeatherTime>{formatTime(weather.time)}</WeatherTime>
      <WeatherCondition>
        {getWeatherEmoji(weather.weatherCondition)}
      </WeatherCondition>
      <WeatherTemp>{weather.temperature}°C</WeatherTemp>
      
      <WeatherDetails>
        <WeatherDetailItem>
          <Droplets size={12} />
          습도 {weather.humidity}%
        </WeatherDetailItem>
        <WeatherDetailItem>
          <Wind size={12} />
          바람 {weather.windSpeed.toFixed(1)}m/s
        </WeatherDetailItem>
      </WeatherDetails>

      {hasRain(weather) && (
        <RainInfo>
          <RainTitle>
            🌧️ 강수 정보
          </RainTitle>
          <RainDetails>
            <div>
              강수량: <RainAmount>{weather.precipitation}mm</RainAmount>
            </div>
            <div>
              확률: <RainProbability>{weather.precipitationProbability}%</RainProbability>
            </div>
          </RainDetails>
        </RainInfo>
      )}
    </WeatherItem>
  );
};

export default WeatherCard;
