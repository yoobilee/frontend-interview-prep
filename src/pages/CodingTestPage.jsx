import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { problems, categories } from '../data/problems'
import { Code, ChevronRight } from 'lucide-react'

const CATEGORY_COLORS = {
  'array': '#60a5fa',
  'string': '#34d399',
  'stack': '#a78bfa',
  'dp': '#f472b6',
  'tree': '#fbbf24',
  'graph': '#fb923c',
}

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

function CodingTestPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const filtered = problems.filter(p => {
    const c = selectedCategory === 'all' || p.category === selectedCategory
    const d = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty
    return c && d
  })

  return (
    <div>
      {/* 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Code size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            코딩 테스트
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {filtered.length}개의 문제
        </p>
      </div>

      {/* 필터 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '32px',
        borderBottom: '1px solid var(--border)',
        gap: '24px',
      }}>
        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--point)' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  marginBottom: '-1px',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* 난이도 세그먼트 */}
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '3px',
          gap: '2px',
          flexShrink: 0,
          marginBottom: '8px',
        }}>
          {[
            { id: 'all', label: '전체' },
            { id: 'easy', label: '쉬움' },
            { id: 'medium', label: '보통' },
            { id: 'hard', label: '어려움' },
          ].map(diff => {
            const isActive = selectedDifficulty === diff.id
            return (
              <button
                key={diff.id}
                onClick={() => setSelectedDifficulty(diff.id)}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                  border: 'none',
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

      {/* 문제 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((problem, index) => (
          <div
            key={problem.id}
            onClick={() => navigate(`/coding/${problem.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              const color = CATEGORY_COLORS[problem.category] || 'var(--point)'
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
              e.currentTarget.style.boxShadow = `0 0 0 1px ${color}, 0 0 20px ${color}66, 0 4px 40px ${color}33`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* 왼쪽 컬러 바 */}
            <div style={{
              width: '3px',
              alignSelf: 'stretch',
              backgroundColor: CATEGORY_COLORS[problem.category] || 'var(--point)',
              flexShrink: 0,
            }} />

            {/* 번호 */}
            <div style={{ padding: '20px', flexShrink: 0 }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* 콘텐츠 */}
            <div style={{ flex: 1, padding: '20px 20px 20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: DIFFICULTY_COLORS[problem.difficulty],
                }}>
                  {DIFFICULTY_LABELS[problem.difficulty]}
                </span>
                <span style={{ color: 'var(--border)', fontSize: '11px' }}>·</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {categories.find(c => c.id === problem.category)?.label}
                </span>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {problem.title}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {problem.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-base)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 화살표 */}
            <div style={{ padding: '20px', flexShrink: 0 }}>
              <ChevronRight size={16} color='var(--text-secondary)' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodingTestPage