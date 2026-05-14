export const javascriptQuestions = [
  // ─── JavaScript ───
  {
    id: 4,
    categoryId: 'javascript',
    title: '클로저(Closure)란 무엇인가요?',
    difficulty: 'medium',
    tags: ['closure', 'scope', '함수'],
    intent: '자바스크립트의 핵심 개념 이해도를 확인하고, 실제 코드에서 클로저를 활용해본 경험이 있는지 봅니다.',
    keywords: ['렉시컬 환경', '외부 변수 참조', '함수 반환', '데이터 은닉', '상태 유지'],
    hint: '함수가 선언된 시점의 환경을 기억한다는 것에 집중해보세요.',
    answer: `클로저는 함수가 선언될 당시의 렉시컬 환경을 기억하는 함수입니다.

내부 함수가 외부 함수의 변수에 접근할 수 있으며,
외부 함수 실행이 끝난 후에도 그 변수에 접근이 가능합니다.

활용 사례:
1. 데이터 은닉: 외부에서 직접 접근할 수 없는 private 변수 구현
2. 상태 유지: 카운터처럼 호출 간 상태를 유지해야 할 때
3. 팩토리 함수: 설정값을 기억하는 함수를 동적으로 생성할 때

주의할 점은 클로저가 참조를 유지하기 때문에 메모리 누수가 발생할 수 있다는 점입니다.`,
  },
  {
    id: 5,
    categoryId: 'javascript',
    title: '이벤트 루프(Event Loop)란 무엇인가요?',
    difficulty: 'hard',
    tags: ['event loop', '비동기', 'call stack', 'task queue'],
    intent: '자바스크립트가 싱글 스레드임에도 비동기 처리가 가능한 원리를 이해하는지 확인합니다.',
    keywords: ['싱글 스레드', 'call stack', 'Web API', 'task queue', 'microtask queue', '논블로킹'],
    hint: 'call stack이 비었을 때 어떤 일이 일어나는지 생각해보세요.',
    answer: `이벤트 루프는 자바스크립트가 싱글 스레드임에도 비동기 처리를 가능하게 하는 메커니즘입니다.

동작 순서:
1. 함수 호출 시 call stack에 쌓임
2. setTimeout, fetch 같은 비동기 작업은 Web API로 위임
3. 완료된 콜백은 task queue(또는 microtask queue)에 대기
4. call stack이 비면 이벤트 루프가 queue에서 콜백을 꺼내 실행

우선순위:
- microtask queue (Promise .then, queueMicrotask)가 task queue보다 먼저 처리됩니다.

이 덕분에 자바스크립트는 블로킹 없이 비동기 작업을 처리할 수 있습니다.`,
  },
  {
    id: 6,
    categoryId: 'javascript',
    title: 'var, let, const의 차이점을 설명해주세요.',
    difficulty: 'easy',
    tags: ['var', 'let', 'const', 'hoisting', 'scope'],
    intent: '변수 선언 방식의 차이를 알고, 실무에서 올바른 선택을 할 수 있는지 확인합니다.',
    keywords: ['함수 스코프', '블록 스코프', '호이스팅', 'TDZ', '재선언', '재할당'],
    hint: '스코프 범위와 호이스팅 동작 방식의 차이에 집중해보세요.',
    answer: `세 가지 모두 변수 선언 키워드이지만 스코프와 동작 방식이 다릅니다.

var:
- 함수 스코프, 블록 스코프 무시
- 호이스팅 시 undefined로 초기화
- 재선언, 재할당 모두 가능 → 예측하기 어려운 버그 발생 가능

let:
- 블록 스코프
- 호이스팅되지만 TDZ(Temporal Dead Zone)로 초기화 전 접근 불가
- 재선언 불가, 재할당 가능

const:
- 블록 스코프
- 선언과 동시에 초기화 필요
- 재선언, 재할당 모두 불가 (단, 객체/배열 내부 변경은 가능)

실무에서는 기본적으로 const를 사용하고, 재할당이 필요한 경우에만 let을 씁니다.`,
  },
  {
    id: 7,
    categoryId: 'javascript',
    title: 'Promise와 async/await의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['Promise', 'async/await', '비동기'],
    intent: '비동기 처리 패턴을 이해하고 상황에 맞게 선택할 수 있는지 확인합니다.',
    keywords: ['콜백 지옥', '체이닝', '동기식 코드 스타일', 'try/catch', 'Promise.all'],
    hint: 'async/await가 Promise를 대체하는 게 아니라 감싸는 것임을 기억하세요.',
    answer: `async/await는 Promise를 기반으로 동작하는 문법적 설탕(syntactic sugar)입니다.

Promise:
- .then().catch() 체이닝 방식
- 여러 비동기 작업을 병렬 처리할 때 Promise.all 활용
- 체이닝이 길어지면 가독성이 떨어질 수 있음

async/await:
- 비동기 코드를 동기식처럼 읽기 쉽게 작성 가능
- try/catch로 에러 처리가 직관적
- 내부적으로는 Promise를 사용

선택 기준:
- 코드 가독성이 중요하다면 async/await
- 여러 Promise를 병렬로 처리할 때는 Promise.all과 함께 async/await 사용`,
  },
  {
    id: 24,
    categoryId: 'javascript',
    title: '프로토타입(Prototype)이란 무엇인가요?',
    difficulty: 'hard',
    tags: ['prototype', '상속', 'JavaScript'],
    intent: '자바스크립트의 객체 지향 방식을 이해하고 있는지, 클래스와의 관계를 설명할 수 있는지 확인합니다.',
    keywords: ['프로토타입 체인', '__proto__', 'prototype 객체', '상속', 'Object.create'],
    hint: '자바스크립트의 상속이 클래스 기반 언어와 어떻게 다른지 생각해보세요.',
    answer: `프로토타입은 자바스크립트에서 객체 간 상속을 구현하는 메커니즘입니다.

핵심 개념:
- 모든 객체는 [[Prototype]] 내부 슬롯을 가짐
- 객체의 프로퍼티나 메서드를 찾을 때 없으면 프로토타입 체인을 따라 상위로 탐색
- 최상위는 Object.prototype, 그 다음은 null

프로토타입 체인:
- 인스턴스 → 생성자.prototype → Object.prototype → null

클래스와의 관계:
- ES6 class는 프로토타입 기반 상속의 문법적 설탕(syntactic sugar)
- 내부적으로는 여전히 프로토타입으로 동작

활용:
- 메서드를 prototype에 정의하면 인스턴스가 공유 → 메모리 효율적`,
  },
  {
    id: 25,
    categoryId: 'javascript',
    title: 'this 키워드는 어떻게 결정되나요?',
    difficulty: 'hard',
    tags: ['this', 'JavaScript', '바인딩'],
    intent: 'this 바인딩 규칙을 이해하고 실무에서 발생하는 this 관련 버그를 해결할 수 있는지 확인합니다.',
    keywords: ['암묵적 바인딩', '명시적 바인딩', 'new 바인딩', '화살표 함수', 'call/apply/bind'],
    hint: 'this는 선언 시점이 아니라 호출 시점에 결정된다는 점을 기억하세요.',
    answer: `this는 함수가 호출되는 방식에 따라 동적으로 결정됩니다.

1. 기본 바인딩: 일반 함수 호출 → 전역 객체 (strict mode에서는 undefined)
2. 암묵적 바인딩: 메서드 호출 → 호출한 객체
3. 명시적 바인딩: call, apply, bind → 지정한 객체
4. new 바인딩: 생성자 함수 호출 → 새로 생성된 인스턴스
5. 화살표 함수: 상위 스코프의 this를 그대로 사용 (바인딩 없음)

우선순위: new > 명시적 > 암묵적 > 기본

실무 주의사항:
- 콜백 함수로 메서드를 전달하면 암묵적 바인딩이 사라짐
- 이 경우 화살표 함수 또는 bind()로 해결`,
  },
  {
    id: 26,
    categoryId: 'javascript',
    title: '얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['shallow copy', 'deep copy', '참조', 'JavaScript'],
    intent: '참조 타입의 동작 방식을 이해하고 실무에서 불변성을 유지하는 방법을 알고 있는지 확인합니다.',
    keywords: ['참조 타입', '값 타입', '스프레드 연산자', 'JSON', 'structuredClone'],
    hint: '중첩된 객체가 있을 때 어떻게 동작하는지 생각해보세요.',
    answer: `얕은 복사는 객체의 최상위 프로퍼티만 복사하고, 중첩된 객체는 참조를 공유합니다.
깊은 복사는 중첩된 객체까지 완전히 새로운 객체로 복사합니다.

얕은 복사 방법:
- Object.assign({}, obj)
- 스프레드 연산자 { ...obj }
- Array.from(), [...arr]

깊은 복사 방법:
- JSON.parse(JSON.stringify(obj)) — 함수, undefined, 순환 참조 불가
- structuredClone(obj) — 최신 브라우저 지원, 권장
- lodash의 _.cloneDeep()

React에서의 활용:
- 상태 업데이트 시 불변성 유지를 위해 얕은 복사를 주로 사용
- 중첩이 깊은 경우 immer 라이브러리 활용`,
  },
  {
    id: 27,
    categoryId: 'javascript',
    title: '실행 컨텍스트(Execution Context)란 무엇인가요?',
    difficulty: 'hard',
    tags: ['execution context', 'scope', 'hoisting', 'JavaScript'],
    intent: '자바스크립트 엔진이 코드를 실행하는 내부 동작 원리를 이해하고 있는지 확인합니다.',
    keywords: ['전역 실행 컨텍스트', '함수 실행 컨텍스트', '콜 스택', '렉시컬 환경', '호이스팅'],
    hint: '코드 실행 전에 무슨 일이 일어나는지 생각해보세요.',
    answer: `실행 컨텍스트는 자바스크립트 코드가 실행되는 환경을 추상화한 개념입니다.

구성 요소:
1. 변수 환경: var 선언, 함수 선언 저장
2. 렉시컬 환경: let, const 선언, 외부 환경 참조
3. this 바인딩

종류:
- 전역 실행 컨텍스트: 코드 실행 시 최초 생성
- 함수 실행 컨텍스트: 함수 호출 시마다 생성
- eval 실행 컨텍스트

동작 방식:
1. 생성 단계: 변수/함수 선언 수집 (호이스팅 발생)
2. 실행 단계: 코드 순차적 실행

콜 스택:
- 실행 컨텍스트가 LIFO 방식으로 관리됨
- 함수 호출 시 push, 종료 시 pop`,
  },
  {
    id: 28,
    categoryId: 'javascript',
    title: '모듈 시스템(CommonJS vs ESM)에 대해 설명해주세요.',
    difficulty: 'medium',
    tags: ['CommonJS', 'ESM', '모듈', 'JavaScript'],
    intent: '자바스크립트 모듈 시스템의 차이를 이해하고 실무에서 올바르게 사용할 수 있는지 확인합니다.',
    keywords: ['require', 'module.exports', 'import', 'export', '정적 분석', 'Tree shaking'],
    hint: '정적 vs 동적 로딩의 차이가 어떤 이점을 만드는지 생각해보세요.',
    answer: `CommonJS와 ESM(ES Modules)은 자바스크립트의 두 가지 모듈 시스템입니다.

CommonJS:
- Node.js에서 기본으로 사용
- require(), module.exports 문법
- 동적 로딩 (런타임에 모듈 결정)
- 동기적으로 동작

ESM:
- 브라우저와 최신 Node.js 지원
- import, export 문법
- 정적 분석 가능 (빌드 타임에 의존성 파악)
- 비동기적으로 동작
- Tree shaking 가능

실무:
- 프론트엔드: ESM (Vite, Webpack 등 번들러 환경)
- Node.js 백엔드: CommonJS 또는 ESM (.mjs 확장자)
- 현재는 ESM이 표준으로 자리잡는 추세`,
  },
  {
    id: 29,
    categoryId: 'javascript',
    title: '제너레이터(Generator)와 이터레이터(Iterator)에 대해 설명해주세요.',
    difficulty: 'hard',
    tags: ['generator', 'iterator', 'JavaScript', '비동기'],
    intent: '고급 자바스크립트 개념을 이해하고 있는지, 실용적인 활용 사례를 알고 있는지 확인합니다.',
    keywords: ['function*', 'yield', 'next()', 'iterable', '지연 평가'],
    hint: '제너레이터가 일반 함수와 다른 핵심 차이가 무엇인지 생각해보세요.',
    answer: `이터레이터는 next() 메서드를 통해 순차적으로 값을 반환하는 객체입니다.
제너레이터는 이터레이터를 쉽게 만들 수 있는 특별한 함수입니다.

제너레이터 특징:
- function* 키워드로 선언
- yield로 값을 하나씩 반환하고 실행을 일시 중단
- next() 호출 시 다음 yield까지 실행

활용 사례:
1. 지연 평가: 필요한 시점에만 값 생성 (무한 시퀀스 등)
2. 비동기 제어 흐름: async/await 이전에 활용
3. 상태 머신 구현

이터러블 프로토콜:
- [Symbol.iterator]() 메서드를 구현한 객체
- for...of, 스프레드 연산자 등에서 활용 가능`,
  },
]