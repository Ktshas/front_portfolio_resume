import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';
import { KakaoPlace, SelectedLocation } from '../../types/schedule';
import { searchAddress, createDebouncedSearch } from '../../services/kakaoApi';

interface AddressSearchProps {
  onLocationSelect: (location: SelectedLocation) => void;
  placeholder?: string;
}

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: ${props => props.theme.colors.textSecondary};
  color: ${props => props.theme.colors.surface};
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;

  &:hover {
    background: ${props => props.theme.colors.text};
  }
`;

const SearchResults = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SearchResultItem = styled(motion.div)`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PlaceName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const AddressInfo = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
`;

const CategoryInfo = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.primary};
  margin-top: 0.25rem;
`;

const LoadingMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
`;

const NoResultsMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.error};
`;

const AddressSearch: React.FC<AddressSearchProps> = ({ 
  onLocationSelect, 
  placeholder = "장소를 검색하세요" 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = createDebouncedSearch(300);

  // 외부 클릭 시 검색 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 검색 실행
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchAddress({ query: searchQuery });
      setResults(response.documents);
      setIsOpen(true);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error('주소 검색 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 입력값 변경 핸들러
  const handleInputChange = (value: string) => {
    setQuery(value);
    setError(null);
    
    if (value.trim()) {
      debouncedSearch(performSearch, value);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // 검색 결과 선택 핸들러
  const handleResultSelect = (place: KakaoPlace) => {
    const selectedLocation: SelectedLocation = {
      place_name: place.place_name,
      address_name: place.address_name,
      road_address_name: place.road_address_name,
      x: place.x,
      y: place.y,
    };

    console.log('선택된 위치 정보:', selectedLocation);
    onLocationSelect(selectedLocation);
    
    setQuery(place.place_name);
    setIsOpen(false);
  };

  // 입력값 초기화
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setError(null);
  };

  return (
    <SearchContainer ref={searchContainerRef}>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        
        {query && (
          <ClearButton
            onClick={handleClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={12} />
          </ClearButton>
        )}
        
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
      </SearchInputContainer>

      <AnimatePresence>
        {isOpen && (
          <SearchResults
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading && (
              <LoadingMessage>검색 중...</LoadingMessage>
            )}
            
            {error && (
              <ErrorMessage>{error}</ErrorMessage>
            )}
            
            {!isLoading && !error && results.length === 0 && query && (
              <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
            )}
            
            {!isLoading && !error && results.map((place, index) => (
              <SearchResultItem
                key={place.id}
                onClick={() => handleResultSelect(place)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
              >
                <PlaceName>{place.place_name}</PlaceName>
                <AddressInfo>
                  {place.road_address_name || place.address_name}
                </AddressInfo>
                {place.category_name && (
                  <CategoryInfo>{place.category_name}</CategoryInfo>
                )}
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default AddressSearch;
