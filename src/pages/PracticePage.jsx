import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions, categories } from '../data/questions/index'
import { Timer, ChevronDown, Lightbulb, FileText, RotateCcw, CheckCircle, Key, CheckSquare } from 'lucide-react'

const CATEGORY_COLORS = {
  'html-css': '#60a5fa',
  'javascript': '#fbbf24',
  'react': '#34d399',
  'browser-network': '#a78bfa',
  'cs': '#f472b6',
  'performance': '#fb923c',
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

const TIMER_OPTIONS = [
  { value: 30, label: '30초' },
  { value: 60, label: '60초' },
  { value: 90, label: '90초' },
  { value: 120, label: '2분' },
]

// ── 설정 화면 ──
function SetupScreen({ onStart }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [questionCount, setQuestionCount] = useState(5)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(60)

  const filtered = questions.filter(q => {
    const c = selectedCategory === 'all' || q.categoryId === selectedCategory
    const d = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    return c && d
  })

  const maxCount = Math.min(filtered.length, 20)

  const handleStart = () => {
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, questionCount)
    onStart({ questions: shuffled, timerEnabled, timerSeconds })
  }

  const sectionStyle = {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '24px',
    marginBottom: '12px',
  }

  const sectionLabelStyle = {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Timer size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            연습 모드
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          원하는 조건으로 면접 질문을 연습해보세요
        </p>
      </div>

      {/* 카테고리 */}
      <div style={sectionStyle}>
        <p style={sectionLabelStyle}>카테고리</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {/* 전체 */}
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '14px 12px',
              borderRadius: '10px',
              border: `1px solid ${selectedCategory === 'all' ? 'var(--point)' : 'var(--border)'}`,
              backgroundColor: selectedCategory === 'all' ? 'rgba(249,115,22,0.1)' : 'var(--bg-elevated)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: selectedCategory === 'all' ? 'var(--point)' : 'var(--text-secondary)',
              marginBottom: '10px',
              transition: 'background-color 0.15s',
            }} />
            <p style={{
              fontSize: '13px', fontWeight: 600,
              color: selectedCategory === 'all' ? 'var(--text-secondary)' : 'var(--text-muted)',
            }}>
              전체
            </p>
            <p style={{ fontSize: '11px', color: selectedCategory === 'all' ? 'var(--text-secondary)' : 'var(--text-muted)', marginTop: '2px' }}>
              {questions.length}문제
            </p>
          </button>

          {categories.map(cat => {
            const color = CATEGORY_COLORS[cat.id]
            const isActive = selectedCategory === cat.id
            const count = questions.filter(q => q.categoryId === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '14px 12px',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? color : 'var(--border)'}`,
                  backgroundColor: isActive ? color + '15' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.borderColor = color + '66'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: isActive ? color : 'var(--text-secondary)',
                  marginBottom: '10px',
                  transition: 'background-color 0.15s',
                }} />
                <p style={{
                  fontSize: '13px', fontWeight: 600,
                  color: isActive ? color : 'var(--text-secondary)',
                }}>
                  {cat.label}
                </p>
                <p style={{ fontSize: '11px', color: isActive ? 'var(--text-secondary)' : 'var(--text-muted)', marginTop: '2px' }}>
                  {count}문제
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 난이도 + 문제 수 */}
      <div style={sectionStyle}>
        <p style={sectionLabelStyle}>난이도</p>
        <div style={{
          display: 'flex',
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '3px',
          gap: '2px',
          marginBottom: '28px',
        }}>
          {[
            { id: 'all', label: '전체', color: null },
            { id: 'easy', label: '쉬움', color: '#22c55e' },
            { id: 'medium', label: '보통', color: '#f97316' },
            { id: 'hard', label: '어려움', color: '#ef4444' },
          ].map(d => {
            const isActive = selectedDifficulty === d.id
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDifficulty(d.id)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? (d.color || 'var(--point)') : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                  border: `1px solid ${isActive ? (d.color ? d.color + '55' : 'var(--point)') : 'transparent'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {d.label}
              </button>
            )
          })}
        </div>

        <p style={sectionLabelStyle}>문제 수</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type='range'
            min={1}
            max={maxCount}
            value={questionCount}
            onChange={e => setQuestionCount(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--point)', cursor: 'pointer' }}
          />
          <div style={{
            minWidth: '60px',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--point)',
          }}>
            {questionCount}문제
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>1문제</span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{maxCount}문제</span>
        </div>
      </div>

      {/* 타이머 */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: timerEnabled ? '20px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Timer size={15} color='var(--text-secondary)' />
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>타이머</p>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {timerEnabled ? '켜짐' : '꺼짐'}
            </span>
          </div>
          <div
            onClick={() => setTimerEnabled(!timerEnabled)}
            style={{
              width: '44px', height: '24px',
              borderRadius: '999px',
              backgroundColor: timerEnabled ? 'var(--point)' : 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '3px',
              left: timerEnabled ? '22px' : '3px',
              width: '16px', height: '16px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              transition: 'left 0.2s',
            }} />
          </div>
        </div>

        {timerEnabled && (
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '3px',
            gap: '2px',
          }}>
            {TIMER_OPTIONS.map(t => {
              const isActive = timerSeconds === t.value
              return (
                <button
                  key={t.value}
                  onClick={() => setTimerSeconds(t.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--point)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--point)' : 'transparent'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 시작 버튼 */}
      <button
        onClick={handleStart}
        disabled={filtered.length === 0}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: filtered.length === 0 ? 'var(--bg-elevated)' : 'var(--point)',
          color: filtered.length === 0 ? 'var(--text-muted)' : '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 700,
          cursor: filtered.length === 0 ? 'not-allowed' : 'pointer',
          marginTop: '12px',
        }}
      >
        {filtered.length === 0 ? '해당 조건의 질문이 없습니다' : `${questionCount}문제 시작하기`}
      </button>
    </div>
  )
}

// ── 문제 풀기 화면 ──
function PracticeScreen({ session, onFinish }) {
  const { questions: sessionQuestions, timerEnabled, timerSeconds } = session
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timerSeconds)
  const [completed, setCompleted] = useState([])
  const [checkedKeywords, setCheckedKeywords] = useState([])
  const [showKeywords, setShowKeywords] = useState(false)
  const timerRef = useRef(null)

  const current = sessionQuestions[currentIndex]
  const categoryColor = CATEGORY_COLORS[current.categoryId] || 'var(--point)'
  const progress = (currentIndex / sessionQuestions.length) * 100

  useEffect(() => {
    setShowHint(false)
    setShowAnswer(false)
    setCheckedKeywords([])
    setTimeLeft(timerSeconds)
    setShowKeywords(false)
  }, [currentIndex, timerSeconds])

  useEffect(() => {
    if (!timerEnabled) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [currentIndex, timerEnabled])

  const handleNext = () => {
    clearInterval(timerRef.current)
    const newCompleted = [...completed, current.id]
    setCompleted(newCompleted)
    if (currentIndex + 1 >= sessionQuestions.length) {
      onFinish({ completed: newCompleted, questions: sessionQuestions })
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const toggleKeyword = (kw) => {
    setCheckedKeywords(prev =>
      prev.includes(kw) ? prev.filter(k => k !== kw) : [...prev, kw]
    )
  }

  const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f97316' : 'var(--text-secondary)'
  const timerPercent = (timeLeft / timerSeconds) * 100

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto' }}>

      {/* 상단 진행 영역 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--point)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            / {String(sessionQuestions.length).padStart(2, '0')}
          </span>
        </div>

        {timerEnabled && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: timeLeft <= 10 ? '#ef444415' : 'var(--bg-surface)',
            border: `1px solid ${timeLeft <= 10 ? '#ef444455' : 'var(--border)'}`,
            borderRadius: '999px',
            transition: 'all 0.3s',
          }}>
            <Timer size={13} color={timerColor} />
            <span style={{
              fontSize: '14px',
              fontWeight: 700,
              color: timerColor,
              fontVariantNumeric: 'tabular-nums',
              transition: 'color 0.3s',
              minWidth: '32px',
            }}>
              {timeLeft}초
            </span>
          </div>
        )}
      </div>

      {/* 전체 진행 바 */}
      <div style={{ height: '4px', backgroundColor: 'var(--bg-elevated)', borderRadius: '999px', marginBottom: '4px' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--point)',
          borderRadius: '999px',
          boxShadow: '0 0 8px rgba(249,115,22,0.5)',
          transition: 'width 0.3s',
        }} />
      </div>

      {/* 타이머 바 */}
      {timerEnabled && (
        <div style={{ height: '2px', backgroundColor: 'var(--bg-elevated)', borderRadius: '999px', marginBottom: '40px' }}>
          <div style={{
            height: '100%',
            width: `${timerPercent}%`,
            backgroundColor: timerColor,
            borderRadius: '999px',
            transition: 'width 1s linear, background-color 0.3s',
          }} />
        </div>
      )}

      <div style={{ marginBottom: !timerEnabled ? '40px' : '0' }} />

      {/* 카테고리 / 난이도 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, color: categoryColor,
          backgroundColor: categoryColor + '15', padding: '4px 10px',
          borderRadius: '999px',
        }}>
          {categories.find(c => c.id === current.categoryId)?.label}
        </span>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          color: DIFFICULTY_COLORS[current.difficulty],
          backgroundColor: DIFFICULTY_COLORS[current.difficulty] + '15',
          padding: '4px 10px', borderRadius: '999px',
        }}>
          {DIFFICULTY_LABELS[current.difficulty]}
        </span>
      </div>

      {/* 질문 */}
      <h2 style={{
        fontSize: 'clamp(20px, 3vw, 28px)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.4,
        marginBottom: '32px',
        letterSpacing: '-0.01em',
      }}>
        {current.title}
      </h2>

      {/* 핵심 키워드 체크리스트 */}
      <div style={{
        border: `1px solid ${showKeywords ? categoryColor + '55' : 'var(--border)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '10px',
        transition: 'border-color 0.2s',
      }}>
        <button
          style={{
            width: '100%', padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)', border: 'none', cursor: 'pointer',
          }}
          onClick={() => setShowKeywords(!showKeywords)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={14} color={showKeywords ? categoryColor : 'var(--text-secondary)'} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>핵심 키워드</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {showKeywords && (
              <span style={{
                fontSize: '12px',
                color: checkedKeywords.length === current.keywords.length ? '#22c55e' : 'var(--text-secondary)',
                fontWeight: checkedKeywords.length === current.keywords.length ? 600 : 400,
              }}>
                {checkedKeywords.length} / {current.keywords.length}
                {checkedKeywords.length === current.keywords.length && ' ✓'}
              </span>
            )}
            <ChevronDown size={16} color='var(--text-secondary)' style={{ transform: showKeywords ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </div>
        </button>
        {showKeywords && (
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-elevated)', borderTop: `1px solid ${categoryColor}33` }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {current.keywords.map(kw => {
                const checked = checkedKeywords.includes(kw)
                return (
                  <button
                    key={kw}
                    onClick={() => toggleKeyword(kw)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: checked ? categoryColor : 'var(--text-secondary)',
                      backgroundColor: checked ? categoryColor + '15' : 'var(--bg-elevated)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${checked ? categoryColor + '55' : 'var(--border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <CheckSquare size={12} strokeWidth={checked ? 2.5 : 1.5} />
                    {kw}
                  </button>
                )
              })}
            </div>
          </div>
        )}
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
            width: '100%', padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)', border: 'none', cursor: 'pointer',
          }}
          onClick={() => setShowHint(!showHint)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lightbulb size={14} color={showHint ? categoryColor : 'var(--text-secondary)'} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>힌트</span>
          </div>
          <ChevronDown size={16} color='var(--text-secondary)' style={{ transform: showHint ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>
        {showHint && (
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-elevated)', borderTop: `1px solid ${categoryColor}33` }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{current.hint}</p>
          </div>
        )}
      </div>

      {/* 모범 답변 토글 */}
      <div style={{
        border: `1px solid ${showAnswer ? categoryColor + '55' : 'var(--border)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '32px',
        transition: 'border-color 0.2s',
      }}>
        <button
          style={{
            width: '100%', padding: '14px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)', border: 'none', cursor: 'pointer',
          }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={14} color={showAnswer ? categoryColor : 'var(--text-secondary)'} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>모범 답변</span>
          </div>
          <ChevronDown size={16} color='var(--text-secondary)' style={{ transform: showAnswer ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>
        {showAnswer && (
          <div style={{ padding: '24px', backgroundColor: 'var(--bg-elevated)', borderTop: `1px solid ${categoryColor}33` }}>
            <pre style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
              {current.answer}
            </pre>
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: 'var(--point)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(249,115,22,0.3)',
        }}
      >
        {currentIndex + 1 >= sessionQuestions.length ? '결과 보기 →' : '다음 문제 →'}
      </button>
    </div>
  )
}

// ── 결과 화면 ──
function ResultScreen({ result, onRestart }) {
  const navigate = useNavigate()
  const { completed, questions: sessionQuestions } = result

  const categoryStats = categories.map(cat => {
    const total = sessionQuestions.filter(q => q.categoryId === cat.id).length
    return total > 0 ? { category: cat, total } : null
  }).filter(Boolean)

  const maxTotal = Math.max(...categoryStats.map(s => s.total))

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>

      {/* 완료 */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          width: '64px', height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(249,115,22,0.1)',
          border: '1px solid rgba(249,115,22,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <CheckCircle size={32} color='var(--point)' />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          연습 완료!
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          총 {sessionQuestions.length}문제를 풀었어요
        </p>
      </div>

      {/* 카테고리별 분포 그래프 */}
      {categoryStats.length > 0 && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'left',
        }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '20px', letterSpacing: '0.05em' }}>
            카테고리별 분포
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryStats.map(({ category, total }) => {
              const color = CATEGORY_COLORS[category.id] || 'var(--point)'
              const percent = (total / sessionQuestions.length) * 100
              const barWidth = (total / maxTotal) * 100
              return (
                <div key={category.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {category.label}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {total}문제
                      </span>
                      <span style={{
                        fontSize: '12px', fontWeight: 600,
                        color: color,
                        backgroundColor: color + '15',
                        padding: '2px 8px', borderRadius: '4px',
                      }}>
                        {Math.round(percent)}%
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--bg-elevated)', borderRadius: '999px' }}>
                    <div style={{
                      height: '100%',
                      width: `${barWidth}%`,
                      backgroundColor: color,
                      borderRadius: '999px',
                      boxShadow: `0 0 8px ${color}66`,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 버튼들 */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => navigate('/questions')}
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          질문 목록으로
        </button>
        <button
          onClick={onRestart}
          style={{
            flex: 1,
            padding: '14px',
            backgroundColor: 'var(--point)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <RotateCcw size={15} />
          다시 연습하기
        </button>
      </div>
    </div>
  )
}

// ── 메인 ──
function PracticePage() {
  const [screen, setScreen] = useState('setup')
  const [session, setSession] = useState(null)
  const [result, setResult] = useState(null)

  if (screen === 'practice' && session) {
    return (
      <PracticeScreen
        session={session}
        onFinish={(r) => { setResult(r); setScreen('result') }}
      />
    )
  }

  if (screen === 'result' && result) {
    return (
      <ResultScreen
        result={result}
        onRestart={() => { setSession(null); setResult(null); setScreen('setup') }}
      />
    )
  }

  return (
    <SetupScreen
      onStart={(s) => { setSession(s); setScreen('practice') }}
    />
  )
}

export default PracticePage