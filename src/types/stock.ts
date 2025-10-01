export interface StockData {
  itemCode: string;
  stockName: string;
  closePrice: string;
  compareToPreviousClosePrice: string;
  fluctuationsRatio: string;
  compareDirection: 'RISING' | 'FALLING' | 'EVEN';
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  accumulatedTradingVolume: string;
  accumulatedTradingValue: string;
  marketStatus: 'OPEN' | 'CLOSED';
  localTradedAt: string;
  currencyType: string;
  targetPrice: string;
  compareDirectionKorean: string;
  marketStatusKorean: string;
}

export interface StockApiResponse {
  success: boolean;
  data: StockData[];
  message: string;
}
