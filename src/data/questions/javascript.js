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
]