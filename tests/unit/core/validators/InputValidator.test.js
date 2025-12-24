/**
 * InputValidator 테스트
 * TDD: Red 단계 - 테스트 먼저 작성
 */

const path = require('path');
const projectRoot = path.join(__dirname, '../../../..');
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
        }
    };
}

// 테스트 스위트
const runner = new TestRunner('InputValidator');

// isValid() 테스트
runner.test('유효한 입력 - "1000000" → true', () => {
    const validator = new InputValidator();
    const result = validator.isValid('1000000');

    expect(result).toBe(true);
});

runner.test('유효한 입력 - "0" → true', () => {
    const validator = new InputValidator();
    const result = validator.isValid('0');

    expect(result).toBe(true);
});

runner.test('빈 문자열 - "" → false', () => {
    const validator = new InputValidator();
    const result = validator.isValid('');

    expect(result).toBe(false);
});

runner.test('최대 자릿수 초과 - 13자리 → false', () => {
    const validator = new InputValidator(12);
    const result = validator.isValid('1234567890123');

    expect(result).toBe(false);
});

runner.test('최대 자릿수 정확히 - 12자리 → true', () => {
    const validator = new InputValidator(12);
    const result = validator.isValid('123456789012');

    expect(result).toBe(true);
});

runner.test('숫자가 아닌 문자 - "abc" → false', () => {
    const validator = new InputValidator();
    const result = validator.isValid('abc');

    expect(result).toBe(false);
});

runner.test('숫자 + 문자 혼합 - "123abc" → false', () => {
    const validator = new InputValidator();
    const result = validator.isValid('123abc');

    expect(result).toBe(false);
});

// sanitize() 테스트
runner.test('sanitize - "123abc456" → "123456"', () => {
    const validator = new InputValidator();
    const result = validator.sanitize('123abc456');

    expect(result).toBe('123456');
});

runner.test('sanitize - "abc" → ""', () => {
    const validator = new InputValidator();
    const result = validator.sanitize('abc');

    expect(result).toBe('');
});

runner.test('sanitize - "1,000,000" → "1000000"', () => {
    const validator = new InputValidator();
    const result = validator.sanitize('1,000,000');

    expect(result).toBe('1000000');
});

// 테스트 실행
const success = runner.run();
process.exit(success ? 0 : 1);
