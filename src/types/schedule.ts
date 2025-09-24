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
  locationDetail?: string;
  startTime: string;
  endTime: string;
}

// 카카오 API 관련 타입들
export interface KakaoAddressSearchResult {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string;
}

export interface SelectedLocation {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
}