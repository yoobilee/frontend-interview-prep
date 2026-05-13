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
]