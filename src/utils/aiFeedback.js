export async function getAIFeedback({ model, apiKey, question, userAnswer }) {
  const prompt = `당신은 프론트엔드 개발자 면접관입니다. 다음 면접 질문에 대한 지원자의 답변을 평가해주세요.

면접 질문: ${question.title}

면접관의 의도: ${question.intent}

핵심 키워드: ${question.keywords.join(', ')}

지원자의 답변:
${userAnswer}

다음 형식으로 피드백을 제공해주세요:

**종합 평가** (상/중/하)
한 줄 요약

**잘한 점**
- 구체적인 내용

**개선할 점**
- 구체적인 내용

**핵심 키워드 언급 여부**
포함된 키워드와 빠진 키워드 분석

**모범 답변 힌트**
더 좋은 답변을 위한 방향 제시`

  if (model === 'claude') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return data.content[0].text

  } else if (model === 'gpt') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return data.choices[0].message.content

  } else if (model === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return data.candidates[0].content.parts[0].text

  } else if (model === 'groq') {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return data.choices[0].message.content
  }

  throw new Error('지원하지 않는 모델입니다.')
}