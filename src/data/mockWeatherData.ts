import { WeatherInfo } from '../types/schedule';

// 기상청 단기예보 API 기준의 벌크 데이터
export const generateMockWeatherData = (date: string, startTime: string, endTime: string): WeatherInfo[] => {
  const weatherConditions = [
    { condition: '맑음', sky: '1', temp: 22, humidity: 55, precipitation: 0, precipProb: 0, wind: 2.1 },
    { condition: '비', sky: '4', temp: 16, humidity: 85, precipitation: 3.2, precipProb: 85, wind: 3.5 },
    { condition: '흐림', sky: '4', temp: 18, humidity: 75, precipitation: 0, precipProb: 35, wind: 3.0 },
    { condition: '구름많음', sky: '3', temp: 20, humidity: 65, precipitation: 0, precipProb: 15, wind: 2.5 },
    { condition: '소나기', sky: '4', temp: 19, humidity: 80, precipitation: 5.0, precipProb: 70, wind: 4.0 },
  ];

  // 날짜와 시간을 기반으로 일관된 날씨 데이터 생성
  const dateNum = new Date(date).getDate();
  const baseWeatherIndex = dateNum % weatherConditions.length;
  const baseWeather = weatherConditions[baseWeatherIndex];

  const weatherData: WeatherInfo[] = [];
  
  // 시작 시간부터 종료 시간까지 1시간 간격으로 데이터 생성
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);
  
  for (let hour = startHour; hour <= endHour; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    
    // 시간대별로 약간의 변화 적용
    const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 3; // 하루 온도 변화 패턴
    const humidityVariation = Math.cos((hour - 12) * Math.PI / 12) * 10;
    
    weatherData.push({
      date,
      time: timeStr,
      temperature: Math.round(baseWeather.temp + tempVariation),
      humidity: Math.max(30, Math.min(95, Math.round(baseWeather.humidity + humidityVariation))),
      precipitation: baseWeather.precipitation,
      precipitationProbability: baseWeather.precipProb,
      windSpeed: baseWeather.wind + (Math.random() - 0.5) * 0.5,
      weatherCondition: baseWeather.condition,
      skyCondition: baseWeather.sky
    });
  }
  
  return weatherData;
};

// 특정 날짜와 시간의 날씨 정보 가져오기
export const getWeatherForTime = (date: string, time: string): WeatherInfo => {
  const weatherConditions = [
    { condition: '맑음', sky: '1', temp: 22, humidity: 55, precipitation: 0, precipProb: 0, wind: 2.1 },
    { condition: '비', sky: '4', temp: 16, humidity: 85, precipitation: 3.2, precipProb: 85, wind: 3.5 },
    { condition: '흐림', sky: '4', temp: 18, humidity: 75, precipitation: 0, precipProb: 35, wind: 3.0 },
    { condition: '구름많음', sky: '3', temp: 20, humidity: 65, precipitation: 0, precipProb: 15, wind: 2.5 },
    { condition: '소나기', sky: '4', temp: 19, humidity: 80, precipitation: 5.0, precipProb: 70, wind: 4.0 },
  ];

  const dateNum = new Date(date).getDate();
  const baseWeatherIndex = dateNum % weatherConditions.length;
  const baseWeather = weatherConditions[baseWeatherIndex];

  // 시간에 따른 온도 변화
  const hour = parseInt(time.split(':')[0]);
  const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 3;
  const humidityVariation = Math.cos((hour - 12) * Math.PI / 12) * 10;

  return {
    date,
    time,
    temperature: Math.round(baseWeather.temp + tempVariation),
    humidity: Math.max(30, Math.min(95, Math.round(baseWeather.humidity + humidityVariation))),
    precipitation: baseWeather.precipitation,
    precipitationProbability: baseWeather.precipProb,
    windSpeed: baseWeather.wind + (Math.random() - 0.5) * 0.5,
    weatherCondition: baseWeather.condition,
    skyCondition: baseWeather.sky
  };
};

// 특정 날짜의 대표 날씨 정보 (스케줄 목록 표시용)
export const getRepresentativeWeather = (date: string): WeatherInfo => {
  const dateNum = new Date(date).getDate();
  const weatherConditions = [
    { condition: '맑음', sky: '1', temp: 22, humidity: 55, precipitation: 0, precipProb: 0, wind: 2.1 },
    { condition: '비', sky: '4', temp: 16, humidity: 85, precipitation: 3.2, precipProb: 85, wind: 3.5 },
    { condition: '흐림', sky: '4', temp: 18, humidity: 75, precipitation: 0, precipProb: 35, wind: 3.0 },
    { condition: '구름많음', sky: '3', temp: 20, humidity: 65, precipitation: 0, precipProb: 15, wind: 2.5 },
    { condition: '소나기', sky: '4', temp: 19, humidity: 80, precipitation: 5.0, precipProb: 70, wind: 4.0 },
  ];

  const weatherIndex = dateNum % weatherConditions.length;
  const weather = weatherConditions[weatherIndex];

  return {
    date,
    time: '12:00', // 대표 시간
    temperature: weather.temp,
    humidity: weather.humidity,
    precipitation: weather.precipitation,
    precipitationProbability: weather.precipProb,
    windSpeed: weather.wind,
    weatherCondition: weather.condition,
    skyCondition: weather.sky
  };
};

// 날씨 상태에 따른 이모지 반환
export const getWeatherEmoji = (condition: string): string => {
  switch (condition) {
    case '맑음': return '☀️';
    case '구름많음': return '⛅';
    case '흐림': return '☁️';
    case '비': return '🌧️';
    case '소나기': return '⛈️';
    case '눈': return '❄️';
    default: return '🌤️';
  }
};

// 날씨 조건에 따른 러닝 적합도 평가
export const getRunningCondition = (weather: WeatherInfo | null): {
  rating: 'excellent' | 'good' | 'fair' | 'poor';
  message: string;
  color: string;
} => {
  // 날씨 정보가 없는 경우
  if (!weather) {
    return {
      rating: 'fair',
      message: '날씨 정보를 불러올 수 없습니다.',
      color: '#6b7280'
    };
  }

  const { temperature, precipitation, windSpeed, weatherCondition } = weather;
  
  // 강수량이 있으면 나쁨
  if (precipitation > 0) {
    return {
      rating: 'poor',
      message: '비가 예상되어 실외 러닝이 어려울 수 있습니다.',
      color: '#ef4444'
    };
  }
  
  // 온도가 너무 높거나 낮으면
  if (temperature < 5 || temperature > 30) {
    return {
      rating: 'fair',
      message: '날씨가 다소 극단적이니 주의하세요.',
      color: '#f59e0b'
    };
  }
  
  // 바람이 너무 강하면
  if (windSpeed > 5) {
    return {
      rating: 'fair',
      message: '바람이 강하니 주의하세요.',
      color: '#f59e0b'
    };
  }
  
  // 맑은 날씨
  if (weatherCondition === '맑음') {
    return {
      rating: 'excellent',
      message: '러닝하기 완벽한 날씨입니다!',
      color: '#10b981'
    };
  }
  
  // 그 외 좋은 조건
  return {
    rating: 'good',
    message: '러닝하기 좋은 날씨입니다.',
    color: '#6366f1'
  };
};