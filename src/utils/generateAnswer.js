const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

export async function generateQuestionData(title) {
  const categoryLabels = {
    'html-css': 'HTML/CSS',
    'javascript': 'JavaScript',
    'react': 'React',
    'browser-network': '브라우저/네트워크',
    'cs': 'CS 기초',
    'performance': '성능 최적화',
  }

  const prompt = `당신은 프론트엔드 개발자 면접 전문가입니다.
다음 면접 질문에 대해 아래 JSON 형식으로만 응답해주세요. 다른 텍스트는 절대 포함하지 마세요.

질문: ${title}

카테고리는 다음 중 하나를 선택해주세요:
- html-css: HTML, CSS, 레이아웃, 스타일링 관련
- javascript: JavaScript 언어, 문법, 동작 원리 관련
- react: React, 컴포넌트, 훅, 상태관리 관련
- browser-network: 브라우저 동작, HTTP, 네트워크 관련
- cs: 자료구조, 알고리즘, 운영체제, 컴퓨터과학 기초
- performance: 웹 성능, 최적화, 렌더링 관련

{
  "category_id": "위 카테고리 중 하나",
  "difficulty": "easy 또는 medium 또는 hard 중 하나",
  "tags": ["태그1", "태그2", "태그3", "태그4"],
  "intent": "면접관이 이 질문을 하는 의도 (1-2문장)",
  "keywords": ["핵심키워드1", "핵심키워드2", "핵심키워드3", "핵심키워드4", "핵심키워드5"],
  "hint": "답변 방향을 잡을 수 있는 힌트 (1-2문장)",
  "answer": "모범 답변 (구체적이고 상세하게, 실무 관점 포함)"
}`

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)

  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}