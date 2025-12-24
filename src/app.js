/**
 * Main Application
 * 의존성 주입 및 초기화
 */

// 1. 코어 모듈 생성
const { VATCalculator } = require('./core/calculator/VATCalculator');
const { NumberFormatter } = require('./core/formatters/NumberFormatter');
const { InputValidator } = require('./core/validators/InputValidator');

// 2. 서비스 생성 (의존성 주입)
const { CalculationService } = require('./services/CalculationService');
const { ClipboardService } = require('./services/ClipboardService');

const calculator = new VATCalculator();
const formatter = new NumberFormatter();
const validator = new InputValidator();

const calculationService = new CalculationService(calculator, formatter, validator);
const clipboardService = new ClipboardService();

// 3. UI 상태 및 컨트롤러 생성
const { AppState } = require('./ui/state/AppState');
const { KeypadController } = require('./ui/controllers/KeypadController');
const { ModeController } = require('./ui/controllers/ModeController');
const { KeyboardController } = require('./ui/controllers/KeyboardController');

const appState = new AppState();
const keypadController = new KeypadController(appState, calculationService);
const modeController = new ModeController(appState, keypadController);
const keyboardController = new KeyboardController(keypadController, modeController);

// 4. UI 업데이트 함수
function updateUI(state) {
    // 입력 금액 표시
    const inputDisplay = document.getElementById('input-amount');
    if (inputDisplay) {
        inputDisplay.textContent = state.result?.formatted.input || '0';
    }

    // 결과 표시
    if (state.result) {
        const supplyEl = document.getElementById('supply-amount');
        const vatEl = document.getElementById('vat-amount');
        const totalEl = document.getElementById('total-amount');

        if (supplyEl) supplyEl.textContent = state.result.formatted.supply;
        if (vatEl) vatEl.textContent = state.result.formatted.vat;
        if (totalEl) totalEl.textContent = state.result.formatted.total;
    }
}

// 5. 초기화
function init() {
    // 상태 구독
    appState.subscribe(updateUI);

    // 키패드 버튼 이벤트
    document.querySelectorAll('[data-key]').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.key;

            if (key >= '0' && key <= '9') {
                keypadController.handleNumberInput(key);
            } else if (key === '00') {
                keypadController.handleNumberInput('00');
            } else if (key === 'backspace') {
                keypadController.handleBackspace();
            }
        });
    });

    // 초기화 버튼
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            keypadController.handleReset();
        });
    }

    // 복사 버튼
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const result = appState.getState().result;
            if (result) {
                const text = clipboardService.formatResult(result);
                const success = await clipboardService.copy(text);

                if (success) {
                    showToast('복사되었습니다');
                }
            }
        });
    }

    // 모드 전환
    document.querySelectorAll('input[name="vat-mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            modeController.toggleMode(e.target.value);
        });
    });

    // 초기 계산
    keypadController.calculate('0');
}

// Toast 메시지
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// DOM 로드 후 초기화
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appState,
        keypadController,
        modeController,
        calculationService,
        clipboardService
    };
}
