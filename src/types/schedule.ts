export interface RunningSchedule {
  id: string;
  title: string;
  location: string;
  startTime: string; // HH:mm 형식
  endTime: string;   // HH:mm 형식
  date: string;      // YYYY-MM-DD 형식
  createdAt: string;
}

export interface WeatherInfo {
  date: string;      // YYYY-MM-DD 형식
  time: string;      // HH:mm 형식
  temperature: number;
  humidity: number;
  precipitation: number; // 강수량 (mm)
  precipitationProbability: number; // 강수확률 (%)
  windSpeed: number;     // 풍속 (m/s)
  weatherCondition: string; // 날씨 상태 (맑음, 흐림, 비, 눈 등)
  skyCondition: string;     // 하늘 상태 코드
}

export interface ScheduleFormData {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
}
