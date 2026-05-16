import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

const CATEGORY_LABELS = {
  'html-css': 'HTML/CSS',
  'javascript': 'JavaScript',
  'react': 'React',
  'browser-network': '브라우저/네트워크',
  'cs': 'CS 기초',
  'performance': '성능 최적화',
}

const DIFFICULTY_LABELS = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
}

const DIFFICULTY_COLORS = {
  easy: '#22c55e',
  medium: '#f97316',
  hard: '#ef4444',
}

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('pending')

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      setPasswordError('비밀번호가 틀렸습니다.')
    }
  }

  const fetchSuggestions = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('suggestions')
      .select('*')
      .order('created_at', { ascending: false })
    setSuggestions(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) fetchSuggestions()
  }, [authenticated])

  const handleApprove = async (suggestion) => {
    // questions 테이블에 추가
    await supabase.from('questions').insert({
      category_id: suggestion.category_id,
      title: suggestion.title,
      difficulty: suggestion.difficulty,
      tags: [],
      intent: suggestion.intent,
      keywords: suggestion.keywords,
      hint: suggestion.hint,
      answer: suggestion.answer,
    })

    // status 업데이트
    await supabase.from('suggestions').update({ status: 'approved' }).eq('id', suggestion.id)
    fetchSuggestions()
  }

  const handleReject = async (id) => {
    await supabase.from('suggestions').update({ status: 'rejected' }).eq('id', id)
    fetchSuggestions()
  }

  const filtered = suggestions.filter(s => filter === 'all' || s.status === filter)

  if (!authenticated) return (
    <div style={{ maxWidth: '400px', margin: '120px auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '32px' }}>
        관리자 로그인
      </h1>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleLogin()}
        placeholder='비밀번호'
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          fontSize: '14px',
          color: 'var(--text-primary)',
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: '8px',
        }}
      />
      {passwordError && (
        <p style={{ fontSize: '12px', color: '#ef4444', marginBottom: '8px' }}>{passwordError}</p>
      )}
      <button
        onClick={handleLogin}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: 'var(--point)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        로그인
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          질문 제보 관리
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          총 {suggestions.length}개 제보
        </p>
      </div>

      {/* 필터 */}
      <div style={{
        display: 'flex',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '3px',
        gap: '2px',
        marginBottom: '24px',
        width: 'fit-content',
      }}>
        {[
          { id: 'pending', label: '대기중' },
          { id: 'approved', label: '승인됨' },
          { id: 'rejected', label: '거절됨' },
          { id: 'all', label: '전체' },
        ].map(f => {
          const isActive = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--point)' : 'transparent'}`,
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f.label} ({suggestions.filter(s => f.id === 'all' || s.status === f.id).length})
            </button>
          )
        })}
      </div>

      {/* 목록 */}
      {loading ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: '40px' }}>불러오는 중...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', paddingTop: '40px' }}>제보가 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(s => (
            <div
              key={s.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {/* 헤더 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 600,
                      color: DIFFICULTY_COLORS[s.difficulty] || 'var(--text-secondary)',
                    }}>
                      {DIFFICULTY_LABELS[s.difficulty] || s.difficulty}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {CATEGORY_LABELS[s.category_id] || s.category_id}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {new Date(s.created_at).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {s.title}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
                  {s.status === 'pending' && (
                    <>
                      <button
                        onClick={e => { e.stopPropagation(); handleApprove(s) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(34,197,94,0.1)',
                          color: '#22c55e',
                          border: '1px solid rgba(34,197,94,0.3)',
                          borderRadius: '6px',
                          fontSize: '12px', fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <CheckCircle size={13} />
                        승인
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); handleReject(s.id) }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(239,68,68,0.1)',
                          color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '6px',
                          fontSize: '12px', fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <XCircle size={13} />
                        거절
                      </button>
                    </>
                  )}
                  {s.status === 'approved' && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>✓ 승인됨</span>
                  )}
                  {s.status === 'rejected' && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>✗ 거절됨</span>
                  )}
                  {expandedId === s.id ? <ChevronUp size={16} color='var(--text-muted)' /> : <ChevronDown size={16} color='var(--text-muted)' />}
                </div>
              </div>

              {/* 펼쳐지는 상세 내용 */}
              {expandedId === s.id && (
                <div style={{
                  padding: '0 20px 20px',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                }}>
                  {s.intent && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>면접관 의도</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.intent}</p>
                    </div>
                  )}
                  {s.keywords?.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>핵심 키워드</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {s.keywords.map(kw => (
                          <span key={kw} style={{
                            fontSize: '12px', color: 'var(--text-secondary)',
                            backgroundColor: 'var(--bg-elevated)',
                            padding: '3px 10px', borderRadius: '4px',
                            border: '1px solid var(--border)',
                          }}>{kw}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {s.hint && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>힌트</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.hint}</p>
                    </div>
                  )}
                  {s.answer && (
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>모범 답변</p>
                      <pre style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{s.answer}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPage