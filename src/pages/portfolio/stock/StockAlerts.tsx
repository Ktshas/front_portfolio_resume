import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { theme } from '../../../theme';
import { StockData } from '../../../types/stock';
import { CryptoData } from '../../../types/crypto';
import { stockApi } from '../../../services/stockApi';
import { cryptoApi } from '../../../services/cryptoApi';
import StockTable from '../../../components/ui/StockTable';
import CryptoTable from '../../../components/ui/CryptoTable';
import GlobalHeader from '../../../components/shared/GlobalHeader';

const StockAlertsContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  padding-top: 6rem; /* GlobalHeader 높이만큼 여백 추가 */
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  margin: 2rem 0;
`;

const ErrorIcon = styled.div`
  color: #ef4444;
  margin-bottom: 1rem;
`;

const RefreshButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  }
`;

const StockAlerts: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [cryptoLoading, setCryptoLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cryptoError, setCryptoError] = useState<string | null>(null);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await stockApi.getStocks();
      
      if (response.success) {
        setStocks(response.data);
      } else {
        setError(response.message || '주식 데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('주식 데이터를 불러오는데 실패했습니다. 네트워크 연결을 확인해주세요.');
      console.error('주식 데이터 조회 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCryptos = async () => {
    try {
      setCryptoLoading(true);
      setCryptoError(null);
      const response = await cryptoApi.getCryptos();
      
      if (response.success) {
        setCryptos(response.data);
      } else {
        setCryptoError(response.message || '가상화폐 데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setCryptoError('가상화폐 데이터를 불러오는데 실패했습니다. 네트워크 연결을 확인해주세요.');
      console.error('가상화폐 데이터 조회 오류:', err);
    } finally {
      setCryptoLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchCryptos();
  }, []);

  const handleRefresh = () => {
    fetchStocks();
    fetchCryptos();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalHeader />
        <StockAlertsContainer>
          <PageTitle>내 투자자산 알림</PageTitle>
          
          <ContentContainer>
            {loading ? (
              <LoadingContainer>
                <LoadingSpinner
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p>주식 데이터를 불러오는 중...</p>
              </LoadingContainer>
            ) : error ? (
              <ErrorContainer>
                <ErrorIcon>
                  <AlertCircle size={48} />
                </ErrorIcon>
                <h3>데이터 로드 실패</h3>
                <p>{error}</p>
                <RefreshButton
                  onClick={handleRefresh}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={16} />
                  다시 시도
                </RefreshButton>
              </ErrorContainer>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StockTable stocks={stocks} />
                
                {/* 가상화폐 테이블 */}
                {cryptoLoading ? (
                  <LoadingContainer>
                    <LoadingSpinner
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p>가상화폐 데이터를 불러오는 중...</p>
                  </LoadingContainer>
                ) : cryptoError ? (
                  <ErrorContainer>
                    <ErrorIcon>
                      <AlertCircle size={48} />
                    </ErrorIcon>
                    <h3>가상화폐 데이터 로드 실패</h3>
                    <p>{cryptoError}</p>
                    <RefreshButton
                      onClick={fetchCryptos}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw size={16} />
                      다시 시도
                    </RefreshButton>
                  </ErrorContainer>
                ) : (
                  <CryptoTable cryptos={cryptos} />
                )}
                
                <motion.div
                  style={{ textAlign: 'center', marginTop: '2rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <RefreshButton
                    onClick={handleRefresh}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={16} />
                    데이터 새로고침
                  </RefreshButton>
                </motion.div>
              </motion.div>
            )}
          </ContentContainer>
        </StockAlertsContainer>
      </div>
    </ThemeProvider>
  );
};

export default StockAlerts;
