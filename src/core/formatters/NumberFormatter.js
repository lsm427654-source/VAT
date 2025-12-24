/**
 * NumberFormatter - 숫자 포맷팅
 * TDD: Green 단계 - 구현
 */

class NumberFormatter {
    /**
     * 숫자를 천 단위 콤마로 포맷팅
     * @param {number} number - 포맷팅할 숫자
     * @returns {string} 포맷팅된 문자열 (예: "1,000,000")
     */
    format(number) {
        return Math.round(number).toLocaleString('ko-KR');
    }
}

module.exports = { NumberFormatter };
