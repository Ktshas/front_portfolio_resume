import { RunningSchedule, ScheduleFormData } from '../types/schedule';
import { getApiBaseUrl, getApiTimeout } from '../config/api';

// API 요청/응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface RunningScheduleRequest {
  title: string;           // 제목 (필수, 1-100자)
  date: string;            // 날짜 (필수, YYYYMMDD 형식)
  startTime: string;       // 시작시간 (필수, HHMM 형식)
  endTime: string;         // 종료시간 (필수, HHMM 형식)
  x: number;              // X 좌표 (필수)
  y: number;              // Y 좌표 (필수)
  placeName: string;      // 장소명 (필수, 1-100자)
  placeDetail?: string;   // 상세장소 (선택, 0-50자)
  placeUrl?: string;      // 장소 URL (선택)
  addressName?: string;   // 주소 (선택)
}

interface RunningScheduleResponse {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  x: number;
  y: number;
  placeName: string;
  placeDetail?: string;
  placeUrl?: string;
  addressName?: string;
  createdAt: string;
}

// HTTP 클라이언트 클래스
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = getApiBaseUrl();
    this.timeout = getApiTimeout();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      console.log(`API 호출: ${config.method || 'GET'} ${url}`);
      console.log('요청 헤더:', config.headers);
      if (config.body) {
        console.log('요청 본문:', config.body);
      }
      
      const response = await fetch(url, config);
      
      console.log('응답 상태:', response.status, response.statusText);
      console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답 본문:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('API 응답:', data);
      
      return data;
    } catch (error) {
      console.error('API 호출 오류:', error);
      throw error;
    }
  }

  // GET 요청
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST 요청
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT 요청
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE 요청
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// API 클라이언트 인스턴스
const apiClient = new ApiClient();

// 날짜 형식 변환: YYYY-MM-DD -> YYYYMMDD
const formatDateForApi = (date: string): string => {
  return date.replace(/-/g, '');
};

// 시간 형식 변환: HH:mm -> HHMM
const formatTimeForApi = (time: string): string => {
  return time.replace(':', '');
};

// 스케줄 관련 API 함수들
export const scheduleApi = {

  // 러닝 스케줄 생성
  async createRunningSchedule(scheduleData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    x: number;
    y: number;
    placeName: string;
    placeDetail?: string;
    placeUrl?: string;
    addressName?: string;
  }): Promise<RunningScheduleResponse> {
    try {
      const requestData: RunningScheduleRequest = {
        title: scheduleData.title,
        date: formatDateForApi(scheduleData.date),
        startTime: formatTimeForApi(scheduleData.startTime),
        endTime: formatTimeForApi(scheduleData.endTime),
        x: scheduleData.x,
        y: scheduleData.y,
        placeName: scheduleData.placeName,
        placeDetail: scheduleData.placeDetail,
        placeUrl: scheduleData.placeUrl,
        addressName: scheduleData.addressName,
      };

      const response = await apiClient.post<RunningScheduleResponse>('/api/schedules/running', requestData);
      return response.data;
    } catch (error) {
      console.error('러닝 스케줄 생성 오류:', error);
      throw error;
    }
  },

  // 모든 스케줄 조회 (로컬스토리지에서)
  async getAllSchedules(): Promise<RunningSchedule[]> {
    return this.getSchedulesFromLocalStorage();
  },

  // API 응답을 RunningSchedule 타입으로 변환
  mapApiResponseToSchedule(apiResponse: RunningScheduleResponse): RunningSchedule {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      location: apiResponse.placeName,
      startTime: apiResponse.startTime,
      endTime: apiResponse.endTime,
      date: apiResponse.date,
      createdAt: apiResponse.createdAt,
    };
  },

  // 로컬스토리지 관련 함수들 (API 실패 시 fallback)
  getSchedulesFromLocalStorage(): RunningSchedule[] {
    const savedSchedules = localStorage.getItem('runningSchedules');
    return savedSchedules ? JSON.parse(savedSchedules) : [];
  },

  saveScheduleToLocalStorage(schedule: RunningSchedule): void {
    const schedules = this.getSchedulesFromLocalStorage();
    schedules.push(schedule);
    localStorage.setItem('runningSchedules', JSON.stringify(schedules));
  },

  createScheduleInLocalStorage(scheduleData: ScheduleFormData & { date: string; coordinates?: { x: string; y: string } }): RunningSchedule {
    const newSchedule: RunningSchedule = {
      id: Date.now().toString(),
      title: scheduleData.title,
      location: scheduleData.location,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      date: scheduleData.date,
      createdAt: new Date().toISOString(),
    };

    this.saveScheduleToLocalStorage(newSchedule);
    return newSchedule;
  },

  updateScheduleInLocalStorage(updatedSchedule: RunningSchedule): void {
    const schedules = this.getSchedulesFromLocalStorage();
    const index = schedules.findIndex(s => s.id === updatedSchedule.id);
    if (index !== -1) {
      schedules[index] = updatedSchedule;
      localStorage.setItem('runningSchedules', JSON.stringify(schedules));
    }
  },

  deleteScheduleFromLocalStorage(id: string): void {
    const schedules = this.getSchedulesFromLocalStorage();
    const filteredSchedules = schedules.filter(s => s.id !== id);
    localStorage.setItem('runningSchedules', JSON.stringify(filteredSchedules));
  },
};
