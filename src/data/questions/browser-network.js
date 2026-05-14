export const browserNetworkQuestions = [
  // ─── 브라우저/네트워크 ───
  {
    id: 11,
    categoryId: 'browser-network',
    title: '브라우저 렌더링 과정을 설명해주세요.',
    difficulty: 'hard',
    tags: ['렌더링', 'DOM', 'CSSOM', 'reflow', 'repaint'],
    intent: '브라우저가 HTML을 화면에 그리는 전체 과정을 이해하고 있는지, 성능 최적화와 연결지어 설명할 수 있는지 봅니다.',
    keywords: ['HTML 파싱', 'DOM', 'CSSOM', 'Render Tree', 'Layout', 'Paint', 'Composite'],
    hint: 'HTML 파일을 받은 후부터 화면에 픽셀이 그려지기까지의 순서를 떠올려보세요.',
    answer: `브라우저 렌더링은 다음 순서로 진행됩니다:

1. HTML 파싱 → DOM 트리 생성
2. CSS 파싱 → CSSOM 트리 생성
3. DOM + CSSOM 결합 → Render Tree 생성 (display:none 요소 제외)
4. Layout (Reflow): 각 요소의 크기와 위치 계산
5. Paint: 요소를 픽셀로 그림
6. Composite: 레이어를 합성해 화면에 표시

성능 관점:
- Reflow는 레이아웃 전체를 다시 계산하므로 비용이 큼
- transform, opacity 변경은 Composite 단계만 거쳐 성능에 유리
- script 태그는 파싱을 블로킹하므로 defer/async 속성 활용 권장`,
  },
  {
    id: 12,
    categoryId: 'browser-network',
    title: 'CORS란 무엇이고, 어떻게 해결하나요?',
    difficulty: 'medium',
    tags: ['CORS', 'HTTP', '보안', 'SOP'],
    intent: '보안 정책에 대한 이해와 실무에서 CORS 문제를 실제로 해결해본 경험이 있는지 확인합니다.',
    keywords: ['동일 출처 정책', 'SOP', 'Origin', 'Access-Control-Allow-Origin', 'Preflight'],
    hint: '왜 CORS가 존재하는지, 어떤 보안 문제를 막기 위한 것인지부터 설명해보세요.',
    answer: `CORS(Cross-Origin Resource Sharing)는 다른 출처의 리소스에 접근을 제어하는 브라우저 보안 정책입니다.

배경:
- 브라우저는 기본적으로 SOP(Same-Origin Policy)를 따름
- 출처(프로토콜+도메인+포트)가 다르면 요청을 차단

해결 방법:
1. 서버에서 Access-Control-Allow-Origin 헤더 설정 (가장 일반적)
2. 개발 환경에서 프록시 서버 사용 (Vite의 proxy 설정 등)
3. JSONP (레거시, GET 요청만 가능)

Preflight 요청:
- PUT, DELETE 등 단순하지 않은 요청은 먼저 OPTIONS 요청으로 서버 허용 여부 확인
- 서버가 허용하면 본 요청 전송

프론트엔드 단에서는 CORS를 직접 해결할 수 없고, 서버 또는 프록시 설정이 필요합니다.`,
  },
  {
    id: 37,
    categoryId: 'browser-network',
    title: 'HTTP와 HTTPS의 차이점은 무엇인가요?',
    difficulty: 'easy',
    tags: ['HTTP', 'HTTPS', 'SSL', 'TLS', '보안'],
    intent: '웹 보안의 기본 개념을 이해하고 있는지 확인합니다.',
    keywords: ['SSL/TLS', '암호화', '인증서', '443 포트', '중간자 공격'],
    hint: 'HTTPS가 HTTP에 무엇을 추가한 것인지 생각해보세요.',
    answer: `HTTP는 클라이언트와 서버 간 데이터를 평문으로 전송하는 프로토콜입니다.
HTTPS는 HTTP에 SSL/TLS 암호화를 추가한 보안 프로토콜입니다.

차이점:
- 암호화: HTTPS는 데이터를 암호화해 도청 방지
- 인증: SSL 인증서로 서버 신원 확인
- 무결성: 데이터 변조 여부 확인 가능
- 포트: HTTP는 80, HTTPS는 443

SSL/TLS 핸드셰이크:
1. 클라이언트가 지원하는 암호화 방식 전송
2. 서버가 인증서와 암호화 방식 선택해 응답
3. 클라이언트가 인증서 검증
4. 세션 키 교환 후 암호화 통신 시작

실무:
- 현재 모든 웹사이트는 HTTPS 필수
- HTTP/2, HTTP/3은 HTTPS 기반에서만 동작`,
  },
  {
    id: 38,
    categoryId: 'browser-network',
    title: 'HTTP/1.1, HTTP/2, HTTP/3의 차이점을 설명해주세요.',
    difficulty: 'hard',
    tags: ['HTTP', 'HTTP/2', 'HTTP/3', '성능', '네트워크'],
    intent: '웹 성능과 네트워크 프로토콜의 발전 방향을 이해하고 있는지 확인합니다.',
    keywords: ['멀티플렉싱', 'HOL Blocking', '헤더 압축', 'QUIC', '서버 푸시'],
    hint: '각 버전이 이전 버전의 어떤 문제를 해결하기 위해 등장했는지 생각해보세요.',
    answer: `HTTP/1.1:
- 기본적으로 요청당 하나의 TCP 연결
- Keep-Alive로 연결 재사용 가능
- HOL(Head-of-Line) Blocking: 앞 요청이 완료되어야 다음 요청 처리
- 헤더 압축 없음

HTTP/2:
- 하나의 TCP 연결에서 멀티플렉싱 (여러 요청 동시 처리)
- 헤더 압축 (HPACK)
- 서버 푸시 기능
- TCP 레벨 HOL Blocking은 여전히 존재

HTTP/3:
- TCP 대신 QUIC(UDP 기반) 프로토콜 사용
- TCP HOL Blocking 완전 해결
- 연결 설정 시간 단축 (0-RTT)
- 모바일 환경에서 네트워크 전환 시 연결 유지

실무:
- 현재 대부분의 서비스가 HTTP/2 사용
- HTTP/3는 점진적으로 도입 중`,
  },
  {
    id: 39,
    categoryId: 'browser-network',
    title: '웹 스토리지(localStorage, sessionStorage, Cookie)의 차이점은 무엇인가요?',
    difficulty: 'easy',
    tags: ['localStorage', 'sessionStorage', 'Cookie', '웹 스토리지'],
    intent: '클라이언트 측 데이터 저장 방식을 이해하고 상황에 맞게 선택할 수 있는지 확인합니다.',
    keywords: ['만료 시간', '용량', '서버 전송', '도메인', '보안'],
    hint: '각 저장소가 언제까지 데이터를 유지하는지 비교해보세요.',
    answer: `세 가지 모두 클라이언트 측 데이터 저장 방식이지만 특성이 다릅니다.

localStorage:
- 만료 없음 (명시적 삭제 전까지 유지)
- 약 5MB 용량
- 서버로 자동 전송 안 됨
- 같은 도메인의 모든 탭/창에서 공유

sessionStorage:
- 탭/창을 닫으면 삭제
- 약 5MB 용량
- 서버로 자동 전송 안 됨
- 같은 탭 내에서만 공유

Cookie:
- 만료 시간 설정 가능
- 약 4KB 용량 (작음)
- 모든 HTTP 요청에 자동으로 서버 전송
- HttpOnly, Secure, SameSite 옵션으로 보안 설정 가능

활용:
- 인증 토큰 → HttpOnly Cookie (XSS 방어)
- 사용자 설정, 테마 → localStorage
- 임시 데이터 → sessionStorage`,
  },
  {
    id: 40,
    categoryId: 'browser-network',
    title: 'DNS란 무엇이고 동작 방식을 설명해주세요.',
    difficulty: 'medium',
    tags: ['DNS', '네트워크', 'IP', '도메인'],
    intent: '브라우저에 URL을 입력했을 때 발생하는 전체 과정을 이해하고 있는지 확인합니다.',
    keywords: ['도메인', 'IP 주소', 'DNS 서버', '재귀 쿼리', 'DNS 캐싱'],
    hint: '브라우저가 도메인 이름을 IP 주소로 변환하는 과정을 단계별로 생각해보세요.',
    answer: `DNS(Domain Name System)는 도메인 이름을 IP 주소로 변환하는 시스템입니다.

동작 방식:
1. 브라우저 DNS 캐시 확인
2. OS DNS 캐시 확인
3. 로컬 DNS 서버(ISP)에 쿼리
4. 루트 DNS 서버 → TLD DNS 서버 → 권한 있는 DNS 서버 순으로 재귀 탐색
5. IP 주소 반환 및 캐싱

DNS 레코드 종류:
- A: 도메인 → IPv4 주소
- AAAA: 도메인 → IPv6 주소
- CNAME: 도메인 → 다른 도메인 (별칭)
- MX: 이메일 서버

성능 최적화:
- DNS Prefetch: <link rel="dns-prefetch" href="...">
- TTL 값으로 캐싱 시간 조절`,
  },
  {
    id: 41,
    categoryId: 'browser-network',
    title: 'RESTful API와 GraphQL의 차이점은 무엇인가요?',
    difficulty: 'medium',
    tags: ['REST', 'GraphQL', 'API', '네트워크'],
    intent: '두 API 설계 방식의 장단점을 이해하고 상황에 맞게 선택할 수 있는지 확인합니다.',
    keywords: ['오버페칭', '언더페칭', '단일 엔드포인트', '타입 시스템', '쿼리'],
    hint: '클라이언트가 필요한 데이터를 얼마나 유연하게 요청할 수 있는지 비교해보세요.',
    answer: `REST API:
- 리소스 중심의 여러 엔드포인트
- HTTP 메서드(GET, POST 등)로 행위 표현
- 오버페칭(필요 이상의 데이터), 언더페칭(여러 번 요청) 문제
- 캐싱이 쉬움

GraphQL:
- 단일 엔드포인트
- 클라이언트가 필요한 데이터 구조를 직접 정의
- 오버/언더페칭 문제 해결
- 강타입 스키마로 자동 문서화
- 캐싱이 복잡함

선택 기준:
- 단순한 CRUD, 캐싱 중요 → REST
- 다양한 클라이언트(모바일/웹), 복잡한 데이터 → GraphQL
- 현재 실무에서는 REST가 여전히 주류`,
  },
  {
    id: 42,
    categoryId: 'browser-network',
    title: '브라우저의 동일 출처 정책(SOP)이란 무엇인가요?',
    difficulty: 'medium',
    tags: ['SOP', 'CORS', '보안', '브라우저'],
    intent: '웹 보안의 핵심 정책을 이해하고 CORS와 연결지어 설명할 수 있는지 확인합니다.',
    keywords: ['출처', '프로토콜', '도메인', '포트', 'XSS', 'CSRF'],
    hint: 'SOP가 없다면 어떤 보안 문제가 발생할 수 있는지 생각해보세요.',
    answer: `동일 출처 정책(Same-Origin Policy)은 브라우저가 다른 출처의 리소스 접근을 제한하는 보안 정책입니다.

출처(Origin)의 구성:
- 프로토콜 + 도메인 + 포트가 모두 같아야 동일 출처
- 하나라도 다르면 다른 출처

SOP가 막는 것:
- 다른 출처의 DOM 접근
- 다른 출처로의 XMLHttpRequest, fetch
- 다른 출처의 스크립트 실행

SOP가 없다면:
- 악성 사이트가 로그인된 다른 사이트의 데이터 탈취 가능
- CSRF 공격 취약

예외 (허용되는 것):
- img, script, link 태그를 통한 리소스 로드
- CORS 헤더로 허용된 요청

CORS는 SOP를 완화하기 위한 메커니즘입니다.`,
  },
  {
    id: 43,
    categoryId: 'browser-network',
    title: '웹소켓(WebSocket)이란 무엇이고 언제 사용하나요?',
    difficulty: 'medium',
    tags: ['WebSocket', '실시간', 'HTTP', '양방향 통신'],
    intent: '실시간 통신이 필요한 상황에서 적절한 기술을 선택할 수 있는지 확인합니다.',
    keywords: ['양방향 통신', '지속 연결', 'HTTP 업그레이드', '실시간', 'polling'],
    hint: 'HTTP의 요청-응답 방식과 WebSocket의 근본적인 차이를 생각해보세요.',
    answer: `WebSocket은 클라이언트와 서버 간 양방향 실시간 통신을 지원하는 프로토콜입니다.

HTTP와의 차이:
- HTTP: 클라이언트 요청 → 서버 응답 (단방향, 연결 종료)
- WebSocket: 한 번 연결 후 양방향으로 자유롭게 데이터 전송

동작 방식:
1. HTTP 핸드셰이크로 연결 시작
2. Upgrade 헤더로 WebSocket 프로토콜로 전환
3. 연결 유지하며 양방향 통신

사용 사례:
- 채팅 애플리케이션
- 실시간 알림
- 협업 도구 (구글 docs처럼)
- 실시간 주식/코인 시세

대안:
- Polling: 주기적으로 HTTP 요청 (비효율적)
- SSE(Server-Sent Events): 서버→클라이언트 단방향 실시간 통신`,
  },
]