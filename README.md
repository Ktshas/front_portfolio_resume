# 김태성 포트폴리오 웹사이트

React와 TypeScript로 제작된 개인 포트폴리오 웹사이트입니다.

## 🌐 배포 링크
**https://ktshas.github.io/front_portfolio_resume**

## 🛠️ 사용 기술

### 핵심 기술
- **React 19.1.1** - 사용자 인터페이스 구축
- **TypeScript 4.9.5** - 타입 안전성 보장
- **React Router DOM 7.9.1** - 페이지 라우팅
- **Styled Components 6.1.19** - CSS-in-JS 스타일링

### UI/UX 라이브러리
- **Framer Motion 12.23.13** - 애니메이션 효과
- **Lucide React 0.544.0** - 아이콘 라이브러리

### 개발/배포 도구
- **Create React App** - 프로젝트 설정 및 빌드
- **GitHub Pages** - 웹사이트 호스팅
- **gh-pages 6.3.0** - GitHub Pages 배포 자동화

## 📁 프로젝트 구조

```
portfolio-project/
├── public/                          # 정적 파일들
│   ├── index.html                   # HTML 템플릿
│   ├── favicon.ico                  # 웹사이트 아이콘
│   └── *.pdf                        # 이력서/포트폴리오 PDF 파일들
├── src/
│   ├── App.tsx                      # 메인 앱 컴포넌트 (라우팅 설정)
│   ├── index.tsx                    # React 앱 진입점
│   ├── App.css                      # 전역 스타일
│   ├── index.css                    # 기본 CSS 설정
│   ├── theme.ts                     # 테마 설정 파일
│   ├── components/                  # 재사용 가능한 컴포넌트들
│   │   ├── shared/                  # 공통 컴포넌트
│   │   │   ├── GlobalHeader.tsx     # 전역 헤더 (네비게이션)
│   │   │   └── LocalHeader.tsx      # 로컬 헤더
│   │   └── ui/                      # UI 컴포넌트
│   │       ├── Button.tsx           # 버튼 컴포넌트
│   │       └── Card.tsx             # 카드 컴포넌트
│   └── pages/                       # 페이지 컴포넌트들
│       ├── resume/                  # 이력서 페이지
│       │   ├── Resume.tsx           # 이력서 메인 페이지
│       │   └── sections/            # 이력서 섹션들
│       │       ├── Hero.tsx         # 프로필 섹션
│       │       ├── About.tsx        # 소개 섹션
│       │       ├── Experience.tsx   # 경력 섹션
│       │       ├── Skills.tsx       # 기술 스택 섹션
│       │       ├── Projects.tsx     # 프로젝트 섹션
│       │       └── Footer.tsx       # 푸터 섹션
│       ├── portfolio/               # 포트폴리오 페이지
│       │   ├── Portfolio.tsx        # 포트폴리오 메인 페이지
│       │   └── components/
│       │       └── PDFViewer.tsx    # PDF 뷰어 컴포넌트
│       └── contact/                 # 연락처 페이지
│           └── Contact.tsx          # 연락처 폼
├── package.json                     # 프로젝트 설정 및 의존성
└── tsconfig.json                    # TypeScript 설정
```

## 🔧 주요 파일 설명

### `src/App.tsx`
- 메인 애플리케이션 컴포넌트
- React Router를 사용한 페이지 라우팅 설정
- **GitHub Pages 배포를 위한 basename 설정**:
  ```tsx
  <Router basename="/front_portfolio_resume">
  ```

### `src/index.tsx`
- React 애플리케이션의 진입점
- ReactDOM.render로 App 컴포넌트를 DOM에 마운트

### `package.json`
- 프로젝트 의존성 및 스크립트 정의
- **GitHub Pages 배포 관련 설정**:
  ```json
  {
    "homepage": "https://ktshas.github.io/front_portfolio_resume",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
  }
  ```

### `src/components/shared/GlobalHeader.tsx`
- 전역 네비게이션 헤더
- 페이지 간 이동을 위한 메뉴

### `src/pages/resume/sections/`
- 이력서의 각 섹션을 담당하는 컴포넌트들
- Hero, About, Experience, Skills, Projects, Footer로 구성

## 🚀 개발 명령어

### 개발 서버 실행
```bash
npm start
```
- 개발 모드로 앱 실행
- http://localhost:3000 에서 확인 가능
- 코드 변경 시 자동 새로고침

### 프로덕션 빌드
```bash
npm run build
```
- 배포용 최적화된 빌드 생성
- `build/` 폴더에 결과물 생성

### 테스트 실행
```bash
npm test
```
- Jest 테스트 러너 실행
- 인터랙티브 모드로 실행

## 🌐 GitHub Pages 배포

### 초기 배포 설정 (이미 완료됨)
1. `gh-pages` 패키지 설치
2. `package.json`에 homepage URL 설정
3. 배포 스크립트 추가
4. `App.tsx`에 basename 설정

### 배포 명령어
```bash
npm run deploy
```
- 자동으로 빌드 후 GitHub Pages에 배포
- `gh-pages` 브랜치에 빌드 결과물 푸시

### 배포 과정
1. `predeploy` 스크립트가 자동으로 `npm run build` 실행
2. `deploy` 스크립트가 `build/` 폴더를 `gh-pages` 브랜치에 푸시
3. GitHub Pages가 자동으로 웹사이트 업데이트

## 📝 코드 변경 후 배포 과정

1. **코드 수정**
2. **Git 커밋 및 푸시** (선택사항, 소스 코드 백업용)
   ```bash
   git add .
   git commit -m "변경 내용 설명"
   git push
   ```
3. **GitHub Pages 배포**
   ```bash
   npm run deploy
   ```

## 🎨 스타일링 구조

- **Styled Components**: CSS-in-JS로 컴포넌트별 스타일 관리
- **theme.ts**: 전역 테마 설정 (색상, 폰트 등)
- **Framer Motion**: 페이지 전환 및 애니메이션 효과

## 📋 주요 기능

- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **다중 페이지**: 이력서, 포트폴리오, 연락처 페이지
- **PDF 뷰어**: 포트폴리오 문서 온라인 뷰어
- **부드러운 애니메이션**: Framer Motion 기반 전환 효과
- **타입 안전성**: TypeScript로 런타임 오류 방지

## 🔍 문제 해결

### 라우팅 문제
- GitHub Pages 서브패스 배포 시 라우팅 문제는 `App.tsx`의 `basename` 설정으로 해결

### 캐시 문제
- 배포 후 변경사항이 보이지 않을 때는 브라우저 캐시 삭제 또는 시크릿 모드 사용

## 📞 문의

프로젝트 관련 문의사항이 있으시면 GitHub Issues를 통해 연락해 주세요.