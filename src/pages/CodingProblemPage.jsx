import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { problems } from '../data/problems'
import { ArrowLeft, Play, Lightbulb, ChevronDown, CheckCircle, XCircle, Loader } from 'lucide-react'
import { getAIFeedback } from '../utils/aiFeedback'
import { MessageSquare, Send } from 'lucide-react'

const DIFFICULTY_COLORS = {
  easy: '#22c55e',
  medium: '#f97316',
  hard: '#ef4444',
}

const DIFFICULTY_LABELS = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

const LANGUAGE_OPTIONS = [
  { id: 'javascript', label: 'JavaScript', judgeId: 63 },
  { id: 'typescript', label: 'TypeScript', judgeId: 74 },
  { id: 'python', label: 'Python', judgeId: 71 },
]

const RAPIDAPI_KEY = '1f5436702cmshd1f2667bc456583p1817d2jsn7cdf50b5f19f'

async function runCode(code, languageId, input) {
  const submitRes = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({
      source_code: code,
      language_id: languageId,
      stdin: input,
    }),
  })
  return await submitRes.json()
}

function CodingProblemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const problem = problems.find(p => p.id === Number(id))

  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [code, setCode] = useState(problem?.starterCode.javascript || '')
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState('problem')
  const [feedback, setFeedback] = useState('')
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')

  if (!problem) return (
    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: '80px' }}>
      문제를 찾을 수 없습니다.
    </div>
  )

  const difficultyColor = DIFFICULTY_COLORS[problem.difficulty]

  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId)
    setCode(problem.starterCode[langId] || '')
  }

  const handleRun = async () => {
    setIsRunning(true)
    setTestResults([])

    const language = LANGUAGE_OPTIONS.find(l => l.id === selectedLanguage)
    const results = []
    const runner = problem.runnerCode?.[selectedLanguage] || ''

    for (const tc of problem.testCases) {
      try {
        const fullCode = code + '\n' + runner
        const result = await runCode(fullCode, language.judgeId, tc.input)
        const output = (result.stdout || '').trim()
        const expected = tc.expectedOutput.trim()
        results.push({
          input: tc.input,
          expected,
          output,
          passed: output === expected,
          error: result.stderr || result.compile_output || null,
        })
      } catch (e) {
        results.push({
          input: tc.input,
          expected: tc.expectedOutput,
          output: '',
          passed: false,
          error: '실행 중 오류가 발생했습니다.',
        })
      }
    }

    setTestResults(results)
    setIsRunning(false)
    setActiveTab('result')
  }

  const allPassed = testResults.length > 0 && testResults.every(r => r.passed)

  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

      {/* 상단 바 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        marginBottom: '16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <button
          onClick={() => navigate('/coding')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: 'var(--text-secondary)',
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={14} />
          문제 목록
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* 언어 선택 드롭다운 */}
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              padding: '7px 14px',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {LANGUAGE_OPTIONS.map(lang => (
              <option key={lang.id} value={lang.id} style={{ backgroundColor: 'var(--bg-surface)' }}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* 실행 버튼 */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px',
              backgroundColor: isRunning ? 'var(--bg-elevated)' : 'var(--point)',
              color: isRunning ? 'var(--text-muted)' : '#fff',
              border: 'none', borderRadius: '8px',
              fontSize: '13px', fontWeight: 700,
              cursor: isRunning ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {isRunning ? <Loader size={14} /> : <Play size={14} />}
            {isRunning ? '실행 중...' : '실행'}
          </button>
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div style={{ display: 'flex', gap: '16px', flex: 1, overflow: 'hidden' }}>

        {/* 왼쪽 - 문제 설명 */}
        <div style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
        }}>
          {/* 탭 */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            padding: '0 20px',
          }}>
            {['problem', 'result'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? 'var(--point)' : 'var(--text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--point)' : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: '-1px',
                }}
              >
                {tab === 'problem' ? '문제' : `결과 ${testResults.length > 0 ? `(${testResults.filter(r => r.passed).length}/${testResults.length})` : ''}`}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {activeTab === 'problem' ? (
              <div>
                {/* 제목 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    color: difficultyColor,
                    backgroundColor: difficultyColor + '15',
                    padding: '4px 10px', borderRadius: '999px',
                  }}>
                    {DIFFICULTY_LABELS[problem.difficulty]}
                  </span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {problem.title}
                </h2>

                {/* 설명 */}
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px', whiteSpace: 'pre-line' }}>
                  {problem.description}
                </p>

                {/* 예시 */}
                <div style={{ marginBottom: '24px' }}>
                  {problem.examples.map((ex, i) => (
                    <div key={i} style={{
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      marginBottom: '10px',
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        예시 {i + 1}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'monospace', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>입력: </span>{ex.input}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'monospace', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>출력: </span>{ex.output}
                      </p>
                      {ex.explanation && (
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          {ex.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* 제약 조건 */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    제약 조건
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {problem.constraints.map((c, i) => (
                      <li key={i} style={{
                        fontSize: '13px', color: 'var(--text-secondary)',
                        fontFamily: 'monospace', padding: '3px 0',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        <span style={{ color: 'var(--point)', fontSize: '10px' }}>▸</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 힌트 토글 */}
                <div style={{
                  border: `1px solid ${showHint ? difficultyColor + '55' : 'var(--border)'}`,
                  borderRadius: '10px', overflow: 'hidden',
                  marginBottom: '10px', transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    style={{
                      width: '100%', padding: '12px 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-elevated)', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Lightbulb size={14} color={showHint ? difficultyColor : 'var(--text-secondary)'} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>힌트</span>
                    </div>
                    <ChevronDown size={14} color='var(--text-secondary)' style={{ transform: showHint ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                  {showHint && (
                    <div style={{ padding: '12px 16px', borderTop: `1px solid ${difficultyColor}33` }}>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{problem.hint}</p>
                    </div>
                  )}
                </div>

                {/* 모범 풀이 토글 */}
                <div style={{
                  border: `1px solid ${showSolution ? difficultyColor + '55' : 'var(--border)'}`,
                  borderRadius: '10px', overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    style={{
                      width: '100%', padding: '12px 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-elevated)', border: 'none', cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>모범 풀이</span>
                    </div>
                    <ChevronDown size={14} color='var(--text-secondary)' style={{ transform: showSolution ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  </button>
                  {showSolution && (
                    <div style={{ padding: '12px 16px', borderTop: `1px solid ${difficultyColor}33` }}>
                      <pre style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace', margin: 0 }}>
                        {problem.solution[selectedLanguage] || problem.solution.javascript}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {testResults.length === 0 ? (
                  <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      코드를 실행하면 결과가 여기에 표시됩니다.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* 전체 결과 */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '16px',
                      backgroundColor: allPassed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${allPassed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      borderRadius: '10px',
                      marginBottom: '16px',
                    }}>
                      {allPassed
                        ? <CheckCircle size={20} color='#22c55e' />
                        : <XCircle size={20} color='#ef4444' />
                      }
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: allPassed ? '#22c55e' : '#ef4444' }}>
                          {allPassed ? '모든 테스트 통과!' : '일부 테스트 실패'}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {testResults.filter(r => r.passed).length} / {testResults.length} 통과
                        </p>
                      </div>
                    </div>

                    {/* 개별 결과 */}
                    {testResults.map((result, i) => (
                      <div key={i} style={{
                        backgroundColor: 'var(--bg-elevated)',
                        border: `1px solid ${result.passed ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        borderRadius: '8px',
                        padding: '14px 16px',
                        marginBottom: '8px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          {result.passed
                            ? <CheckCircle size={14} color='#22c55e' />
                            : <XCircle size={14} color='#ef4444' />
                          }
                          <span style={{ fontSize: '13px', fontWeight: 600, color: result.passed ? '#22c55e' : '#ef4444' }}>
                            테스트 {i + 1} {result.passed ? '통과' : '실패'}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                            입력: <span style={{ color: 'var(--text-secondary)' }}>{result.input}</span>
                          </p>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                            예상: <span style={{ color: 'var(--text-secondary)' }}>{result.expected}</span>
                          </p>
                          <p style={{ color: 'var(--text-muted)', marginBottom: result.error ? '4px' : '0' }}>
                            출력: <span style={{ color: result.passed ? '#22c55e' : '#ef4444' }}>{result.output || '(없음)'}</span>
                          </p>
                          {result.error && (
                            <p style={{ color: '#ef4444', marginTop: '6px', whiteSpace: 'pre-wrap' }}>
                              {result.error}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    {/* AI 코드 피드백 */}
                    <div style={{
                      marginTop: '16px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <MessageSquare size={13} color={difficultyColor} />
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          AI 코드 피드백
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          const model = localStorage.getItem('ai_model') || 'claude'
                          const apiKey = localStorage.getItem(`api_key_${model}`) || ''
                          if (!apiKey) {
                            setFeedbackError('설정 페이지에서 API 키를 먼저 입력해주세요.')
                            return
                          }
                          setIsFeedbackLoading(true)
                          setFeedback('')
                          setFeedbackError('')
                          try {
                            const prompt = `당신은 코딩 테스트 전문 면접관입니다. 다음 문제에 대한 지원자의 코드를 평가해주세요.

문제: ${problem.title}
난이도: ${problem.difficulty}
언어: ${selectedLanguage}

지원자 코드:
${code}

테스트 결과: ${testResults.filter(r => r.passed).length}/${testResults.length} 통과

다음 형식으로 피드백을 제공해주세요:

**종합 평가** (상/중/하)
한 줄 요약

**코드 품질**
- 가독성, 변수명, 구조 등

**시간/공간 복잡도**
- 현재 코드의 복잡도 분석

**개선 방향**
- 더 효율적이거나 깔끔한 방법

**잘한 점**
- 구체적인 내용`

                            const result = await fetch(
                              model === 'gemini'
                                ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`
                                : model === 'gpt'
                                  ? 'https://api.openai.com/v1/chat/completions'
                                  : 'https://api.anthropic.com/v1/messages',
                              {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  ...(model === 'claude' && { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }),
                                  ...(model === 'gpt' && { 'Authorization': `Bearer ${apiKey}` }),
                                },
                                body: JSON.stringify(
                                  model === 'gemini'
                                    ? { contents: [{ parts: [{ text: prompt }] }] }
                                    : model === 'gpt'
                                      ? { model: 'gpt-4', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }
                                      : { model: 'claude-opus-4-5', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }
                                ),
                              }
                            )
                            const data = await result.json()
                            if (data.error) throw new Error(data.error.message)
                            const text = model === 'gemini'
                              ? data.candidates[0].content.parts[0].text
                              : model === 'gpt'
                                ? data.choices[0].message.content
                                : data.content[0].text
                            setFeedback(text)
                          } catch (e) {
                            setFeedbackError('피드백을 불러오는 중 오류가 발생했습니다.')
                          }
                          setIsFeedbackLoading(false)
                        }}
                        disabled={isFeedbackLoading}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          backgroundColor: isFeedbackLoading ? 'var(--bg-elevated)' : difficultyColor,
                          color: isFeedbackLoading ? 'var(--text-muted)' : '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: isFeedbackLoading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        {isFeedbackLoading ? <Loader size={13} /> : <Send size={13} />}
                        {isFeedbackLoading ? 'AI 분석 중...' : '내 코드 AI 피드백 받기'}
                      </button>

                      {feedbackError && (
                        <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '10px' }}>
                          {feedbackError}
                        </p>
                      )}

                      {feedback && (
                        <div style={{
                          marginTop: '12px',
                          padding: '16px',
                          backgroundColor: 'var(--bg-elevated)',
                          border: `1px solid ${difficultyColor}33`,
                          borderRadius: '8px',
                        }}>
                          <pre style={{
                            fontSize: '13px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit',
                            margin: 0,
                          }}>
                            {feedback}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 - 코드 에디터 */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {LANGUAGE_OPTIONS.find(l => l.id === selectedLanguage)?.label}
            </span>
            <button
              onClick={() => setCode(problem.starterCode[selectedLanguage] || '')}
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              초기화
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              language={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingProblemPage