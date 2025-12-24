---
description: SOLID principles for clean architecture and maintainable code
---

# SOLID Principles

## 1. Single Responsibility Principle (SRP)
**한 클래스는 하나의 책임만 가져야 한다**

### ✅ 좋은 예
```javascript
// 계산만 담당
class VATCalculator {
  calculateInclusive(amount) { /* ... */ }
}

// 포맷팅만 담당
class NumberFormatter {
  format(number) { /* ... */ }
}
```

### ❌ 나쁜 예
```javascript
// 계산 + 포맷팅 + 검증 (너무 많은 책임)
class Calculator {
  calculate() { /* ... */ }
  format() { /* ... */ }
  validate() { /* ... */ }
}
```

## 2. Open/Closed Principle (OCP)
**확장에는 열려있고, 수정에는 닫혀있어야 한다**

### ✅ 좋은 예: 전략 패턴
```javascript
class VATCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  calculate(amount) {
    return this.strategy.calculate(amount);
  }
}

// 새 전략 추가 시 기존 코드 수정 불필요
class InclusiveStrategy { /* ... */ }
class ExclusiveStrategy { /* ... */ }
```

## 3. Liskov Substitution Principle (LSP)
**하위 타입은 상위 타입을 대체할 수 있어야 한다**

모든 계산 전략은 동일한 인터페이스를 구현해야 합니다.

## 4. Interface Segregation Principle (ISP)
**클라이언트는 사용하지 않는 메서드에 의존하지 않아야 한다**

### ✅ 좋은 예: 분리된 인터페이스
```javascript
interface Calculator { calculate(); }
interface Formatter { format(); }
interface Validator { validate(); }
```

## 5. Dependency Inversion Principle (DIP)
**고수준 모듈은 저수준 모듈에 의존하지 않고, 추상화에 의존해야 한다**

### ✅ 좋은 예: 의존성 주입
```javascript
// app.js에서 의존성 주입
const calculator = new VATCalculator();
const formatter = new NumberFormatter();

const service = new CalculationService(
  calculator,  // 주입
  formatter    // 주입
);
```

## 프로젝트 적용

### 모듈별 책임 (SRP)

| 모듈 | 단일 책임 |
|------|----------|
| `VATCalculator` | 부가세 계산만 |
| `NumberFormatter` | 숫자 포맷팅만 |
| `InputValidator` | 입력 검증만 |
| `CalculationService` | 계산 플로우 조율만 |
| `KeypadController` | 키패드 이벤트 처리만 |

### 의존성 방향 (DIP)

```
UI Layer → Service Layer → Core Layer
(고수준)                    (저수준)
```

**핵심**: 저수준 모듈(Core)은 고수준 모듈(UI)을 알지 못함

## 체크리스트

- [ ] 각 클래스는 하나의 책임만 가지는가?
- [ ] 새 기능 추가 시 기존 코드 수정이 필요한가?
- [ ] 의존성 주입을 사용하는가?
- [ ] UI와 비즈니스 로직이 분리되어 있는가?
- [ ] 인터페이스가 너무 크지 않은가?
