/**
 * KeyboardController - 물리 키보드 입력 처리
 */

class KeyboardController {
    constructor(keypadController, modeController) {
        this.keypadController = keypadController;
        this.modeController = modeController;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        // 숫자 입력 (0-9)
        if (e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            this.keypadController.handleNumberInput(e.key);
            this.animateButton(e.key);
        }

        // 백스페이스
        else if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            this.keypadController.handleBackspace();
            this.animateButton('backspace');
        }

        // 초기화 (Escape)
        else if (e.key === 'Escape') {
            e.preventDefault();
            this.keypadController.handleReset();
            this.animateButton('reset');
        }

        // 모드 전환 (Tab)
        else if (e.key === 'Tab') {
            e.preventDefault();
            const currentMode = document.querySelector('input[name="vat-mode"]:checked').value;
            const newMode = currentMode === 'inclusive' ? 'exclusive' : 'inclusive';
            this.modeController.toggleMode(newMode);
        }
    }

    animateButton(key) {
        const button = document.querySelector(`[data-key="${key}"]`);
        if (button) {
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        }
    }
}
