import { useState } from 'react'
import { Send, CheckCircle, Lightbulb } from 'lucide-react'
import { categories } from '../data/questions/index'
import { supabase } from '../lib/supabase'

const DIFFICULTIES = [
  { id: 'easy', label: '쉬움' },
  { id: 'medium', label: '보통' },
  { id: 'hard', label: '어려움' },
]

function SuggestPage() {
  const [form, setForm] = useState({
    title: '',
    category_id: 'html-css',
    difficulty: 'easy',
    submitter: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError('질문 내용을 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.from('suggestions').insert({
      title: form.title.trim(),
      category_id: form.category_id,
      difficulty: form.difficulty,
      submitter: form.submitter.trim() || '익명',
    })

    if (error) {
      setError('제보 중 오류가 발생했습니다. 다시 시도해주세요.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) return (
    <div style={{ maxWidth: '520px', margin: '80px auto', textAlign: 'center' }}>
      <div style={{
        width: '64px', height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(34,197,94,0.1)',
        border: '1px solid rgba(34,197,94,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <CheckCircle size={32} color='#22c55e' />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
        제보해주셔서 감사합니다!
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
        검토 후 질문 목록에 추가될 예정입니다.
      </p>
      <button
        onClick={() => { setSubmitted(false); setForm({ title: '', category_id: 'html-css', difficulty: 'easy', submitter: '' }) }}
        style={{
          padding: '12px 24px',
          backgroundColor: 'var(--point)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        다른 질문 제보하기
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Lightbulb size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            질문 제보
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          면접에서 받았던 질문을 공유해주세요. 검토 후 질문 목록에 추가됩니다.
        </p>
      </div>

      {/* 폼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* 질문 내용 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            질문 내용 *
          </p>
          <textarea
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="예) React의 Virtual DOM이란 무엇인가요?"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '14px',
              backgroundColor: 'var(--bg-elevated)',
              border: `1px solid ${form.title ? 'var(--point)' : 'var(--border)'}`,
              borderRadius: '8px',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />
        </div>

        {/* 카테고리 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            카테고리
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => {
              const isActive = form.category_id === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setForm(prev => ({ ...prev, category_id: cat.id }))}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(249,115,22,0.1)' : 'var(--bg-elevated)',
                    border: `1px solid ${isActive ? 'var(--point)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 난이도 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            난이도
          </p>
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '3px',
            gap: '2px',
          }}>
            {DIFFICULTIES.map(diff => {
              const isActive = form.difficulty === diff.id
              const colors = { easy: '#22c55e', medium: '#f97316', hard: '#ef4444' }
              return (
                <button
                  key={diff.id}
                  onClick={() => setForm(prev => ({ ...prev, difficulty: diff.id }))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? colors[diff.id] : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    border: `1px solid ${isActive ? colors[diff.id] + '55' : 'transparent'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {diff.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 제보자 이름 */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            제보자 이름
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            입력하지 않으면 익명으로 표시됩니다.
          </p>
          <input
            type='text'
            value={form.submitter}
            onChange={e => setForm(prev => ({ ...prev, submitter: e.target.value }))}
            placeholder="이름 또는 닉네임 (선택)"
            style={{
              width: '100%',
              padding: '10px 14px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: '#ef4444' }}>{error}</p>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: loading ? 'var(--bg-elevated)' : 'var(--point)',
            color: loading ? 'var(--text-muted)' : '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '4px',
          }}
        >
          <Send size={15} />
          {loading ? '제보 중...' : '질문 제보하기'}
        </button>
      </div>
    </div>
  )
}

export default SuggestPage