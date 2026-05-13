import { useNavigate } from 'react-router-dom'
import { questions, categories } from '../data/questions/index'
import useBookmarkStore from '../store/bookmarkStore'
import { Bookmark, BookmarkCheck } from 'lucide-react'

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

function BookmarksPage() {
  const navigate = useNavigate()
  const { bookmarks, toggleBookmark } = useBookmarkStore()

  const bookmarkedQuestions = questions.filter(q => bookmarks.includes(q.id))

  // 카테고리별 그룹핑
  const grouped = categories.reduce((acc, cat) => {
    const items = bookmarkedQuestions.filter(q => q.categoryId === cat.id)
    if (items.length > 0) acc.push({ category: cat, items })
    return acc
  }, [])

  return (
    <div>
      {/* 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Bookmark size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            북마크
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {bookmarkedQuestions.length}개의 저장된 질문
        </p>
      </div>

      {/* 비어있을 때 */}
      {bookmarkedQuestions.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
          gap: '16px',
        }}>
          <Bookmark size={40} color='var(--text-muted)' strokeWidth={1.5} />
          <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
            아직 북마크한 질문이 없어요
          </p>
          <button
            onClick={() => navigate('/questions')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginTop: '8px',
            }}
          >
            질문 목록으로 가기
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {grouped.map(({ category, items }) => {
            const categoryColor = CATEGORY_COLORS[category.id] || 'var(--point)'
            return (
              <div key={category.id}>
                {/* 카테고리 헤더 */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: `1px solid ${categoryColor}33`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: categoryColor,
                    }} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: categoryColor,
                    }}>
                      {category.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid var(--border)',
                  }}>
                    {items.length}개
                  </span>
                </div>

                {/* 질문 카드들 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(q => (
                    <div
                      key={q.id}
                      style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
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
                      <div style={{ width: '3px', backgroundColor: categoryColor, flexShrink: 0 }} />

                      {/* 콘텐츠 */}
                      <div
                        style={{ flex: 1, padding: '18px 20px', cursor: 'pointer' }}
                        onClick={() => navigate(`/questions/${q.id}`)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: DIFFICULTY_COLORS[q.difficulty] }}>
                            {DIFFICULTY_LABELS[q.difficulty]}
                          </span>
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '10px' }}>
                          {q.title}
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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

                      {/* 북마크 해제 버튼 */}
                      <div style={{ padding: '18px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <button
                          onClick={() => toggleBookmark(q.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            backgroundColor: categoryColor + '15',
                            border: `1px solid ${categoryColor}44`,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: categoryColor,
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#ef444420'
                            e.currentTarget.style.borderColor = '#ef4444'
                            e.currentTarget.style.color = '#ef4444'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = categoryColor + '15'
                            e.currentTarget.style.borderColor = categoryColor + '44'
                            e.currentTarget.style.color = categoryColor
                          }}
                          title='북마크 해제'
                        >
                          <BookmarkCheck size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default BookmarksPage