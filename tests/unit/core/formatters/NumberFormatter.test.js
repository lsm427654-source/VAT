/**
 * NumberFormatter 테스트
 * TDD: Red 단계 - 테스트 먼저 작성
 */

const path = require('path');
const projectRoot = path.join(__dirname, '../../../..');
const { NumberFormatter } = require(path.join(projectRoot, 'src/core/formatters/NumberFormatter.js'));

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
                throw new Error(`Expected "${expected}", but got "${actual}"`);
            }
        }
    };
}

// 테스트 스위트
const runner = new TestRunner('NumberFormatter');

// 천 단위 콤마 테스트
runner.test('천 단위 콤마 - 1000000 → "1,000,000"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(1000000);

    expect(result).toBe('1,000,000');
});

runner.test('천 단위 콤마 - 909091 → "909,091"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(909091);

    expect(result).toBe('909,091');
});

runner.test('천 단위 콤마 - 5500000 → "5,500,000"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(5500000);

    expect(result).toBe('5,500,000');
});

// 0 처리 테스트
runner.test('0 처리 - 0 → "0"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(0);

    expect(result).toBe('0');
});

// 소수점 반올림 테스트
runner.test('소수점 반올림 - 1234.56 → "1,235"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(1234.56);

    expect(result).toBe('1,235');
});

runner.test('소수점 반올림 - 999.4 → "999"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(999.4);

    expect(result).toBe('999');
});

// 음수 처리 테스트 (선택사항)
runner.test('음수 처리 - -1000 → "-1,000"', () => {
    const formatter = new NumberFormatter();
    const result = formatter.format(-1000);

    expect(result).toBe('-1,000');
});

// 테스트 실행
const success = runner.run();
process.exit(success ? 0 : 1);
