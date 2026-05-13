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
]