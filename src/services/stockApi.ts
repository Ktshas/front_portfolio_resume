import { StockApiResponse } from '../types/stock';
import { getApiBaseUrl } from '../config/api';

export const stockApi = {
  // 보유 주식 목록 조회
  getStocks: async (): Promise<StockApiResponse> => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/stocks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StockApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('주식 데이터 조회 중 오류 발생:', error);
      throw error;
    }
  },
};
