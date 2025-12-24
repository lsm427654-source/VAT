/**
 * CalculationService - 계산 서비스
 * TDD: Green 단계 - 구현
 * 
 * 역할: 계산기, 포맷터, 검증기를 조합하여 비즈니스 로직 조율
 * SOLID: DIP (의존성 역전 원칙) - 구체 클래스가 아닌 인터페이스에 의존
 */

class CalculationService {
    /**
     * 의존성 주입 (Dependency Injection)
     * @param {VATCalculator} calculator - 계산 엔진
     * @param {NumberFormatter} formatter - 숫자 포맷터
     * @param {InputValidator} validator - 입력 검증기
     */
    constructor(calculator, formatter, validator) {
        this.calculator = calculator;
        this.formatter = formatter;
        this.validator = validator;
    }

    /**
     * 계산 및 포맷팅된 결과 반환
     * @param {string} input - 입력값
     * @param {string} mode - 계산 모드 ('inclusive' | 'exclusive')
     * @returns {Object} 계산 결과 + 포맷팅된 결과
     */
    calculate(input, mode) {
        // 1. 검증
        if (!this.validator.isValid(input)) {
            return this.getDefaultResult();
        }

        // 2. 계산
        const amount = parseInt(input);
        const result = mode === 'inclusive'
            ? this.calculator.calculateInclusive(amount)
            : this.calculator.calculateExclusive(amount);

        // 3. 포맷팅
        return {
            ...result,
            formatted: {
                input: this.formatter.format(amount),
                supply: this.formatter.format(result.supplyAmount),
                vat: this.formatter.format(result.vatAmount),
                total: this.formatter.format(result.totalAmount)
            }
        };
    }

    /**
     * 기본 결과 반환 (오류 시)
     * @returns {Object} 0으로 초기화된 결과
     */
    getDefaultResult() {
        return {
            supplyAmount: 0,
            vatAmount: 0,
            totalAmount: 0,
            mode: 'inclusive',
            formatted: {
                input: '0',
                supply: '0',
                vat: '0',
                total: '0'
            }
        };
    }
}

module.exports = { CalculationService };
