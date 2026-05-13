export const reactQuestions = [
  // ─── React ───
  {
    id: 8,
    categoryId: 'react',
    title: 'Virtual DOM이란 무엇이고, 왜 사용하나요?',
    difficulty: 'medium',
    tags: ['Virtual DOM', 'rendering', 'reconciliation'],
    intent: 'React의 핵심 동작 원리를 이해하는지, 성능 측면에서 왜 이런 방식을 택했는지 설명할 수 있는지 봅니다.',
    keywords: ['실제 DOM', '메모리', 'diffing', 'reconciliation', '최소한의 업데이트'],
    hint: '실제 DOM 조작이 왜 느린지부터 생각해보세요.',
    answer: `Virtual DOM은 실제 DOM을 메모리에 가상으로 복제한 객체입니다.

동작 방식:
1. 상태 변경 시 새로운 Virtual DOM 트리 생성
2. 이전 Virtual DOM과 비교 (diffing)
3. 변경된 부분만 실제 DOM에 반영 (reconciliation)

사용하는 이유:
- 실제 DOM 조작은 레이아웃 재계산, 리페인트 등이 발생해 비용이 큼
- Virtual DOM을 통해 변경 사항을 일괄 처리하고 최소한의 DOM 업데이트만 수행
- 개발자가 직접 DOM을 조작하지 않아도 되어 코드가 단순해짐

단, Virtual DOM 자체가 항상 빠른 건 아니며, 단순한 앱에서는 오히려 오버헤드가 될 수 있습니다.`,
  },
  {
    id: 9,
    categoryId: 'react',
    title: 'useEffect의 동작 방식과 의존성 배열에 대해 설명해주세요.',
    difficulty: 'medium',
    tags: ['useEffect', 'lifecycle', '의존성 배열'],
    intent: 'React 훅의 핵심인 useEffect를 제대로 이해하고 있는지, 흔한 실수(무한 루프, 클린업 누락)를 알고 있는지 확인합니다.',
    keywords: ['사이드 이펙트', '마운트', '언마운트', '클린업', '의존성 배열', '무한 루프'],
    hint: '의존성 배열이 없을 때, 빈 배열일 때, 값이 있을 때 각각 어떻게 동작하는지 정리해보세요.',
    answer: `useEffect는 컴포넌트에서 사이드 이펙트(API 호출, 구독, DOM 조작 등)를 처리하는 훅입니다.

의존성 배열에 따른 동작:
- 생략: 매 렌더링마다 실행
- 빈 배열 []: 마운트 시 1회만 실행
- [a, b]: a 또는 b가 변경될 때마다 실행

클린업 함수:
- return 으로 함수를 반환하면 언마운트 시 또는 다음 effect 실행 전에 호출
- 이벤트 리스너 제거, 타이머 취소, 구독 해제 등에 활용

흔한 실수:
- 객체/함수를 의존성으로 넣으면 매번 새로 생성되어 무한 루프 발생
- 클린업을 생략하면 메모리 누수 발생`,
  },
  {
    id: 10,
    categoryId: 'react',
    title: 'useMemo와 useCallback의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['useMemo', 'useCallback', '최적화', 'memoization'],
    intent: '두 훅의 차이를 알고, 무분별하게 사용하는 것이 오히려 역효과임을 이해하는지 확인합니다.',
    keywords: ['메모이제이션', '값 캐싱', '함수 캐싱', '참조 동일성', '불필요한 렌더링'],
    hint: '무엇을 캐싱하느냐의 차이에 집중해보세요.',
    answer: `두 훅 모두 메모이제이션을 통해 불필요한 연산/렌더링을 방지합니다.

useMemo:
- 계산된 값을 캐싱
- 의존성이 바뀌지 않으면 이전 계산 결과를 재사용
- 무거운 연산 결과를 캐싱할 때 사용

useCallback:
- 함수 자체를 캐싱
- 의존성이 바뀌지 않으면 동일한 함수 참조를 유지
- 자식 컴포넌트에 함수를 props로 넘길 때 불필요한 리렌더링 방지

주의할 점:
- 모든 값/함수에 적용하면 오히려 메모리 사용이 증가하고 코드가 복잡해짐
- 실제로 성능 문제가 있을 때 사용하는 것이 원칙`,
  },
]