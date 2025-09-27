// API 설정
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://your-production-api.com',
    timeout: 10000,
  },
  local: {
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  }
};

// 현재 환경 감지
const getCurrentEnvironment = (): 'development' | 'production' | 'local' => {
  // REACT_APP_ENV 환경변수 확인
  if (process.env.REACT_APP_ENV === 'local') {
    return 'local';
  }
  
  // 기본값
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

// 현재 환경에 따른 API 설정 반환
export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env];
};

// API 기본 URL 반환
export const getApiBaseUrl = (): string => {
  return getApiConfig().baseURL;
};

// API 타임아웃 반환
export const getApiTimeout = (): number => {
  return getApiConfig().timeout;
};

// 현재 환경 정보 반환
export const getCurrentEnv = (): string => {
  return getCurrentEnvironment();
};
