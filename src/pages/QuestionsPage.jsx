import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/questions/index'
import useQuestionsStore from '../store/questionsStore'
import { BookOpen, Search } from 'lucide-react'

const DIFFICULTIES = [
  { id: 'all', label: '전체' },
  { id: 'easy', label: '쉬움' },
  { id: 'medium', label: '보통' },
  { id: 'hard', label: '어려움' },
]

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

const CATEGORY_COLORS = {
  'html-css': '#60a5fa',
  'javascript': '#fbbf24',
  'react': '#34d399',
  'browser-network': '#a78bfa',
  'cs': '#f472b6',
  'performance': '#fb923c',
}

const COMPANY_LABELS = {
  naver: '네이버',
  kakao: '카카오',
  line: '라인',
  coupang: '쿠팡',
  baemin: '배민',
  toss: '토스',
}

const COMPANY_COLORS = {
  naver: '#03C75A',
  kakao: '#FEE500',
  line: '#06C755',
  coupang: '#FECC00',
  baemin: '#2AC1BC',
  toss: '#0064FF',
}

function QuestionsPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { questions, loading, fetchIfNeeded } = useQuestionsStore()

  useEffect(() => {
    fetchIfNeeded()
  }, [])

  const filtered = questions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.categoryId === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    const searchMatch = searchQuery === '' ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && difficultyMatch && searchMatch
  })

  if (loading) return (
    <div style={{ textAlign: 'center', paddingTop: '80px', color: 'var(--text-secondary)' }}>
      불러오는 중...
    </div>
  )

  return (
    <div>
      {/* 헤더 */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <BookOpen size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            질문 목록
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {filtered.length}개의 질문
        </p>
      </div>

      {/* 검색 */}
      <div style={{
        position: 'relative',
        marginBottom: '24px',
      }}>
        <Search size={15} color='var(--text-muted)' style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }} />
        <input
          type='text'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='질문 또는 태그로 검색...'
          style={{
            width: '100%',
            padding: '10px 14px 10px 38px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--point)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* 필터 영역 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '32px',
        borderBottom: '1px solid var(--border)',
        gap: '24px',
      }}>
        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[{ id: 'all', label: '전체' }, ...categories].map(cat => {
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
          {DIFFICULTIES.map(diff => {
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

      {/* 질문 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map((q, index) => {
          const categoryColor = CATEGORY_COLORS[q.categoryId] || 'var(--point)'
          return (
            <div
              key={q.id}
              onClick={() => navigate(`/questions/${q.id}`)}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 0.15s, background-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                e.currentTarget.style.boxShadow = `0 0 0 1px ${categoryColor}, 0 0 20px ${categoryColor}66, 0 4px 40px ${categoryColor}33`
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
                backgroundColor: categoryColor,
                flexShrink: 0,
              }} />

              {/* 번호 */}
              <div style={{
                padding: '20px 20px',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '0.05em',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* 콘텐츠 */}
              <div style={{ flex: 1, padding: '20px 20px 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: categoryColor,
                    letterSpacing: '0.05em',
                  }}>
                    {categories.find(c => c.id === q.categoryId)?.label}
                  </span>
                  <span style={{ color: 'var(--border)', fontSize: '11px' }}>·</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: DIFFICULTY_COLORS[q.difficulty],
                  }}>
                    {DIFFICULTY_LABELS[q.difficulty]}
                  </span>
                  {/* 기업 배지 */}
                  {q.company?.length > 0 && (
                    <>
                      <span style={{ color: 'var(--border)', fontSize: '11px' }}>·</span>
                      {q.company.map(c => (
                        <span key={c} style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: COMPANY_COLORS[c] || 'var(--text-secondary)',
                          backgroundColor: (COMPANY_COLORS[c] || '#888') + '15',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          border: `1px solid ${(COMPANY_COLORS[c] || '#888') + '44'}`,
                        }}>
                          {COMPANY_LABELS[c] || c}
                        </span>
                      ))}
                    </>
                  )}
                </div>

                <p style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  marginBottom: '10px',
                }}>
                  {q.title}
                </p>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {q.tags.map(tag => (
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
              <div style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-muted)',
                fontSize: '16px',
                flexShrink: 0,
              }}>
                →
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionsPage