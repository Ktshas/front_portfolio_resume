import { CryptoApiResponse } from '../types/crypto';
import { getApiBaseUrl } from '../config/api';

export const cryptoApi = {
  // 관심 가상화폐 목록 조회
  getCryptos: async (): Promise<CryptoApiResponse> => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/crypto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CryptoApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('가상화폐 데이터 조회 중 오류 발생:', error);
      throw error;
    }
  },
};
