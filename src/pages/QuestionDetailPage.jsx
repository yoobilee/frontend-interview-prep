import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { categories } from '../data/questions/index'
import useQuestionsStore from '../store/questionsStore'
import useBookmarkStore from '../store/bookmarkStore'
import {
  ArrowLeft, Lightbulb, FileText, Bookmark, BookmarkCheck,
  Target, Key, CheckSquare, Link, ChevronDown, Building2,
  MessageSquare, Send, Loader
} from 'lucide-react'
import { getAIFeedback } from '../utils/aiFeedback'

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

const CATEGORY_COLORS = {
  'html-css': '#60a5fa',
  'javascript': '#fbbf24',
  'react': '#34d399',
  'browser-network': '#a78bfa',
  'cs': '#f472b6',
  'performance': '#fb923c',
}

function QuestionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [checkedKeywords, setCheckedKeywords] = useState([])
  const { toggleBookmark, isBookmarked } = useBookmarkStore()
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')
  const { questions, fetchIfNeeded } = useQuestionsStore()

  useEffect(() => {
    fetchIfNeeded()
  }, [])

  const question = questions.find(q => q.id === Number(id))
  const currentIndex = questions.findIndex(q => q.id === Number(id))
  const prevQuestion = questions[currentIndex - 1]
  const nextQuestion = questions[currentIndex + 1]

  if (!question) return (
    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: '80px' }}>
      질문을 찾을 수 없습니다.
    </div>
  )

  const category = categories.find(c => c.id === question.categoryId)
  const categoryColor = CATEGORY_COLORS[question.categoryId] || 'var(--point)'
  const bookmarked = isBookmarked(question.id)

  const relatedQuestions = questions
    .filter(q => q.categoryId === question.categoryId && q.id !== question.id)
    .map(q => {
      const commonTags = q.tags.filter(tag => question.tags.includes(tag)).length
      return { ...q, commonTags }
    })
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, 3)

  const toggleKeyword = (kw) => {
    setCheckedKeywords(prev =>
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    )
  }

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>

      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/questions')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '40px',
          padding: 0,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={14} />
        질문 목록
      </button>

      {/* 상단 메타 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: categoryColor,
            backgroundColor: categoryColor + '15',
            padding: '4px 10px',
            borderRadius: '999px',
            letterSpacing: '0.05em',
          }}>
            {category?.label}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: DIFFICULTY_COLORS[question.difficulty],
            backgroundColor: DIFFICULTY_COLORS[question.difficulty] + '15',
            padding: '4px 10px',
            borderRadius: '999px',
          }}>
            {DIFFICULTY_LABELS[question.difficulty]}
          </span>
        </div>

        <button
          onClick={() => toggleBookmark(question.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: bookmarked ? categoryColor + '15' : 'transparent',
            border: `1px solid ${bookmarked ? categoryColor + '55' : 'var(--border)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            color: bookmarked ? categoryColor : 'var(--text-secondary)',
            transition: 'all 0.2s',
          }}
        >
          {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {bookmarked ? '저장됨' : '북마크'}
        </button>
      </div>

      {/* 질문 제목 */}
      <h1 style={{
        fontSize: 'clamp(22px, 3vw, 32px)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        marginBottom: '20px',
        letterSpacing: '-0.01em',
      }}>
        {question.title}
      </h1>

      {/* 태그 */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '48px' }}>
        {question.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '11px',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-surface)',
            padding: '3px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
          }}>
            {tag}
          </span>
        ))}
        {question.company?.map(c => (
          <span key={c} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            fontWeight: 700,
            color: COMPANY_COLORS[c] || 'var(--text-secondary)',
            backgroundColor: (COMPANY_COLORS[c] || '#888') + '15',
            padding: '3px 10px',
            borderRadius: '4px',
            border: `1px solid ${(COMPANY_COLORS[c] || '#888') + '44'}`,
          }}>
            <Building2 size={10} />
            {COMPANY_LABELS[c] || c} 기출
          </span>
        ))}
      </div>

      {/* 면접관의 의도 — 가장 강조 */}
      <div style={{
        background: `linear-gradient(135deg, ${categoryColor}18 0%, ${categoryColor}08 100%)`,
        border: `1px solid ${categoryColor}44`,
        borderRadius: '14px',
        padding: '28px 32px',
        marginBottom: '12px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 배경 글로우 */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          background: `radial-gradient(circle, ${categoryColor}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Target size={15} color={categoryColor} />
          <p style={{
            fontSize: '11px',
            fontWeight: 700,
            color: categoryColor,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            면접관의 의도
          </p>
        </div>
        <p style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          position: 'relative',
        }}>
          {question.intent}
        </p>
      </div>

      {/* 구분선 */}
      <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '32px 0' }} />

      {/* 핵심 키워드 */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={14} color={categoryColor} />
            <p style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              핵심 키워드
            </p>
          </div>
          <span style={{
            fontSize: '12px',
            color: checkedKeywords.length === question.keywords.length ? '#22c55e' : 'var(--text-secondary)',
            fontWeight: checkedKeywords.length === question.keywords.length ? 600 : 400,
            transition: 'color 0.2s',
          }}>
            {checkedKeywords.length} / {question.keywords.length}
            {checkedKeywords.length === question.keywords.length && ' ✓'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {question.keywords.map(kw => {
            const checked = checkedKeywords.includes(kw)
            return (
              <button
                key={kw}
                onClick={() => toggleKeyword(kw)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: checked ? categoryColor : 'var(--text-secondary)',
                  backgroundColor: checked ? categoryColor + '15' : 'var(--bg-surface)',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${checked ? categoryColor + '55' : 'var(--border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <CheckSquare size={13} strokeWidth={checked ? 2.5 : 1.5} />
                {kw}
              </button>
            )
          })}
        </div>
      </div>

      {/* 힌트 토글 */}
      <div style={{
        border: `1px solid ${showHint ? categoryColor + '55' : 'var(--border)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '10px',
        transition: 'border-color 0.2s',
      }}>
        <button
          style={{
            width: '100%',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setShowHint(!showHint)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lightbulb size={15} color={showHint ? categoryColor : 'var(--text-secondary)'} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>힌트</span>
          </div>
          <ChevronDown
            size={16}
            color='var(--text-secondary)'
            style={{
              transform: showHint ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {showHint && (
          <div style={{
            padding: '20px 24px',
            backgroundColor: 'var(--bg-elevated)',
            borderTop: `1px solid ${categoryColor}33`,
          }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {question.hint}
            </p>
          </div>
        )}
      </div>

      {/* 모범 답변 토글 */}
      <div style={{
        border: `1px solid ${showAnswer ? categoryColor + '55' : 'var(--border)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '40px',
        transition: 'border-color 0.2s',
      }}>
        <button
          style={{
            width: '100%',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={15} color={showAnswer ? categoryColor : 'var(--text-secondary)'} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>모범 답변</span>
          </div>
          <ChevronDown
            size={16}
            color='var(--text-secondary)'
            style={{
              transform: showAnswer ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        {showAnswer && (
          <div style={{
            padding: '24px',
            backgroundColor: 'var(--bg-elevated)',
            borderTop: `1px solid ${categoryColor}33`,
          }}>
            <pre style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              margin: 0,
            }}>
              {question.answer}
            </pre>
          </div>
        )}
      </div>

      {/* AI 피드백 */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <MessageSquare size={14} color={categoryColor} />
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            내 답변 작성
          </p>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            AI 피드백을 받아보세요
          </span>
        </div>

        <textarea
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          placeholder="면접관 앞에서 답변하듯이 작성해보세요..."
          style={{
            width: '100%',
            minHeight: '140px',
            padding: '14px',
            backgroundColor: 'var(--bg-elevated)',
            border: `1px solid ${userAnswer ? categoryColor + '55' : 'var(--border)'}`,
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

        <button
          onClick={async () => {
            if (!userAnswer.trim()) return
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
              const result = await getAIFeedback({ model, apiKey, question, userAnswer })
              setFeedback(result)
            } catch (e) {
              setFeedbackError('피드백을 불러오는 중 오류가 발생했습니다. API 키를 확인해주세요.')
            }
            setIsFeedbackLoading(false)
          }}
          disabled={!userAnswer.trim() || isFeedbackLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            padding: '10px 20px',
            backgroundColor: !userAnswer.trim() || isFeedbackLoading ? 'var(--bg-elevated)' : categoryColor,
            color: !userAnswer.trim() || isFeedbackLoading ? 'var(--text-muted)' : '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: !userAnswer.trim() || isFeedbackLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {isFeedbackLoading ? <Loader size={14} /> : <Send size={14} />}
          {isFeedbackLoading ? 'AI 분석 중...' : 'AI 피드백 받기'}
        </button>

        {feedbackError && (
          <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '12px' }}>
            {feedbackError}
          </p>
        )}

        {feedback && (
          <div style={{
            marginTop: '16px',
            padding: '20px',
            backgroundColor: 'var(--bg-elevated)',
            border: `1px solid ${categoryColor}33`,
            borderRadius: '10px',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: categoryColor, marginBottom: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              AI 피드백
            </p>
            <pre style={{
              fontSize: '14px',
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

      {/* 관련 질문 */}
      {relatedQuestions.length > 0 && (
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Link size={14} color='var(--text-secondary)' />
            <p style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}>
              관련 질문
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {relatedQuestions.map(rq => (
              <button
                key={rq.id}
                onClick={() => {
                  navigate(`/questions/${rq.id}`)
                  setShowHint(false)
                  setShowAnswer(false)
                  setCheckedKeywords([])
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = categoryColor + '66'
                  e.currentTarget.style.backgroundColor = 'var(--bg-elevated)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {rq.title}
                </span>
                <ArrowLeft size={14} color='var(--text-secondary)' style={{ transform: 'rotate(180deg)', flexShrink: 0, marginLeft: '12px' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 이전/다음 네비게이션 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        paddingTop: '32px',
        borderTop: '1px solid var(--border)',
      }}>
        <button
          onClick={() => prevQuestion && navigate(`/questions/${prevQuestion.id}`)}
          disabled={!prevQuestion}
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            cursor: prevQuestion ? 'pointer' : 'not-allowed',
            opacity: prevQuestion ? 1 : 0.3,
            textAlign: 'left',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => prevQuestion && (e.currentTarget.style.borderColor = 'var(--text-muted)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>← 이전</p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {prevQuestion?.title}
          </p>
        </button>

        <button
          onClick={() => nextQuestion && navigate(`/questions/${nextQuestion.id}`)}
          disabled={!nextQuestion}
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            cursor: nextQuestion ? 'pointer' : 'not-allowed',
            opacity: nextQuestion ? 1 : 0.3,
            textAlign: 'right',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => nextQuestion && (e.currentTarget.style.borderColor = 'var(--text-muted)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>다음 →</p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {nextQuestion?.title}
          </p>
        </button>
      </div>
    </div>
  )
}

export default QuestionDetailPage