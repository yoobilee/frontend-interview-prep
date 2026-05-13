export const csQuestions = [
  // ─── CS 기초 ───
  {
    id: 13,
    categoryId: 'cs',
    title: '프로세스와 스레드의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['프로세스', '스레드', '운영체제'],
    intent: 'CS 기본기를 갖추고 있는지 확인하고, 자바스크립트의 싱글 스레드 특성과 연결지어 이해하는지 봅니다.',
    keywords: ['독립적 메모리', '공유 메모리', '컨텍스트 스위칭', '싱글 스레드', '멀티 스레드'],
    hint: '메모리를 어떻게 공유하느냐의 차이를 생각해보세요.',
    answer: `프로세스는 실행 중인 프로그램의 독립적인 인스턴스이고,
스레드는 프로세스 내에서 실행되는 작업 단위입니다.

프로세스:
- 독립적인 메모리 공간 (코드, 힙, 스택)
- 프로세스 간 통신은 IPC를 통해 이루어짐
- 하나가 죽어도 다른 프로세스에 영향 없음

스레드:
- 같은 프로세스 내에서 메모리(코드, 힙) 공유
- 스택은 각 스레드가 독립적으로 보유
- 컨텍스트 스위칭 비용이 프로세스보다 적음

자바스크립트 관점:
- 자바스크립트는 싱글 스레드로 동작
- 이벤트 루프를 통해 비동기 처리를 구현`,
  },
  {
    id: 14,
    categoryId: 'cs',
    title: 'RESTful API란 무엇인가요?',
    difficulty: 'easy',
    tags: ['REST', 'API', 'HTTP', '설계'],
    intent: 'API 설계 원칙을 이해하고 실무에서 올바른 API를 설계하거나 사용할 수 있는지 확인합니다.',
    keywords: ['자원', 'HTTP 메서드', '무상태', 'URI', 'GET/POST/PUT/DELETE'],
    hint: 'REST는 규칙이 아니라 설계 원칙(아키텍처 스타일)임을 기억하세요.',
    answer: `REST(Representational State Transfer)는 HTTP를 기반으로 자원을 표현하고 상태를 전달하는 아키텍처 스타일입니다.

핵심 원칙:
1. 자원 기반 URI: /users/1 처럼 자원을 명사로 표현
2. HTTP 메서드로 행위 표현: GET(조회), POST(생성), PUT/PATCH(수정), DELETE(삭제)
3. 무상태(Stateless): 각 요청은 독립적이며 서버가 클라이언트 상태를 저장하지 않음
4. 일관된 인터페이스

RESTful API 설계 예시:
- GET /users → 사용자 목록 조회
- POST /users → 사용자 생성
- GET /users/1 → 특정 사용자 조회
- DELETE /users/1 → 특정 사용자 삭제`,
  },
]