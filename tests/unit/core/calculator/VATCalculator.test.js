/**
 * VATCalculator 테스트
 * TDD: Red 단계 - 테스트 먼저 작성
 */

const path = require('path');
const projectRoot = path.join(__dirname, '../../../..');
const { VATCalculator } = require(path.join(projectRoot, 'src/core/calculator/VATCalculator.js'));

// 간단한 테스트 러너
class TestRunner {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, fn) {
        this.tests.push({ description, fn });
    }

    run() {
        console.log(`\n🧪 Testing: ${this.name}\n`);

        this.tests.forEach(({ description, fn }) => {
            try {
                fn();
                this.passed++;
                console.log(`✅ ${description}`);
            } catch (error) {
                this.failed++;
                console.log(`❌ ${description}`);
                console.log(`   Error: ${error.message}`);
            }
        });

        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed\n`);
        return this.failed === 0;
    }
}

// 간단한 assertion 함수
function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        },
        toBeCloseTo(expected, precision = 0) {
            if (Math.abs(actual - expected) > precision) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        }
    };
}

// 테스트 스위트
const runner = new TestRunner('VATCalculator');

// calculateInclusive() 테스트
runner.test('부가세 포함 계산 - 1,000,000원', () => {
    const calculator = new VATCalculator();
    const result = calculator.calculateInclusive(1000000);

    expect(result.supplyAmount).toBe(909091);
    expect(result.vatAmount).toBe(90909);
    expect(result.totalAmount).toBe(1000000);
    expect(result.mode).toBe('inclusive');
});

runner.test('부가세 포함 계산 - 경계값 0원', () => {
    const calculator = new VATCalculator();
    const result = calculator.calculateInclusive(0);

    expect(result.supplyAmount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
});

runner.test('부가세 포함 계산 - 큰 금액 100,000,000원', () => {
    const calculator = new VATCalculator();
    const result = calculator.calculateInclusive(100000000);

    expect(result.supplyAmount).toBe(90909091);
    expect(result.vatAmount).toBe(9090909);
    expect(result.totalAmount).toBe(100000000);
});

// calculateExclusive() 테스트
runner.test('부가세 별도 계산 - 5,000,000원', () => {
    const calculator = new VATCalculator();
    const result = calculator.calculateExclusive(5000000);

    expect(result.supplyAmount).toBe(5000000);
    expect(result.vatAmount).toBe(500000);
    expect(result.totalAmount).toBe(5500000);
    expect(result.mode).toBe('exclusive');
});

runner.test('부가세 별도 계산 - 경계값 0원', () => {
    const calculator = new VATCalculator();
    const result = calculator.calculateExclusive(0);

    expect(result.supplyAmount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
});

// 커스텀 VAT rate 테스트
runner.test('커스텀 VAT rate - 5%', () => {
    const calculator = new VATCalculator(0.05);
    const result = calculator.calculateInclusive(1050000);

    expect(result.supplyAmount).toBe(1000000);
    expect(result.vatAmount).toBe(50000);
});

// 테스트 실행
const success = runner.run();
process.exit(success ? 0 : 1);
