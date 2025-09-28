/**
 * 달력에서 실제 표시되는 날짜 범위를 계산하는 유틸리티 함수들
 */

export interface DateRange {
  startDate: string; // YYYY-MM-DD 형식
  endDate: string;   // YYYY-MM-DD 형식
}

/**
 * 특정 년월의 달력에 표시되는 실제 날짜 범위를 계산
 * @param year 년도
 * @param month 월 (0부터 시작, 1월이 0)
 * @returns 달력에 표시되는 시작일과 종료일
 */
export function getCalendarDateRange(year: number, month: number): DateRange {
  // 해당 월의 첫째 날
  const firstDayOfMonth = new Date(year, month, 1);
  // 해당 월의 마지막 날
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // 첫째 날의 요일 (0=일요일, 1=월요일, ..., 6=토요일)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // 달력의 시작일 (이전 달의 일부 날짜 포함)
  const startDate = new Date(year, month, 1 - firstDayOfWeek);
  
  // 달력의 종료일 (다음 달의 일부 날짜 포함)
  // 6주(42일) 그리드를 채우기 위해 계산
  const totalDaysInMonth = lastDayOfMonth.getDate();
  const remainingDays = 42 - (firstDayOfWeek + totalDaysInMonth);
  const endDate = new Date(year, month + 1, remainingDays - 1);
  
  return {
    startDate: formatDateToString(startDate),
    endDate: formatDateToString(endDate)
  };
}

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
 * @param date Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 년월 문자열(YYYYMM)을 DateRange로 변환
 * @param yearMonth YYYYMM 형식의 년월 문자열
 * @returns 달력에 표시되는 시작일과 종료일
 */
export function getCalendarDateRangeFromYearMonth(yearMonth: string): DateRange {
  const year = parseInt(yearMonth.substring(0, 4));
  const month = parseInt(yearMonth.substring(4, 6)) - 1; // 0부터 시작하므로 -1
  
  return getCalendarDateRange(year, month);
}

/**
 * DateRange를 API에서 사용할 형식으로 변환
 * @param dateRange 날짜 범위
 * @returns API용 날짜 범위 객체
 */
export function formatDateRangeForApi(dateRange: DateRange): {
  startDate: string; // YYYYMMDD 형식
  endDate: string;   // YYYYMMDD 형식
} {
  return {
    startDate: dateRange.startDate.replace(/-/g, ''),
    endDate: dateRange.endDate.replace(/-/g, '')
  };
}

/**
 * 테스트용 함수: 특정 년월의 달력 범위를 콘솔에 출력
 * @param yearMonth YYYYMM 형식의 년월 문자열
 */
export function debugCalendarRange(yearMonth: string): void {
  const dateRange = getCalendarDateRangeFromYearMonth(yearMonth);
  console.log(`${yearMonth} 달력 표시 범위:`);
  console.log(`시작일: ${dateRange.startDate}`);
  console.log(`종료일: ${dateRange.endDate}`);
  console.log(`API 형식:`, formatDateRangeForApi(dateRange));
}
