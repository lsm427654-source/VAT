/**
 * KeypadController - 키패드 입력 처리
 */

class KeypadController {
    constructor(appState, calculationService) {
        this.appState = appState;
        this.calculationService = calculationService;
    }

    /**
     * 숫자 입력 처리
     */
    handleNumberInput(digit) {
        const currentInput = this.appState.getState().input;
        const newInput = currentInput + digit;

        this.appState.setState({ input: newInput });
        this.calculate(newInput);
    }

    /**
     * 백스페이스 처리
     */
    handleBackspace() {
        const currentInput = this.appState.getState().input;
        const newInput = currentInput.slice(0, -1);

        this.appState.setState({ input: newInput });
        this.calculate(newInput);
    }

    /**
     * 초기화
     */
    handleReset() {
        this.appState.setState({
            input: '',
            result: null
        });
    }

    /**
     * 계산 실행
     */
    calculate(input) {
        const mode = this.appState.getState().mode;
        const result = this.calculationService.calculate(input || '0', mode);
        this.appState.setState({ result });
    }
}
