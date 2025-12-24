# VAT Calculator - Implementation Tasks

**프로젝트**: 부가세 계산기  
**개발 원칙**: TDD + SOLID  
**참고 문서**: [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md), [docs/rules/TDD.md](./docs/rules/TDD.md)

---

## 📋 구현 순서

### Phase 1: 개발 환경 설정
### Phase 2: 코어 로직 (TDD)
### Phase 3: 서비스 레이어 (TDD)
### Phase 4: UI 레이어
### Phase 5: 통합 및 배포

---

## Phase 1: 개발 환경 설정 🔧

### 1.1 프로젝트 초기화
- [ ] `package.json` 생성 및 설정
  ```bash
  npm init -y
  ```
- [ ] 필수 의존성 설치
  ```bash
  npm install --save-dev jest @babel/core @babel/preset-env babel-jest
  ```
- [ ] `jest.config.js` 설정
- [ ] `babel.config.js` 설정 (ES6 모듈 지원)

### 1.2 디렉토리 구조 생성
- [ ] `src/` 폴더 생성
  - [ ] `src/core/calculator/`
  - [ ] `src/core/formatters/`
  - [ ] `src/core/validators/`
  - [ ] `src/services/`
  - [ ] `src/ui/components/`
  - [ ] `src/ui/controllers/`
  - [ ] `src/ui/state/`
  - [ ] `src/utils/`
- [ ] `tests/` 폴더 생성
  - [ ] `tests/unit/core/calculator/`
  - [ ] `tests/unit/core/formatters/`
  - [ ] `tests/unit/core/validators/`
  - [ ] `tests/unit/services/`
  - [ ] `tests/integration/`
- [ ] `public/` 폴더 생성

### 1.3 Git 설정
- [ ] `.gitignore` 업데이트 (node_modules 추가)
- [ ] 커밋: "chore: setup development environment"

**완료 조건**: `npm test` 실행 시 "No tests found" 메시지 출력

---

## Phase 2: 코어 로직 (TDD) 🧪

> **중요**: 모든 코어 로직은 **테스트 우선 작성** (Red → Green → Refactor)

### 2.1 상수 정의
- [ ] `src/utils/constants.js` 작성
  ```javascript
  export const VAT_RATE = 0.1;
  export const MAX_DIGITS = 12;
  export const CALCULATION_MODE = {
    INCLUSIVE: 'inclusive',
    EXCLUSIVE: 'exclusive'
  };
  ```
- [ ] 커밋: "feat: add project constants"

### 2.2 VATCalculator (계산 엔진) ⭐ P0

#### 2.2.1 테스트 작성 (Red)
- [ ] `tests/unit/core/calculator/VATCalculator.test.js` 작성
  - [ ] `calculateInclusive()` 테스트
    - [ ] 정상 케이스: 1,000,000원
    - [ ] 경계값: 0원
    - [ ] 큰 금액: 100,000,000원
  - [ ] `calculateExclusive()` 테스트
    - [ ] 정상 케이스: 5,000,000원
    - [ ] 경계값: 0원
  - [ ] 커스텀 VAT rate 테스트
- [ ] 테스트 실행: `npm test` → **실패 확인** (Red)

#### 2.2.2 구현 (Green)
- [ ] `src/core/calculator/VATCalculator.js` 구현
  ```javascript
  export class VATCalculator {
    constructor(vatRate = 0.1) { /* ... */ }
    calculateInclusive(totalAmount) { /* ... */ }
    calculateExclusive(supplyAmount) { /* ... */ }
  }
  ```
- [ ] `src/core/calculator/index.js` (export)
- [ ] 테스트 실행: `npm test` → **통과 확인** (Green)

#### 2.2.3 리팩토링 (Refactor)
- [ ] 코드 정리 및 주석 추가
- [ ] 테스트 재실행: 통과 확인
- [ ] 커밋: "feat: implement VAT calculator with 100% test coverage"

**완료 조건**: 테스트 커버리지 100%

### 2.3 NumberFormatter (숫자 포맷팅) ⭐ P0

#### 2.3.1 테스트 작성 (Red)
- [ ] `tests/unit/core/formatters/NumberFormatter.test.js` 작성
  - [ ] 천 단위 콤마: 1000000 → "1,000,000"
  - [ ] 0 처리: 0 → "0"
  - [ ] 음수 처리 (선택사항)
- [ ] 테스트 실행 → **실패 확인**

#### 2.3.2 구현 (Green)
- [ ] `src/core/formatters/NumberFormatter.js` 구현
  ```javascript
  export class NumberFormatter {
    format(number) {
      return Math.round(number).toLocaleString('ko-KR');
    }
  }
  ```
- [ ] `src/core/formatters/index.js` (export)
- [ ] 테스트 실행 → **통과 확인**

#### 2.3.3 리팩토링
- [ ] 코드 정리
- [ ] 커밋: "feat: implement number formatter with tests"

**완료 조건**: 테스트 커버리지 100%

### 2.4 InputValidator (입력 검증) ⭐ P0

#### 2.4.1 테스트 작성 (Red)
- [ ] `tests/unit/core/validators/InputValidator.test.js` 작성
  - [ ] 유효한 입력: "1000000" → true
  - [ ] 빈 문자열: "" → false
  - [ ] 최대 자릿수 초과: 13자리 → false
  - [ ] 숫자가 아닌 문자: "abc" → false
- [ ] 테스트 실행 → **실패 확인**

#### 2.4.2 구현 (Green)
- [ ] `src/core/validators/InputValidator.js` 구현
  ```javascript
  export class InputValidator {
    constructor(maxDigits = 12) { /* ... */ }
    isValid(input) { /* ... */ }
    sanitize(input) { /* ... */ }
  }
  ```
- [ ] `src/core/validators/index.js` (export)
- [ ] 테스트 실행 → **통과 확인**

#### 2.4.3 리팩토링
- [ ] 커밋: "feat: implement input validator with tests"

**완료 조건**: 테스트 커버리지 100%

---

## Phase 3: 서비스 레이어 (TDD) 🔄

### 3.1 CalculationService ⭐ P0

#### 3.1.1 테스트 작성 (Red)
- [ ] `tests/unit/services/CalculationService.test.js` 작성
  - [ ] 의존성 주입 테스트
  - [ ] 부가세 포함 계산 + 포맷팅
  - [ ] 부가세 별도 계산 + 포맷팅
  - [ ] 잘못된 입력 처리
- [ ] 테스트 실행 → **실패 확인**

#### 3.1.2 구현 (Green)
- [ ] `src/services/CalculationService.js` 구현
  ```javascript
  export class CalculationService {
    constructor(calculator, formatter, validator) { /* DI */ }
    calculate(input, mode) { /* ... */ }
  }
  ```
- [ ] `src/services/index.js` (export)
- [ ] 테스트 실행 → **통과 확인**

#### 3.1.3 리팩토링
- [ ] 커밋: "feat: implement calculation service with DI"

**완료 조건**: 테스트 커버리지 90% 이상

### 3.2 ClipboardService 📋 P1

#### 3.2.1 테스트 작성
- [ ] `tests/unit/services/ClipboardService.test.js` 작성
  - [ ] Clipboard API 모킹
  - [ ] 복사 성공 케이스
  - [ ] 복사 실패 케이스
- [ ] 테스트 실행 → **실패 확인**

#### 3.2.2 구현
- [ ] `src/services/ClipboardService.js` 구현
  ```javascript
  export class ClipboardService {
    async copy(text) { /* ... */ }
    formatResult(result) { /* ... */ }
  }
  ```
- [ ] 테스트 실행 → **통과 확인**

#### 3.2.3 리팩토링
- [ ] 커밋: "feat: implement clipboard service"

**완료 조건**: 테스트 커버리지 90% 이상

### 3.3 StorageService 💾 P2 (Phase 2 기능)

- [ ] `tests/unit/services/StorageService.test.js` 작성
- [ ] `src/services/StorageService.js` 구현
- [ ] 커밋: "feat: implement storage service for history"

---

## Phase 4: UI 레이어 🎨

> **주의**: UI 컴포넌트는 **수동 테스트** (브라우저 확인)

### 4.1 상태 관리

#### 4.1.1 AppState
- [ ] `src/ui/state/AppState.js` 구현
  - [ ] 옵저버 패턴
  - [ ] `getState()`, `setState()`, `subscribe()`
- [ ] `src/ui/state/index.js` (export)
- [ ] 커밋: "feat: implement app state management"

### 4.2 UI 컴포넌트

#### 4.2.1 기본 컴포넌트 구조
- [ ] `src/ui/components/Header.js`
- [ ] `src/ui/components/ModeToggle.js`
- [ ] `src/ui/components/InputDisplay.js`
- [ ] `src/ui/components/ResultCard.js`
- [ ] `src/ui/components/NumericKeypad.js`
- [ ] `src/ui/components/Toast.js`
- [ ] `src/ui/components/index.js` (export all)
- [ ] 커밋: "feat: create UI component structure"

#### 4.2.2 컴포넌트 구현
- [ ] 각 컴포넌트 구현 (HTML 생성 함수)
- [ ] 디자인 참고: `design/reference.html`
- [ ] 커밋: "feat: implement UI components"

### 4.3 UI 컨트롤러

#### 4.3.1 KeypadController
- [ ] `src/ui/controllers/KeypadController.js` 구현
  - [ ] 숫자 입력 처리
  - [ ] 백스페이스 처리
  - [ ] 상태 업데이트
- [ ] 커밋: "feat: implement keypad controller"

#### 4.3.2 KeyboardController
- [ ] `src/ui/controllers/KeyboardController.js` 구현
  - [ ] 물리 키보드 이벤트 매핑
  - [ ] 버튼 애니메이션 트리거
- [ ] 커밋: "feat: implement keyboard controller"

#### 4.3.3 ModeController
- [ ] `src/ui/controllers/ModeController.js` 구현
  - [ ] 모드 전환 처리
  - [ ] 재계산 트리거
- [ ] 커밋: "feat: implement mode controller"

### 4.4 애플리케이션 초기화

#### 4.4.1 app.js (의존성 주입)
- [ ] `src/app.js` 작성
  ```javascript
  // 의존성 생성
  const calculator = new VATCalculator();
  const formatter = new NumberFormatter();
  const validator = new InputValidator();
  
  // 서비스 생성 (DI)
  const calculationService = new CalculationService(
    calculator, formatter, validator
  );
  
  // 컨트롤러 생성
  const keypadController = new KeypadController(/* ... */);
  
  // 초기화
  init();
  ```
- [ ] 커밋: "feat: implement app initialization with DI"

#### 4.4.2 public/index.html
- [ ] `public/index.html` 작성
  - [ ] 기본 HTML 구조
  - [ ] Tailwind CSS CDN
  - [ ] Google Fonts (Manrope)
  - [ ] Material Symbols
  - [ ] `<script type="module" src="../src/app.js"></script>`
- [ ] 커밋: "feat: create main HTML file"

---

## Phase 5: 통합 및 배포 🚀

### 5.1 통합 테스트

- [ ] `tests/integration/calculator-flow.test.js` 작성
  - [ ] 전체 계산 플로우 테스트
  - [ ] 모드 전환 테스트
- [ ] 테스트 실행 및 수정
- [ ] 커밋: "test: add integration tests"

### 5.2 수동 테스트

- [ ] 브라우저에서 `public/index.html` 열기
- [ ] 기능 테스트 체크리스트
  - [ ] 숫자 입력 (0-9, 00)
  - [ ] 백스페이스 삭제
  - [ ] 초기화 기능
  - [ ] 모드 전환 (포함 ↔ 별도)
  - [ ] 복사 기능
  - [ ] 키보드 입력 (0-9, Backspace, Enter, Esc, Tab)
  - [ ] 다크 모드
  - [ ] 반응형 (모바일, 태블릿, 데스크톱)
- [ ] 버그 수정 및 커밋

### 5.3 문서 업데이트

- [ ] `README.md` 업데이트
  - [ ] 설치 방법
  - [ ] 개발 서버 실행 방법
  - [ ] 테스트 실행 방법
- [ ] 커밋: "docs: update README with development guide"

### 5.4 배포

- [ ] GitHub Actions 워크플로우 확인
- [ ] GitHub Pages 설정 확인
- [ ] `main` 브랜치에 푸시
- [ ] 배포 확인: `https://lsm427654-source.github.io/VAT/`
- [ ] 프로덕션 환경 테스트

---

## 📊 진행 상황 요약

### Phase 1: 개발 환경 설정
- [ ] 0/3 완료

### Phase 2: 코어 로직 (TDD)
- [ ] 0/4 완료
- 목표 커버리지: **100%**

### Phase 3: 서비스 레이어 (TDD)
- [ ] 0/3 완료
- 목표 커버리지: **90%**

### Phase 4: UI 레이어
- [ ] 0/4 완료
- 테스트: **수동**

### Phase 5: 통합 및 배포
- [ ] 0/4 완료

---

## 🎯 우선순위

### P0 (필수)
- VATCalculator
- NumberFormatter
- InputValidator
- CalculationService
- UI 컴포넌트
- 기본 컨트롤러

### P1 (중요)
- ClipboardService
- 통합 테스트

### P2 (선택)
- StorageService (히스토리 기능)

---

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
test: 테스트 추가/수정
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
chore: 빌드 설정 등
```

---

## 🔗 참고 문서

- [PRD](./PRD.md) - 제품 요구사항
- [TECH_SPEC](./TECH_SPEC.md) - 기술 명세
- [DIRECTORY_STRUCTURE](./DIRECTORY_STRUCTURE.md) - 프로젝트 구조
- [TDD Rules](./docs/rules/TDD.md) - TDD 가이드
- [SOLID Principles](./docs/rules/SOLID.md) - SOLID 원칙

---

**시작 전 확인사항**:
- [ ] TDD 규칙 숙지
- [ ] SOLID 원칙 이해
- [ ] 디렉토리 구조 확인
- [ ] 개발 환경 준비 완료
