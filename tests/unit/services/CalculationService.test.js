/**
 * CalculationService 테스트
 * TDD: Red 단계 - 테스트 먼저 작성
 */

const path = require('path');
const projectRoot = path.join(__dirname, '../../..');
const { CalculationService } = require(path.join(projectRoot, 'src/services/CalculationService.js'));
const { VATCalculator } = require(path.join(projectRoot, 'src/core/calculator/VATCalculator.js'));
const { NumberFormatter } = require(path.join(projectRoot, 'src/core/formatters/NumberFormatter.js'));
const { InputValidator } = require(path.join(projectRoot, 'src/core/validators/InputValidator.js'));

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
        toHaveProperty(property) {
            if (!(property in actual)) {
                throw new Error(`Expected to have property "${property}"`);
            }
        }
    };
}

// 테스트 스위트
const runner = new TestRunner('CalculationService');

// 의존성 주입 테스트
runner.test('의존성 주입 - 생성자에 모듈 주입', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();

    const service = new CalculationService(calculator, formatter, validator);

    expect(service.calculator).toBe(calculator);
    expect(service.formatter).toBe(formatter);
    expect(service.validator).toBe(validator);
});

// 부가세 포함 계산 + 포맷팅
runner.test('부가세 포함 계산 + 포맷팅 - "1000000"', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();
    const service = new CalculationService(calculator, formatter, validator);

    const result = service.calculate('1000000', 'inclusive');

    expect(result.supplyAmount).toBe(909091);
    expect(result.vatAmount).toBe(90909);
    expect(result.totalAmount).toBe(1000000);
    expect(result.formatted.supply).toBe('909,091');
    expect(result.formatted.vat).toBe('90,909');
    expect(result.formatted.total).toBe('1,000,000');
});

// 부가세 별도 계산 + 포맷팅
runner.test('부가세 별도 계산 + 포맷팅 - "5000000"', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();
    const service = new CalculationService(calculator, formatter, validator);

    const result = service.calculate('5000000', 'exclusive');

    expect(result.supplyAmount).toBe(5000000);
    expect(result.vatAmount).toBe(500000);
    expect(result.totalAmount).toBe(5500000);
    expect(result.formatted.supply).toBe('5,000,000');
    expect(result.formatted.vat).toBe('500,000');
    expect(result.formatted.total).toBe('5,500,000');
});

// 잘못된 입력 처리
runner.test('잘못된 입력 처리 - 빈 문자열', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();
    const service = new CalculationService(calculator, formatter, validator);

    const result = service.calculate('', 'inclusive');

    expect(result.supplyAmount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
});

runner.test('잘못된 입력 처리 - 문자 포함', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();
    const service = new CalculationService(calculator, formatter, validator);

    const result = service.calculate('abc', 'inclusive');

    expect(result.supplyAmount).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalAmount).toBe(0);
});

// 0 입력 처리
runner.test('0 입력 처리', () => {
    const calculator = new VATCalculator();
    const formatter = new NumberFormatter();
    const validator = new InputValidator();
    const service = new CalculationService(calculator, formatter, validator);

    const result = service.calculate('0', 'inclusive');

    expect(result.supplyAmount).toBe(0);
    expect(result.formatted.supply).toBe('0');
});

// 테스트 실행
const success = runner.run();
process.exit(success ? 0 : 1);
