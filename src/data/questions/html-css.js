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
]