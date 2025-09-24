import { KakaoAddressSearchResult } from '../types/schedule';

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_API_BASE_URL = 'https://dapi.kakao.com/v2/local';

export interface SearchAddressParams {
  query: string;
  page?: number;
  size?: number;
  sort?: 'accuracy' | 'distance';
}

/**
 * 카카오 키워드 검색 API를 호출하여 장소를 검색합니다.
 */
export const searchAddress = async (params: SearchAddressParams): Promise<KakaoAddressSearchResult> => {
  if (!KAKAO_REST_API_KEY) {
    throw new Error('카카오 API 키가 설정되지 않았습니다. REACT_APP_KAKAO_REST_API_KEY 환경변수를 확인해주세요.');
  }

  const { query, page = 1, size = 15, sort = 'accuracy' } = params;
  
  const url = new URL(`${KAKAO_API_BASE_URL}/search/keyword.json`);
  url.searchParams.append('query', query);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());
  url.searchParams.append('sort', sort);

  try {
    console.log('카카오 API 호출:', url.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API 에러 응답:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data: KakaoAddressSearchResult = await response.json();
    console.log('API 응답 데이터:', data);
    return data;
  } catch (error) {
    console.error('카카오 API 호출 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 주소 검색을 위한 디바운스된 함수
 */
export const createDebouncedSearch = (delay: number = 300) => {
  let timeoutId: NodeJS.Timeout;
  
  return (callback: (query: string) => void, query: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(query);
    }, delay);
  };
};
