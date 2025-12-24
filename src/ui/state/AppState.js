/**
 * AppState - 애플리케이션 상태 관리
 * 옵저버 패턴 구현
 */

class AppState {
    constructor() {
        this.state = {
            input: '',
            mode: 'inclusive', // 'inclusive' | 'exclusive'
            result: null
        };
        this.listeners = [];
    }

    /**
     * 현재 상태 반환
     */
    getState() {
        return { ...this.state };
    }

    /**
     * 상태 업데이트
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    /**
     * 상태 변경 구독
     */
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    /**
     * 모든 구독자에게 알림
     */
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}
