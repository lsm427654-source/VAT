---
description: Test-Driven Development (TDD) guidelines for core business logic
---

# TDD (Test-Driven Development) Rules

## 적용 범위

### ✅ TDD 필수 적용
- `src/core/` - 모든 비즈니스 로직
- `src/services/` - 애플리케이션 서비스

### ❌ TDD 제외 (수동 테스트)
- `src/ui/components/` - UI 컴포넌트 (브라우저 테스트)

## TDD 사이클: Red → Green → Refactor

### 1. 🔴 Red (테스트 작성)
먼저 실패하는 테스트 작성

### 2. 🟢 Green (최소 구현)
테스트를 통과하는 최소한의 코드 작성

### 3. 🔵 Refactor (리팩토링)
테스트 통과를 유지하면서 코드 개선

## 중요 원칙

1. **테스트를 먼저 작성한다** - 구현 전에 항상 테스트 작성
2. **한 번에 하나씩** - 하나의 테스트를 통과시킨 후 다음 테스트 작성
3. **최소 구현** - 테스트를 통과하는 최소한의 코드만 작성
4. **리팩토링은 Green 상태에서** - 테스트가 통과한 후에만 리팩토링
5. **테스트는 독립적** - 각 테스트는 다른 테스트에 의존하지 않음

## 금지 사항

❌ 테스트 없이 코어 로직 구현  
❌ 실패하는 테스트를 무시하고 진행  
❌ UI 컴포넌트에 비즈니스 로직 포함

✅ 모든 코어 로직은 테스트 우선  
✅ 비즈니스 로직은 UI와 완전 분리
