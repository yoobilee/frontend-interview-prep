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
  {
    id: 30,
    categoryId: 'react',
    title: 'React의 렌더링 최적화 방법에 대해 설명해주세요.',
    difficulty: 'hard',
    tags: ['rendering', '최적화', 'React.memo', 'useMemo', 'useCallback'],
    intent: '불필요한 리렌더링을 인식하고 실무에서 성능을 개선할 수 있는지 확인합니다.',
    keywords: ['React.memo', 'useMemo', 'useCallback', '참조 동일성', '리렌더링 조건'],
    hint: '리렌더링이 발생하는 조건부터 파악하는 게 먼저입니다.',
    answer: `React 컴포넌트는 state나 props가 변경될 때 리렌더링됩니다.

주요 최적화 방법:

React.memo:
- 컴포넌트를 메모이제이션
- props가 변경되지 않으면 리렌더링 방지
- 얕은 비교를 사용하므로 객체/함수 props에 주의

useMemo:
- 계산 비용이 큰 값을 캐싱
- 의존성이 변경될 때만 재계산

useCallback:
- 함수를 캐싱
- 자식 컴포넌트에 함수를 props로 전달할 때 유용

주의사항:
- 모든 곳에 적용하면 오히려 메모리 낭비
- 실제 성능 문제가 확인된 후 적용하는 것이 원칙
- React DevTools Profiler로 병목 확인 후 최적화`,
  },
  {
    id: 31,
    categoryId: 'react',
    title: 'React의 상태 관리 방법들을 비교해주세요.',
    difficulty: 'hard',
    tags: ['상태 관리', 'Redux', 'Zustand', 'Context API', 'Recoil'],
    intent: '다양한 상태 관리 방식의 장단점을 이해하고 상황에 맞게 선택할 수 있는지 확인합니다.',
    keywords: ['전역 상태', '로컬 상태', '보일러플레이트', '불변성', '미들웨어'],
    hint: '상태의 범위(로컬 vs 전역)와 복잡도에 따라 선택 기준이 달라집니다.',
    answer: `React에서 상태 관리는 범위와 복잡도에 따라 방법을 선택합니다.

로컬 상태 (useState, useReducer):
- 단일 컴포넌트 내 상태
- 간단한 상태는 useState, 복잡한 로직은 useReducer

Context API:
- 전역 상태 공유에 사용
- prop drilling 해결
- 값이 변경되면 구독하는 모든 컴포넌트 리렌더링 → 성능 주의

Redux:
- 대규모 애플리케이션에 적합
- 예측 가능한 상태 관리, DevTools 강력
- 보일러플레이트가 많음 (Redux Toolkit으로 개선)

Zustand:
- 가볍고 보일러플레이트 적음
- 필요한 상태만 구독 가능
- 작은~중간 규모 프로젝트에 적합

선택 기준:
- 소규모 → useState + Context
- 중간 규모 → Zustand
- 대규모, 복잡한 비즈니스 로직 → Redux Toolkit`,
  },
  {
    id: 32,
    categoryId: 'react',
    title: 'React의 key prop은 왜 필요한가요?',
    difficulty: 'easy',
    tags: ['key', 'list', 'reconciliation', 'React'],
    intent: 'React의 렌더링 원리를 이해하고 key를 올바르게 사용할 수 있는지 확인합니다.',
    keywords: ['식별자', 'reconciliation', 'diffing', 'index 사용 지양', '고유값'],
    hint: 'key가 없으면 React가 어떻게 리스트 변경을 감지하는지 생각해보세요.',
    answer: `key는 React가 리스트에서 어떤 항목이 변경, 추가, 삭제됐는지 식별하기 위한 고유 식별자입니다.

필요한 이유:
- React는 이전/현재 Virtual DOM을 비교(diffing)할 때 key로 요소를 추적
- key가 없으면 순서 기반으로 비교 → 불필요한 리렌더링 발생
- key가 있으면 변경된 항목만 정확히 업데이트

올바른 key 사용:
- 고유하고 안정적인 값 사용 (DB id 등)
- 형제 요소 간에만 고유하면 됨

잘못된 사용:
- 배열 index를 key로 사용 → 순서 변경 시 버그 발생
- Math.random() 사용 → 매 렌더링마다 새 key 생성으로 성능 저하`,
  },
  {
    id: 33,
    categoryId: 'react',
    title: 'React에서 불변성(Immutability)이 중요한 이유는 무엇인가요?',
    difficulty: 'medium',
    tags: ['불변성', 'state', 'React', '렌더링'],
    intent: 'React의 상태 업데이트 원리를 이해하고 올바른 상태 관리를 할 수 있는지 확인합니다.',
    keywords: ['참조 비교', '얕은 비교', '새로운 객체', '스프레드 연산자', '상태 업데이트'],
    hint: 'React가 상태 변경을 감지하는 방식을 생각해보세요.',
    answer: `React는 상태 변경을 감지할 때 참조 비교(얕은 비교)를 사용합니다.
불변성을 지키지 않으면 React가 변경을 감지하지 못해 리렌더링이 발생하지 않습니다.

문제가 되는 경우:
- 배열을 push()로 직접 수정 → 참조가 같아서 변경 감지 못함
- 객체를 직접 수정해도 동일한 문제 발생

올바른 방법:
- 배열: [...arr, newItem], filter(), map() 활용
- 객체: { ...obj, key: newValue } 활용

불변성의 장점:
- 변경 감지가 쉽고 예측 가능
- 이전 상태 추적 가능 (시간 여행 디버깅)
- 사이드 이펙트 방지
- React.memo, useMemo 등 최적화 기법과 연계`,
  },
  {
    id: 34,
    categoryId: 'react',
    title: 'React에서 폼(Form) 처리 방법을 설명해주세요.',
    difficulty: 'medium',
    tags: ['form', '제어 컴포넌트', '비제어 컴포넌트', 'useRef'],
    intent: '제어/비제어 컴포넌트의 차이를 이해하고 상황에 맞게 선택할 수 있는지 확인합니다.',
    keywords: ['제어 컴포넌트', '비제어 컴포넌트', 'onChange', 'useRef', 'defaultValue'],
    hint: '어떤 경우에 비제어 컴포넌트가 더 적합한지 생각해보세요.',
    answer: `React에서 폼 처리는 제어 컴포넌트와 비제어 컴포넌트 두 가지 방식이 있습니다.

제어 컴포넌트:
- React state로 입력값 관리
- onChange로 상태 업데이트
- 입력값을 항상 React가 제어
- 실시간 유효성 검사, 조건부 렌더링에 유리

비제어 컴포넌트:
- useRef로 DOM에 직접 접근
- React가 상태를 관리하지 않음
- 파일 업로드, 써드파티 라이브러리 연동에 유리
- 성능이 중요한 경우 (대량의 입력 필드)

실무:
- 대부분의 경우 제어 컴포넌트 사용
- 복잡한 폼은 react-hook-form 같은 라이브러리 활용`,
  },
  {
    id: 35,
    categoryId: 'react',
    title: 'useReducer는 어떤 경우에 useState 대신 사용하나요?',
    difficulty: 'medium',
    tags: ['useReducer', 'useState', '상태 관리', 'React'],
    intent: '상황에 따라 적절한 상태 관리 훅을 선택할 수 있는지 확인합니다.',
    keywords: ['복잡한 상태 로직', 'action', 'dispatch', 'reducer', '예측 가능성'],
    hint: '상태 업데이트 로직이 복잡해질 때 어떤 문제가 생기는지 생각해보세요.',
    answer: `useReducer는 복잡한 상태 로직을 관리할 때 useState 대신 사용합니다.

useReducer가 적합한 경우:
- 여러 하위 값을 포함하는 복잡한 상태 객체
- 다음 상태가 이전 상태에 의존하는 경우
- 여러 액션에 따라 상태가 달라지는 경우

장점:
- 상태 업데이트 로직을 컴포넌트 외부로 분리
- 액션 타입으로 의도를 명확히 표현
- 테스트하기 쉬운 순수 함수(reducer)
- Redux와 유사한 패턴으로 마이그레이션 용이

선택 기준:
- 단순한 on/off, 카운터 → useState
- 여러 필드가 연관된 폼, 복잡한 상태 → useReducer`,
  },
  {
    id: 36,
    categoryId: 'react',
    title: 'React 18의 주요 변경사항은 무엇인가요?',
    difficulty: 'hard',
    tags: ['React 18', 'Concurrent', 'Suspense', 'Transition'],
    intent: 'React 최신 버전의 변화를 파악하고 있는지, 실무 적용 방향을 알고 있는지 확인합니다.',
    keywords: ['Concurrent Mode', 'automatic batching', 'useTransition', 'Suspense', 'startTransition'],
    hint: 'Concurrent Mode가 기존 방식과 근본적으로 어떻게 다른지 생각해보세요.',
    answer: `React 18은 Concurrent Mode를 정식 도입한 버전입니다.

주요 변경사항:

Automatic Batching:
- 이전: 이벤트 핸들러 내에서만 일괄 처리
- React 18: setTimeout, Promise 등에서도 자동 일괄 처리

Concurrent Features:
- useTransition: 긴급하지 않은 상태 업데이트를 표시
- useDeferredValue: 값의 업데이트를 지연
- 사용자 인터랙션을 방해하지 않고 백그라운드에서 렌더링

Suspense 개선:
- 서버 사이드 렌더링에서 Suspense 지원
- 스트리밍 HTML 렌더링 가능

createRoot:
- ReactDOM.render 대신 createRoot 사용
- Concurrent Mode 활성화를 위한 새로운 진입점`,
  },
]