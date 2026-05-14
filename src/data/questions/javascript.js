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
    id: 17,
    categoryId: 'html-css',
    title: 'CSS position 속성의 종류와 차이점을 설명해주세요.',
    difficulty: 'easy',
    tags: ['position', 'CSS', 'layout'],
    intent: 'CSS 레이아웃의 기본 개념을 이해하고 있는지, 실무에서 position을 적절히 활용할 수 있는지 확인합니다.',
    keywords: ['static', 'relative', 'absolute', 'fixed', 'sticky', '기준 요소'],
    hint: '각 값이 어떤 기준으로 위치를 잡는지 생각해보세요.',
    answer: `position 속성은 요소의 배치 방식을 결정합니다.

static (기본값):
- 문서 흐름에 따라 배치
- top, left 등의 속성 적용 안 됨

relative:
- 문서 흐름 유지, 자기 자신을 기준으로 이동
- 다른 요소에 영향을 주지 않음

absolute:
- 문서 흐름에서 제거
- position이 static이 아닌 가장 가까운 조상 요소를 기준으로 배치

fixed:
- 뷰포트를 기준으로 고정
- 스크롤해도 위치 유지

sticky:
- 스크롤 위치에 따라 relative와 fixed를 전환
- 특정 임계값에 도달하면 고정됨`,
  },
  {
    id: 18,
    categoryId: 'html-css',
    title: 'CSS 애니메이션과 JavaScript 애니메이션의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['animation', 'CSS', 'JavaScript', '성능'],
    intent: '성능 관점에서 애니메이션 구현 방식을 선택할 수 있는지 확인합니다.',
    keywords: ['GPU 가속', 'transform', 'opacity', 'requestAnimationFrame', 'main thread', 'compositor thread'],
    hint: '브라우저 렌더링 파이프라인과 연결해서 생각해보세요.',
    answer: `CSS 애니메이션:
- transform, opacity 기반 애니메이션은 compositor thread에서 처리
- main thread 부하 없이 GPU 가속 활용 가능
- 성능이 좋고 코드가 단순함
- 복잡한 제어(중간 멈춤, 동적 값 변경)가 어려움

JavaScript 애니메이션:
- requestAnimationFrame을 활용한 프레임 단위 제어
- 동적인 값, 복잡한 시퀀스 제어에 유리
- main thread에서 실행되어 성능 부하 가능성 있음

선택 기준:
- 단순한 전환 효과 → CSS 애니메이션
- 복잡한 인터랙션, 동적 제어 → JavaScript (requestAnimationFrame)
- 복잡한 시퀀스 → GSAP 같은 라이브러리 활용`,
  },
  {
    id: 19,
    categoryId: 'html-css',
    title: 'CSS 선택자 우선순위(Specificity)에 대해 설명해주세요.',
    difficulty: 'medium',
    tags: ['specificity', 'CSS', '선택자'],
    intent: 'CSS 충돌 상황에서 어떤 스타일이 적용되는지 이해하고 있는지 확인합니다.',
    keywords: ['인라인 스타일', 'ID 선택자', '클래스 선택자', '태그 선택자', '!important'],
    hint: '우선순위를 숫자로 계산하는 방법을 생각해보세요.',
    answer: `CSS 우선순위는 선택자의 종류에 따라 결정됩니다.

우선순위 (높은 순):
1. !important
2. 인라인 스타일 (style="...")
3. ID 선택자 (#id)
4. 클래스, 속성, 가상 클래스 선택자 (.class, [attr], :hover)
5. 태그, 가상 요소 선택자 (div, ::before)
6. 전체 선택자 (*)

계산 방식:
- (인라인, ID, 클래스, 태그) 순으로 (0,0,0,0) 형태로 계산
- 예: #nav .item span → (0,1,1,1)

주의할 점:
- !important는 남발하면 유지보수가 어려워짐
- 동일 우선순위면 나중에 선언된 스타일이 적용됨`,
  },
  {
    id: 20,
    categoryId: 'html-css',
    title: 'rem과 em의 차이점은 무엇인가요?',
    difficulty: 'easy',
    tags: ['rem', 'em', 'CSS', '단위'],
    intent: '상대 단위를 이해하고 실무에서 적절히 활용할 수 있는지 확인합니다.',
    keywords: ['루트 요소', '부모 요소', '폰트 크기', '반응형', '접근성'],
    hint: '기준이 되는 요소가 무엇인지 생각해보세요.',
    answer: `rem과 em은 모두 상대적인 크기 단위입니다.

em:
- 부모 요소의 font-size를 기준으로 계산
- 중첩될수록 크기가 복잡해질 수 있음
- 컴포넌트 내부의 상대적 크기 조절에 유용

rem (root em):
- 루트 요소(html)의 font-size를 기준으로 계산
- 기본값은 16px
- 일관된 크기 관리가 가능해 유지보수에 유리

실무 활용:
- 전체 레이아웃, 폰트 크기 → rem
- 특정 컴포넌트 내부 → em
- 접근성 측면에서 px보다 rem 권장 (사용자 브라우저 설정 반영)`,
  },
  {
    id: 21,
    categoryId: 'html-css',
    title: 'CSS 변수(Custom Properties)란 무엇이고 어떻게 활용하나요?',
    difficulty: 'easy',
    tags: ['CSS 변수', 'Custom Properties', '유지보수'],
    intent: '현대적인 CSS 작성 방식을 알고 있는지, 유지보수 관점에서 활용할 수 있는지 확인합니다.',
    keywords: ['--변수명', 'var()', ':root', '재사용성', '동적 변경'],
    hint: 'JavaScript와 연동해서 동적으로 변경할 수 있다는 점도 생각해보세요.',
    answer: `CSS 변수(Custom Properties)는 CSS에서 값을 변수로 정의하고 재사용할 수 있는 기능입니다.

선언과 사용:
- :root { --primary-color: #F97316; }
- color: var(--primary-color);

장점:
- 디자인 토큰 관리에 효과적 (색상, 간격, 폰트 등)
- 한 곳에서 수정하면 전체 반영
- JavaScript로 동적 변경 가능
- 미디어 쿼리 안에서 재정의 가능

Sass 변수와의 차이:
- CSS 변수는 런타임에 동작 (동적 변경 가능)
- Sass 변수는 컴파일 타임에 처리 (정적)

실무에서는 다크모드, 테마 변경 등에 특히 유용합니다.`,
  },
  {
    id: 22,
    categoryId: 'html-css',
    title: '반응형 웹 디자인이란 무엇이고, 어떻게 구현하나요?',
    difficulty: 'easy',
    tags: ['반응형', '미디어 쿼리', 'viewport', 'CSS'],
    intent: '다양한 디바이스 환경에 대응하는 방법을 알고 있는지 확인합니다.',
    keywords: ['미디어 쿼리', 'viewport', 'fluid layout', 'mobile-first', 'breakpoint'],
    hint: 'mobile-first 접근 방식이 왜 더 효율적인지 생각해보세요.',
    answer: `반응형 웹 디자인은 다양한 화면 크기에서 최적의 사용자 경험을 제공하는 디자인 방식입니다.

핵심 기술:
1. 미디어 쿼리: 화면 크기에 따라 다른 스타일 적용
2. 유동적 레이아웃: % 단위, flexbox, grid 활용
3. 유동적 이미지: max-width: 100% 설정
4. viewport 메타 태그: <meta name="viewport" content="width=device-width">

Mobile-First 접근:
- 모바일 스타일을 기본으로 작성
- min-width 미디어 쿼리로 점진적 확장
- 성능 측면에서 유리 (모바일에서 불필요한 CSS 로드 방지)

주요 breakpoint:
- 모바일: ~768px
- 태블릿: 768px~1024px
- 데스크탑: 1024px~`,
  },
  {
    id: 23,
    categoryId: 'html-css',
    title: 'CSS에서 margin 겹침(Margin Collapsing) 현상이란 무엇인가요?',
    difficulty: 'medium',
    tags: ['margin', 'CSS', 'layout'],
    intent: 'CSS 레이아웃에서 자주 발생하는 예상치 못한 동작을 이해하고 있는지 확인합니다.',
    keywords: ['수직 마진', '인접 요소', '부모-자식', 'BFC', 'margin collapse'],
    hint: '수평 방향으로는 왜 발생하지 않는지 생각해보세요.',
    answer: `Margin Collapsing은 수직 방향의 margin이 겹쳐서 더 큰 값 하나로 합쳐지는 현상입니다.

발생하는 경우:
1. 인접한 형제 요소: 위 요소의 margin-bottom과 아래 요소의 margin-top이 겹침
2. 부모-자식 요소: 부모에 border/padding이 없으면 자식의 margin이 부모 밖으로 빠져나옴
3. 빈 블록 요소: 자기 자신의 margin-top과 margin-bottom이 겹침

해결 방법:
- 부모에 overflow: hidden 또는 padding, border 추가
- BFC(Block Formatting Context) 생성
- flexbox, grid 컨테이너에서는 발생하지 않음

수평 방향으로는 발생하지 않습니다.`,
  },
]