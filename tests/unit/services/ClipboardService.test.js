/**
 * ClipboardService 테스트
 * TDD: Red 단계 - 테스트 먼저 작성
 */

const path = require('path');
const projectRoot = path.join(__dirname, '../../..');
const { ClipboardService } = require(path.join(projectRoot, 'src/services/ClipboardService.js'));

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
        },
        toContain(substring) {
            if (!actual.includes(substring)) {
                throw new Error(`Expected to contain "${substring}"`);
            }
        }
    };
}

// 테스트 스위트
const runner = new TestRunner('ClipboardService');

// formatResult() 테스트
runner.test('formatResult - 부가세 포함 모드', () => {
    const service = new ClipboardService();
    const result = {
        mode: 'inclusive',
        formatted: {
            input: '1,000,000',
            supply: '909,091',
            vat: '90,909',
            total: '1,000,000'
        }
    };

    const formatted = service.formatResult(result);

    expect(formatted).toContain('[부가세 포함]');
    expect(formatted).toContain('입력 금액: 1,000,000원');
    expect(formatted).toContain('공급가액: 909,091원');
    expect(formatted).toContain('부가세(10%): 90,909원');
    expect(formatted).toContain('합계금액: 1,000,000원');
});

runner.test('formatResult - 부가세 별도 모드', () => {
    const service = new ClipboardService();
    const result = {
        mode: 'exclusive',
        formatted: {
            input: '5,000,000',
            supply: '5,000,000',
            vat: '500,000',
            total: '5,500,000'
        }
    };

    const formatted = service.formatResult(result);

    expect(formatted).toContain('[부가세 별도]');
    expect(formatted).toContain('입력 금액: 5,000,000원');
    expect(formatted).toContain('공급가액: 5,000,000원');
    expect(formatted).toContain('부가세(10%): 500,000원');
    expect(formatted).toContain('합계금액: 5,500,000원');
});

runner.test('formatResult - 0원 처리', () => {
    const service = new ClipboardService();
    const result = {
        mode: 'inclusive',
        formatted: {
            input: '0',
            supply: '0',
            vat: '0',
            total: '0'
        }
    };

    const formatted = service.formatResult(result);

    expect(formatted).toContain('입력 금액: 0원');
    expect(formatted).toContain('공급가액: 0원');
});

// 테스트 실행
const success = runner.run();
process.exit(success ? 0 : 1);
