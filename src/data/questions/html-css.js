export const htmlCssQuestions = [
  // ─── HTML/CSS ───
  {
    id: 1,
    categoryId: 'html-css',
    title: '시맨틱 HTML이란 무엇이고, 왜 중요한가요?',
    difficulty: 'easy',
    tags: ['semantic', 'HTML', 'SEO', '접근성'],
    intent: '단순히 태그를 아는지가 아니라, 왜 시맨틱하게 작성해야 하는지 이유를 이해하고 있는지 확인합니다.',
    keywords: ['의미 있는 태그', '스크린 리더', 'SEO', '가독성', 'header/main/footer/article/section'],
    hint: '검색엔진과 보조기술(스크린 리더) 관점에서 생각해보세요.',
    answer: `시맨틱 HTML은 콘텐츠의 의미와 구조를 명확히 전달하는 태그를 사용하는 것입니다.

예를 들어 단순히 <div>로 감싸는 대신 <header>, <main>, <article>, <section>, <footer> 같은 태그를 사용합니다.

중요한 이유:
1. SEO: 검색엔진이 페이지 구조를 더 정확히 파악할 수 있습니다.
2. 접근성: 스크린 리더가 콘텐츠를 올바르게 읽어줍니다.
3. 유지보수성: 코드만 봐도 구조를 이해할 수 있어 협업에 유리합니다.`,
  },
  {
    id: 2,
    categoryId: 'html-css',
    title: 'CSS Box Model에 대해 설명해주세요.',
    difficulty: 'easy',
    tags: ['box model', 'CSS', 'layout'],
    intent: 'CSS 레이아웃의 기본 개념을 이해하고 있는지, 실무에서 발생하는 레이아웃 문제를 해결할 수 있는지 확인합니다.',
    keywords: ['content', 'padding', 'border', 'margin', 'box-sizing', 'border-box'],
    hint: 'box-sizing 속성이 왜 중요한지도 함께 설명해보세요.',
    answer: `Box Model은 HTML 요소가 화면에 차지하는 공간을 결정하는 개념입니다.

구성 요소 (안→밖):
1. content: 실제 내용이 들어가는 영역
2. padding: content와 border 사이의 내부 여백
3. border: 요소의 테두리
4. margin: 요소 바깥의 외부 여백

중요한 것은 box-sizing 속성입니다.
- content-box (기본값): width가 content 영역만 포함
- border-box: width에 padding과 border까지 포함

실무에서는 * { box-sizing: border-box }를 전역으로 설정해 레이아웃 계산을 직관적으로 만듭니다.`,
  },
  {
    id: 3,
    categoryId: 'html-css',
    title: 'Flexbox와 Grid의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['Flexbox', 'Grid', 'layout', 'CSS'],
    intent: '두 레이아웃 시스템을 단순히 아는 게 아니라, 상황에 따라 적절히 선택할 수 있는지 판단력을 봅니다.',
    keywords: ['1차원', '2차원', '축 기반', '행과 열', '사용 목적'],
    hint: '몇 개의 축을 다루는지 관점에서 생각해보세요.',
    answer: `Flexbox는 1차원 레이아웃, Grid는 2차원 레이아웃 시스템입니다.

Flexbox:
- 한 방향(행 또는 열)으로 아이템을 배치할 때 적합
- 네비게이션 바, 버튼 그룹처럼 한 줄 정렬에 강점
- 아이템 크기가 유동적일 때 유리

Grid:
- 행과 열을 동시에 제어하는 2차원 레이아웃
- 전체 페이지 레이아웃, 카드 그리드처럼 격자 구조에 적합
- 명시적인 영역 지정이 가능

선택 기준:
- 한 방향 정렬 → Flexbox
- 행/열 동시 제어 → Grid
- 실무에서는 두 가지를 혼용해서 사용합니다.`,
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