import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, HelpCircle } from 'lucide-react';
import { CryptoData } from '../../types/crypto';

const CryptoTableContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  background: ${props => props.theme.gradients.primary};
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TableTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;

  & > div {
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    font-size: 0.8rem;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
`;

const HelpIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.theme.colors.textSecondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 12px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${props => props.theme.colors.border};
  }

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: 12px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${props => props.theme.colors.surface};
  }
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    padding: 0.75rem 0.5rem;
  }
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CryptoName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CurrentPrice = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 0.25rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const PriceChange = styled.div<{ direction: 'RISE' | 'FALL' | 'EVEN' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: 500;

  color: ${props => {
    switch (props.direction) {
      case 'RISE': return '#ef4444'; // 빨간색
      case 'FALL': return '#3b82f6'; // 파란색
      default: return props.theme.colors.text; // 검정색
    }
  }};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

const DirectionIcon = styled.div<{ direction: 'RISE' | 'FALL' | 'EVEN' }>`
  color: ${props => {
    switch (props.direction) {
      case 'RISE': return '#ef4444'; // 빨간색
      case 'FALL': return '#3b82f6'; // 파란색
      default: return props.theme.colors.text; // 검정색
    }
  }};
`;

const TargetPrice = styled.div<{ status: 'ACHIEVED_BUY' | 'ACHIEVED_SELL' | 'NOT_ACHIEVED' | 'NO_TARGET' }>`
  font-weight: 600;
  color: ${props => {
    switch (props.status) {
      case 'ACHIEVED_BUY': return '#ef4444'; // 빨간색 (매수 목표 도달)
      case 'ACHIEVED_SELL': return '#3b82f6'; // 파란색 (매도 목표 도달)
      case 'NO_TARGET': return props.theme.colors.textSecondary; // 회색 (목표가 없음)
      default: return props.theme.colors.text; // 검정색 (기본)
    }
  }};
  font-size: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

interface CryptoTableProps {
  cryptos: CryptoData[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptos }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const getDirectionIcon = (direction: 'RISE' | 'FALL' | 'EVEN') => {
    switch (direction) {
      case 'RISE':
        return <TrendingUp size={14} />;
      case 'FALL':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  // 목표가 도달 여부 판단 함수
  const getTargetPriceStatus = (crypto: CryptoData): 'ACHIEVED_BUY' | 'ACHIEVED_SELL' | 'NOT_ACHIEVED' | 'NO_TARGET' => {
    if (!crypto.targetPrice || !crypto.targetPriceDirection) return 'NO_TARGET';
    
    const currentPrice = parseFloat(crypto.tradePrice.replace(/,/g, ''));
    const targetPrice = parseFloat(crypto.targetPrice.replace(/,/g, ''));
    
    if (crypto.targetPriceDirection === 'UP') {
      // 매도 목표: 현재가 >= 목표가
      return currentPrice >= targetPrice ? 'ACHIEVED_SELL' : 'NOT_ACHIEVED';
    } else {
      // 매수 목표: 현재가 <= 목표가
      return currentPrice <= targetPrice ? 'ACHIEVED_BUY' : 'NOT_ACHIEVED';
    }
  };

  // 가격 포맷팅 함수
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return Math.floor(numPrice).toLocaleString();
  };

  // 등락률 포맷팅 함수 (소수점 2자리까지 표시)
  const formatChangeRate = (changeRate: string) => {
    const numRate = parseFloat(changeRate);
    return numRate.toFixed(2);
  };

  return (
    <CryptoTableContainer>
      <TableHeader>
        <TableTitle>관심 가상화폐 정보</TableTitle>
      </TableHeader>
      
      <Table>
        <TableHeaderRow>
          <div>코인</div>
          <div>현재가</div>
          <div>등락률</div>
          <HeaderCell>
            MY 목표가
            <HelpIcon
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <HelpCircle size={10} />
            </HelpIcon>
            {showTooltip && (
              <Tooltip
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                실시간으로 가격을 확인하여 목표가에 도달하면 카카오톡 메세지를 보냅니다.
              </Tooltip>
            )}
          </HeaderCell>
        </TableHeaderRow>
        
        {cryptos.map((crypto, index) => {
          const targetStatus = getTargetPriceStatus(crypto);
          
          return (
            <TableRow
              key={crypto.cryptoCode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <CryptoInfo>
                <CryptoName>{crypto.cryptoName}</CryptoName>
              </CryptoInfo>
              
              <PriceInfo>
                <CurrentPrice>{formatPrice(crypto.tradePrice)}원</CurrentPrice>
              </PriceInfo>
              
              <PriceChange direction={crypto.change}>
                <DirectionIcon direction={crypto.change}>
                  {getDirectionIcon(crypto.change)}
                </DirectionIcon>
                {formatPrice(crypto.changePrice)}
                <span>({formatChangeRate(crypto.changeRate)}%)</span>
              </PriceChange>
              
              <TargetPrice status={targetStatus}>
                {crypto.targetPrice ? `${crypto.targetPrice}원` : '목표가 없음'}
              </TargetPrice>
            </TableRow>
          );
        })}
      </Table>
    </CryptoTableContainer>
  );
};

export default CryptoTable;
