import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Settings, Lightbulb, X, Send } from 'lucide-react'
import { categories } from '../data/questions/index'
import { supabase } from '../lib/supabase'

const DIFFICULTIES = [
  { id: 'easy', label: '쉬움', color: '#22c55e' },
  { id: 'medium', label: '보통', color: '#f97316' },
  { id: 'hard', label: '어려움', color: '#ef4444' },
]

function Layout({ children }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', category_id: 'html-css', difficulty: 'easy' })
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
      submitter: '익명',
    })
    if (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.')
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  const handleClose = () => {
    setShowModal(false)
    setSubmitted(false)
    setForm({ title: '', category_id: 'html-css', difficulty: 'easy' })
    setError('')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <header style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-base)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img src='/favicon.svg' alt='logo' style={{ width: '28px', height: '28px' }} />
            <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--point)' }}>
              FE Interview
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <nav style={{ display: 'flex', gap: '32px' }}>
              {[
                { to: '/questions', label: '질문 목록' },
                { to: '/coding', label: '코딩 테스트' },
                { to: '/practice', label: '연습 모드' },
                { to: '/bookmarks', label: '북마크' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <NavLink
              to="/settings"
              style={({ isActive }) => ({
                color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
              })}
            >
              <Settings size={18} />
            </NavLink>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        {children}
      </main>

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 20px',
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          zIndex: 40,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--point)'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.borderColor = 'var(--point)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
          e.currentTarget.style.color = 'var(--text-secondary)'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <Lightbulb size={15} />
        질문 제보
      </button>

      {/* 모달 오버레이 */}
      {showModal && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
            }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <Lightbulb size={24} color='#22c55e' />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  제보해주셔서 감사합니다!
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  검토 후 질문 목록에 추가될 예정입니다.
                </p>
              </div>
            ) : (
              <>
                {/* 헤더 */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <Lightbulb size={18} color='var(--point)' />
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      질문 제보
                    </h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    면접에서 받았던 질문을 공유해주세요.
                  </p>
                </div>

                {/* 질문 내용 */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px', fontWeight: 700,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    질문 내용 *
                  </p>
                  <textarea
                    value={form.title}
                    onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="예) React의 Virtual DOM이란 무엇인가요?"
                    style={{
                      width: '100%',
                      minHeight: '90px',
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: `1px solid ${form.title ? 'var(--point)' : 'var(--border)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.7,
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                    }}
                  />
                </div>

                {/* 카테고리 */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '11px', fontWeight: 700,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    카테고리
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {categories.map(cat => {
                      const isActive = form.category_id === cat.id
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setForm(prev => ({ ...prev, category_id: cat.id }))}
                          style={{
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'rgba(249,115,22,0.1)' : 'var(--bg-elevated)',
                            border: `1px solid ${isActive ? 'var(--point)' : 'var(--border)'}`,
                            borderRadius: '6px',
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
                <div style={{ marginBottom: '24px' }}>
                  <p style={{
                    fontSize: '11px', fontWeight: 700,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    난이도
                  </p>
                  <div style={{
                    display: 'flex',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '3px',
                    gap: '2px',
                  }}>
                    {DIFFICULTIES.map(diff => {
                      const isActive = form.difficulty === diff.id
                      return (
                        <button
                          key={diff.id}
                          onClick={() => setForm(prev => ({ ...prev, difficulty: diff.id }))}
                          style={{
                            flex: 1,
                            padding: '7px 12px',
                            fontSize: '12px',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? diff.color : 'var(--text-secondary)',
                            backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                            border: `1px solid ${isActive ? diff.color + '55' : 'transparent'}`,
                            borderRadius: '6px',
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

                {error && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginBottom: '12px' }}>
                    {error}
                  </p>
                )}

                {/* 제출 버튼 */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: loading ? 'var(--bg-elevated)' : 'var(--point)',
                    color: loading ? 'var(--text-muted)' : '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.15s',
                  }}
                >
                  <Send size={14} />
                  {loading ? '제보 중...' : '질문 제보하기'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout