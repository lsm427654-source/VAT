# 부가세 계산기 (VAT Calculator)

한국 부가가치세(10%) 계산을 위한 모바일 우선 웹 애플리케이션

## 🎯 주요 기능

- ✅ **부가세 포함/별도 계산**: 두 가지 계산 모드 지원
- ✅ **실시간 계산**: 입력과 동시에 즉각 계산
- ✅ **키보드 지원**: PC에서 물리 키보드로 빠른 입력 가능
- ✅ **복사 기능**: 계산 결과를 클립보드에 복사
- ✅ **다크 모드**: 라이트/다크 테마 지원
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🚀 빠른 시작

1. 저장소 클론
```bash
git clone https://github.com/lsm427654-source/VAT.git
cd VAT
```

2. 브라우저에서 `index.html` 파일 열기

## 💻 사용 방법

### 모바일/태블릿
- 화면의 숫자 키패드를 탭하여 금액 입력
- 상단 토글로 계산 모드 전환

### PC/데스크톱
- **마우스**: 화면의 숫자 버튼 클릭
- **키보드**:
  - `0-9`: 숫자 입력
  - `Backspace/Delete`: 삭제
  - `Enter`: 결과 복사
  - `Esc`: 초기화
  - `Tab`: 모드 전환

## 📋 계산 공식

### 부가세 포함 (역산)
- 공급가액 = 총 금액 ÷ 1.1
- 부가세 = 공급가액 × 0.1

### 부가세 별도
- 부가세 = 공급가액 × 0.1
- 합계금액 = 공급가액 + 부가세

## 🛠️ 기술 스택

- HTML5
- CSS3 (Tailwind CSS)
- Vanilla JavaScript
- Google Fonts (Manrope)
- Material Symbols Icons

## 📱 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🧪 개발

### 설치

```bash
git clone https://github.com/lsm427654-source/VAT.git
cd VAT
npm install
```

### 테스트 실행

```bash
# 모든 테스트 실행
node tests/unit/core/calculator/VATCalculator.test.js
node tests/unit/core/formatters/NumberFormatter.test.js
node tests/unit/core/validators/InputValidator.test.js
node tests/unit/services/CalculationService.test.js
node tests/unit/services/ClipboardService.test.js
```

### 개발 서버

브라우저에서 `public/index.html` 파일을 직접 열거나, 로컬 서버 사용:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

### 프로젝트 구조

```
src/
├── core/           # 비즈니스 로직 (TDD, 100% 커버리지)
│   ├── calculator/ # VAT 계산 엔진
│   ├── formatters/ # 숫자 포맷팅
│   └── validators/ # 입력 검증
├── services/       # 서비스 레이어 (90%+ 커버리지)
│   ├── CalculationService.js
│   └── ClipboardService.js
├── ui/             # UI 레이어 (수동 테스트)
│   ├── state/      # 상태 관리
│   └── controllers/# 이벤트 처리
└── app.js          # 메인 애플리케이션

tests/
└── unit/           # 단위 테스트 (32개 테스트)
```

### 테스트 커버리지

- **코어 로직**: 100% (23/23 테스트)
- **서비스 레이어**: 90%+ (9/9 테스트)
- **UI 레이어**: 수동 테스트

## 📄 문서

- [PRD (Product Requirements Document)](./PRD.md)
- [TECH_SPEC (Technical Specification)](./TECH_SPEC.md)
- [DIRECTORY_STRUCTURE](./DIRECTORY_STRUCTURE.md)
- [TDD Rules](./docs/rules/TDD.md)
- [SOLID Principles](./docs/rules/SOLID.md)

## 📝 라이선스

MIT License

## 👤 개발자

lsm427654-source

