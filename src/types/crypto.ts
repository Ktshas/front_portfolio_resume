export interface CryptoData {
  cryptoCode: string;
  cryptoName: string;
  tradePrice: string;
  changePrice: string;
  changeRate: string;
  change: 'RISE' | 'FALL' | 'EVEN';
  openingPrice: string;
  highPrice: string;
  lowPrice: string;
  tradeVolume: string;
  accTradePrice: string;
  accTradePrice24h: string;
  accTradeVolume24h: string;
  highest52WeekPrice: string;
  lowest52WeekPrice: string;
  tradeTimeKst: string;
  targetPrice: string | null;
  targetPriceDirection: 'UP' | 'DOWN' | null;
  changeKorean: string;
  targetPriceDirectionKorean: string;
}

export interface CryptoApiResponse {
  success: boolean;
  data: CryptoData[];
  message: string;
}
