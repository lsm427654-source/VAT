# GitHub Pages 배포 실패 해결 가이드

## 문제 원인

GitHub Actions 워크플로우는 정상이지만, **GitHub Pages가 활성화되지 않아** 배포가 실패하고 있습니다.

## 해결 방법

### 1단계: GitHub Pages 활성화

1. GitHub 저장소로 이동: https://github.com/lsm427654-source/VAT
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - **"GitHub Actions"** 선택 (Deploy from a branch가 아님!)
5. **Save** 클릭

### 2단계: 워크플로우 재실행

Pages 설정 후:
1. **Actions** 탭으로 이동
2. 실패한 워크플로우 클릭
3. **Re-run all jobs** 버튼 클릭

또는 새로운 커밋을 푸시하면 자동으로 재실행됩니다.

### 3단계: 배포 확인

성공하면 다음 URL에서 접근 가능:
- https://lsm427654-source.github.io/VAT/

## 현재 워크플로우 상태

워크플로우 파일(`.github/workflows/deploy.yml`)은 정상입니다:
- ✅ GitHub Actions 사용
- ✅ 올바른 permissions 설정
- ✅ 최신 actions 버전 사용

## 참고사항

- **첫 배포는 수동 설정 필요**: GitHub Pages를 처음 사용할 때는 Settings에서 수동으로 활성화해야 합니다.
- **자동 배포**: 설정 후에는 `main` 브랜치에 푸시할 때마다 자동 배포됩니다.

## 문제가 계속되면

1. Actions 탭에서 에러 로그 확인
2. Pages 설정이 "GitHub Actions"로 되어있는지 재확인
3. Repository Settings > Actions > General에서 "Read and write permissions" 확인
