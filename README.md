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

## 📄 문서

- [PRD (Product Requirements Document)](./PRD.md)

## 📝 라이선스

MIT License

## 👤 개발자

lsm427654-source
