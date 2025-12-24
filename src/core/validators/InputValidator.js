/**
 * InputValidator - 입력 검증
 * TDD: Green 단계 - 구현
 */

class InputValidator {
    /**
     * @param {number} maxDigits - 최대 입력 자릿수 (기본값: 12)
     */
    constructor(maxDigits = 12) {
        this.maxDigits = maxDigits;
    }

    /**
     * 입력값이 유효한지 검증
     * @param {string} input - 검증할 입력값
     * @returns {boolean} 유효 여부
     */
    isValid(input) {
        // 빈 문자열 체크
        if (!input || input.length === 0) {
            return false;
        }

        // 숫자만 포함하는지 체크
        if (!/^\d+$/.test(input)) {
            return false;
        }

        // 최대 자릿수 체크
        if (input.length > this.maxDigits) {
            return false;
        }

        return true;
    }

    /**
     * 입력값에서 숫자만 추출
     * @param {string} input - 정제할 입력값
     * @returns {string} 숫자만 포함된 문자열
     */
    sanitize(input) {
        // 숫자가 아닌 모든 문자 제거
        return input.replace(/\D/g, '');
    }
}

module.exports = { InputValidator };
