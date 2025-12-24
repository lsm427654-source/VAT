/**
 * ModeController - 모드 전환 처리
 */

class ModeController {
    constructor(appState, keypadController) {
        this.appState = appState;
        this.keypadController = keypadController;
    }

    /**
     * 모드 전환
     */
    toggleMode(newMode) {
        this.appState.setState({ mode: newMode });

        // 현재 입력값으로 재계산
        const currentInput = this.appState.getState().input;
        if (currentInput) {
            this.keypadController.calculate(currentInput);
        }
    }
}
