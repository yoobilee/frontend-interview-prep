export const performanceQuestions = [
  // ─── 성능 최적화 ───
  {
    id: 15,
    categoryId: 'performance',
    title: '웹 성능 최적화를 위해 어떤 방법들을 사용할 수 있나요?',
    difficulty: 'hard',
    tags: ['성능', '최적화', 'lazy loading', 'code splitting'],
    intent: '성능 문제를 인식하고 실제로 개선해본 경험이 있는지, 다양한 최적화 기법을 알고 있는지 확인합니다.',
    keywords: ['lazy loading', 'code splitting', '이미지 최적화', 'caching', 'tree shaking', 'bundle size'],
    hint: '네트워크, 렌더링, 자바스크립트 실행 각 단계별로 나눠서 생각해보세요.',
    answer: `웹 성능 최적화는 네트워크, 렌더링, 코드 실행 측면에서 접근할 수 있습니다.

네트워크:
- 이미지 최적화 (WebP 포맷, 적절한 크기)
- lazy loading으로 필요한 시점에만 리소스 로드
- HTTP 캐싱 활용
- CDN 사용

JavaScript/번들:
- Code splitting으로 초기 번들 크기 감소
- Tree shaking으로 사용하지 않는 코드 제거
- 동적 import()로 필요한 시점에 로드

렌더링:
- React.memo, useMemo, useCallback으로 불필요한 리렌더링 방지
- transform/opacity 사용으로 reflow 최소화
- 이미지에 width/height 명시해 레이아웃 시프트 방지

측정이 먼저:
- Lighthouse, Chrome DevTools로 병목 지점 파악 후 최적화하는 것이 중요합니다.`,
  },
  {
    id: 16,
    categoryId: 'performance',
    title: '브라우저 캐싱 전략에 대해 설명해주세요.',
    difficulty: 'hard',
    tags: ['캐싱', 'HTTP', 'Cache-Control', 'ETag'],
    intent: '캐싱의 원리를 이해하고 실무에서 적절한 전략을 선택할 수 있는지 확인합니다.',
    keywords: ['Cache-Control', 'ETag', 'max-age', 'no-cache', 'no-store', '조건부 요청'],
    hint: '캐시를 아예 안 쓰는 것과, 캐시를 쓰되 검증하는 것의 차이를 생각해보세요.',
    answer: `브라우저 캐싱은 이전에 받은 리소스를 재사용해 네트워크 요청을 줄이는 전략입니다.

주요 헤더:
- Cache-Control: max-age=3600 → 1시간 동안 캐시 유효
- no-cache: 캐시하되, 사용 전 서버에 유효성 확인
- no-store: 캐시 저장 자체를 하지 않음

유효성 검증:
- ETag: 리소스의 고유 식별자, 변경 여부 확인에 사용
- Last-Modified: 마지막 수정 시간 기반 검증
- 변경이 없으면 서버는 304 Not Modified 응답

실무 전략:
- HTML: no-cache (항상 최신 버전 유지)
- JS/CSS: max-age 길게 + 파일명에 해시 포함 (변경 시 새 URL)
- 이미지: max-age 길게 설정`,
  },
  {
    id: 51,
    categoryId: 'performance',
    title: 'Critical Rendering Path란 무엇인가요?',
    difficulty: 'hard',
    tags: ['Critical Rendering Path', '렌더링', '성능', '브라우저'],
    intent: '브라우저 렌더링 성능을 최적화하기 위한 핵심 개념을 이해하고 있는지 확인합니다.',
    keywords: ['DOM', 'CSSOM', 'Render Tree', '렌더링 차단', '최적화'],
    hint: '브라우저가 첫 화면을 그리기까지 반드시 거쳐야 하는 단계들을 생각해보세요.',
    answer: `Critical Rendering Path는 브라우저가 HTML을 받아 화면에 픽셀을 그리기까지의 핵심 단계입니다.

단계:
1. HTML 파싱 → DOM 생성
2. CSS 파싱 → CSSOM 생성
3. DOM + CSSOM → Render Tree 생성
4. Layout: 요소의 크기와 위치 계산
5. Paint: 픽셀로 그리기

렌더링 차단 리소스:
- CSS: CSSOM 생성 전까지 렌더링 차단
- JavaScript: DOM 파싱 차단 (defer, async로 해결)

최적화 방법:
- 중요한 CSS는 인라인으로 (Critical CSS)
- script 태그에 defer/async 속성 추가
- 불필요한 CSS 제거 (Tree shaking)
- 미디어 쿼리로 필요한 CSS만 로드
- 초기 로드에 필요한 리소스 최소화`,
  },
  {
    id: 52,
    categoryId: 'performance',
    title: 'Core Web Vitals란 무엇인가요?',
    difficulty: 'medium',
    tags: ['Core Web Vitals', 'LCP', 'FID', 'CLS', 'SEO'],
    intent: '구글이 정의한 웹 성능 지표를 알고 있는지, 실무에서 개선 방법을 설명할 수 있는지 확인합니다.',
    keywords: ['LCP', 'FID', 'CLS', 'INP', 'Lighthouse'],
    hint: '각 지표가 사용자 경험의 어떤 측면을 측정하는지 생각해보세요.',
    answer: `Core Web Vitals는 구글이 정의한 웹 페이지 사용자 경험의 핵심 성능 지표입니다.

3가지 핵심 지표:

LCP (Largest Contentful Paint):
- 가장 큰 콘텐츠 요소가 렌더링되는 시간
- 2.5초 이하가 좋음
- 개선: 이미지 최적화, 서버 응답 시간 단축, CDN 활용

FID (First Input Delay) → INP로 대체:
- 사용자 첫 상호작용에 대한 응답 시간
- 100ms 이하가 좋음
- 개선: JavaScript 실행 시간 단축, 코드 분할

CLS (Cumulative Layout Shift):
- 예상치 못한 레이아웃 이동 누적 점수
- 0.1 이하가 좋음
- 개선: 이미지/광고에 크기 명시, 동적 콘텐츠 공간 예약

측정 도구:
- Chrome DevTools, Lighthouse, PageSpeed Insights`,
  },
  {
    id: 53,
    categoryId: 'performance',
    title: '이미지 최적화 방법에 대해 설명해주세요.',
    difficulty: 'medium',
    tags: ['이미지', '최적화', 'WebP', 'lazy loading'],
    intent: '웹에서 가장 큰 용량을 차지하는 이미지를 어떻게 최적화할 수 있는지 실무 경험을 확인합니다.',
    keywords: ['WebP', 'AVIF', 'lazy loading', 'srcset', 'CDN', '압축'],
    hint: '포맷, 크기, 로딩 시점 세 가지 관점에서 생각해보세요.',
    answer: `이미지 최적화는 웹 성능 개선에서 가장 효과적인 방법 중 하나입니다.

포맷 최적화:
- WebP: JPEG 대비 25~35% 용량 감소, 광범위한 브라우저 지원
- AVIF: WebP보다 더 높은 압축률, 최신 브라우저 지원
- SVG: 아이콘, 로고 등 벡터 이미지에 적합

크기 최적화:
- 실제 표시 크기에 맞는 이미지 제공
- srcset으로 디바이스 해상도에 맞는 이미지 제공
- 압축 도구 활용 (Squoosh, ImageOptim)

로딩 최적화:
- Lazy Loading: 뷰포트에 들어올 때 로드
- loading="lazy" 속성 또는 Intersection Observer API
- 중요 이미지는 preload로 미리 로드

인프라:
- CDN으로 사용자와 가까운 서버에서 제공
- 캐싱 전략 적용`,
  },
  {
    id: 54,
    categoryId: 'performance',
    title: '메모리 누수(Memory Leak)란 무엇이고 어떻게 방지하나요?',
    difficulty: 'hard',
    tags: ['메모리 누수', '가비지 컬렉션', 'JavaScript', '성능'],
    intent: '메모리 관리의 중요성을 이해하고 실무에서 메모리 누수를 방지할 수 있는지 확인합니다.',
    keywords: ['가비지 컬렉션', '참조', '이벤트 리스너', '클로저', 'WeakMap'],
    hint: '가비지 컬렉터가 메모리를 해제하지 못하는 상황이 언제 발생하는지 생각해보세요.',
    answer: `메모리 누수는 더 이상 필요하지 않은 메모리가 해제되지 않고 계속 점유되는 현상입니다.

자바스크립트의 메모리 관리:
- 가비지 컬렉터가 참조되지 않는 객체의 메모리 자동 해제
- 참조가 남아있으면 해제되지 않음

주요 원인:
1. 제거되지 않은 이벤트 리스너
2. 클로저가 불필요한 변수를 계속 참조
3. 전역 변수로 인한 메모리 점유
4. setInterval, setTimeout 미정리
5. DOM 요소 제거 후 참조가 남아있는 경우

방지 방법:
- useEffect 클린업에서 이벤트 리스너, 타이머 제거
- WeakMap, WeakSet 활용 (참조가 없으면 자동 해제)
- 전역 변수 최소화

탐지:
- Chrome DevTools Memory 탭으로 힙 스냅샷 분석`,
  },
  {
    id: 55,
    categoryId: 'performance',
    title: '번들 크기를 줄이는 방법에는 어떤 것들이 있나요?',
    difficulty: 'medium',
    tags: ['bundle', '번들 크기', 'Tree shaking', 'Code splitting'],
    intent: '프론트엔드 빌드 최적화에 대한 이해와 실무 적용 경험을 확인합니다.',
    keywords: ['Tree shaking', 'Code splitting', 'dynamic import', '번들 분석', '라이브러리 대체'],
    hint: '번들이 커지는 원인부터 파악하는 게 먼저입니다.',
    answer: `번들 크기를 줄이면 초기 로딩 속도를 크게 개선할 수 있습니다.

분석 도구:
- webpack-bundle-analyzer, rollup-plugin-visualizer
- 어떤 모듈이 용량을 차지하는지 시각화

주요 방법:

Tree Shaking:
- 사용하지 않는 코드 자동 제거
- ESM 방식 import 사용 시 효과적

Code Splitting:
- 라우트별로 번들 분리
- React.lazy + Suspense로 동적 import

라이브러리 최적화:
- 전체 임포트 대신 필요한 것만 임포트
- 무거운 라이브러리를 가벼운 대안으로 교체
  (moment.js → date-fns, lodash → 개별 함수)

기타:
- 이미지, 폰트 등 정적 자산 최적화
- 외부 CDN 활용으로 공통 라이브러리 캐싱`,
  },
  {
    id: 56,
    categoryId: 'performance',
    title: 'Lighthouse란 무엇이고 어떻게 활용하나요?',
    difficulty: 'easy',
    tags: ['Lighthouse', '성능 측정', 'Chrome DevTools', 'SEO'],
    intent: '성능 측정 도구를 실무에서 활용할 수 있는지 확인합니다.',
    keywords: ['Performance', 'Accessibility', 'SEO', 'Best Practices', 'Core Web Vitals'],
    hint: 'Lighthouse가 측정하는 5가지 카테고리를 생각해보세요.',
    answer: `Lighthouse는 구글이 만든 오픈소스 웹 품질 측정 도구입니다.
Chrome DevTools에 내장되어 있으며 자동화된 감사를 제공합니다.

측정 카테고리:
1. Performance: 로딩 속도, Core Web Vitals
2. Accessibility: 스크린 리더, 색상 대비 등 접근성
3. Best Practices: HTTPS, 보안 취약점 등
4. SEO: 검색엔진 최적화
5. PWA: Progressive Web App 요건

활용 방법:
- Chrome DevTools → Lighthouse 탭
- CLI로 자동화 테스트 가능
- CI/CD 파이프라인에 통합해 성능 회귀 방지

점수 해석:
- 90~100: 좋음
- 50~89: 개선 필요
- 0~49: 나쁨

주의사항:
- 시크릿 모드에서 측정 (확장 프로그램 영향 제거)
- 여러 번 측정 후 평균값 사용`,
  },
  {
    id: 57,
    categoryId: 'performance',
    title: '웹 폰트 최적화 방법을 설명해주세요.',
    difficulty: 'medium',
    tags: ['웹 폰트', 'FOUT', 'FOIT', 'font-display', '성능'],
    intent: '폰트 로딩이 성능에 미치는 영향을 이해하고 최적화할 수 있는지 확인합니다.',
    keywords: ['FOUT', 'FOIT', 'font-display', 'preload', 'woff2', '서브셋'],
    hint: '폰트가 로드되기 전에 텍스트가 어떻게 표시되는지 생각해보세요.',
    answer: `웹 폰트는 성능과 사용자 경험 모두에 영향을 미칩니다.

폰트 로딩 문제:
- FOIT (Flash of Invisible Text): 폰트 로드 전 텍스트 숨김
- FOUT (Flash of Unstyled Text): 폰트 로드 전 시스템 폰트로 표시

font-display 속성:
- auto: 브라우저 기본 동작
- block: FOIT (짧은 시간)
- swap: FOUT (시스템 폰트로 즉시 표시) — 권장
- fallback: 짧은 FOIT 후 FOUT
- optional: 빠르게 로드 안 되면 시스템 폰트 사용

최적화 방법:
- woff2 포맷 사용 (가장 높은 압축률)
- 필요한 글자만 포함한 서브셋 생성
- preload로 중요한 폰트 미리 로드
- 시스템 폰트 스택 활용으로 폰트 의존성 줄이기
- self-hosting으로 외부 요청 제거`,
  },
]