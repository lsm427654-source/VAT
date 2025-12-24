# Development Rules

이 프로젝트는 다음 개발 원칙을 따릅니다:

## 📋 핵심 규칙

1. **[TDD (Test-Driven Development)](./TDD.md)**
   - 모든 코어 로직은 테스트 우선 작성
   - Red → Green → Refactor 사이클 준수
   - 코어 로직 100%, 서비스 90%, 컨트롤러 80% 커버리지 목표

2. **[SOLID Principles](./SOLID.md)**
   - 단일 책임 원칙 (SRP)
   - 개방-폐쇄 원칙 (OCP)
   - 리스코프 치환 원칙 (LSP)
   - 인터페이스 분리 원칙 (ISP)
   - 의존성 역전 원칙 (DIP)

## 🎯 적용 범위

### TDD 필수
- `src/core/` - 모든 비즈니스 로직
- `src/services/` - 애플리케이션 서비스

### 수동 테스트
- `src/ui/components/` - UI 컴포넌트

## 📚 상세 문서

- [TDD 가이드](./TDD.md) - 테스트 작성 규칙 및 예시
- [SOLID 원칙](./SOLID.md) - 설계 원칙 및 적용 방법
