/**
 * VAT Calculator - 부가세 계산 엔진
 * TDD: Green 단계 - 구현
 */

class VATCalculator {
    /**
     * @param {number} vatRate - 부가세율 (기본값: 0.1 = 10%)
     */
    constructor(vatRate = 0.1) {
        this.vatRate = vatRate;
    }

    /**
     * 부가세 포함 금액에서 역산
     * @param {number} totalAmount - 총 금액 (부가세 포함)
     * @returns {Object} { supplyAmount, vatAmount, totalAmount, mode }
     */
    calculateInclusive(totalAmount) {
        const supplyAmount = Math.round(totalAmount / (1 + this.vatRate));
        const vatAmount = totalAmount - supplyAmount;

        return {
            supplyAmount,
            vatAmount,
            totalAmount,
            mode: 'inclusive'
        };
    }

    /**
     * 공급가액에서 부가세 계산
     * @param {number} supplyAmount - 공급가액 (부가세 미포함)
     * @returns {Object} { supplyAmount, vatAmount, totalAmount, mode }
     */
    calculateExclusive(supplyAmount) {
        const vatAmount = Math.round(supplyAmount * this.vatRate);
        const totalAmount = supplyAmount + vatAmount;

        return {
            supplyAmount,
            vatAmount,
            totalAmount,
            mode: 'exclusive'
        };
    }
}

module.exports = { VATCalculator };
