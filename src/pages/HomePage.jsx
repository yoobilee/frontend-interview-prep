import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

const KEYWORDS = [
  'closure', 'useEffect', 'REST', 'Promise', 'Virtual DOM',
  'useState', 'CORS', 'HTTP', 'Flexbox', 'CSS Grid',
  'async/await', 'Prototype', 'Event Loop', 'React Router',
  'Zustand', 'TypeScript', 'Webpack', 'SSR', 'CSR', 'SEO',
  'useCallback', 'useMemo', 'useRef', 'Context API', 'Redux',
  'Vite', 'Git', 'GraphQL', 'hoisting', 'scope',
  'debounce', 'throttle', 'lazy loading', 'BEM', 'transition',
]

const POSITIONS = [
  { top: '5%',  left: '3%'  }, { top: '5%',  left: '18%' },
  { top: '5%',  left: '72%' }, { top: '5%',  left: '87%' },
  { top: '14%', left: '10%' }, { top: '14%', left: '80%' },
  { top: '23%', left: '2%'  }, { top: '23%', left: '88%' },
  { top: '32%', left: '6%'  }, { top: '32%', left: '83%' },
  { top: '41%', left: '2%'  }, { top: '41%', left: '90%' },
  { top: '50%', left: '4%'  }, { top: '50%', left: '87%' },
  { top: '59%', left: '2%'  }, { top: '59%', left: '83%' },
  { top: '68%', left: '6%'  }, { top: '68%', left: '88%' },
  { top: '77%', left: '3%'  }, { top: '77%', left: '78%' },
  { top: '86%', left: '10%' }, { top: '86%', left: '55%' },
  { top: '86%', left: '83%' }, { top: '93%', left: '25%' },
  { top: '93%', left: '45%' }, { top: '93%', left: '70%' },
  { top: '5%',  left: '35%' }, { top: '5%',  left: '53%' },
  { top: '14%', left: '25%' }, { top: '14%', left: '60%' },
  { top: '23%', left: '15%' }, { top: '23%', left: '72%' },
  { top: '77%', left: '20%' }, { top: '77%', left: '45%' },
  { top: '68%', left: '20%' },
]

const VARIANTS = POSITIONS.map((_, i) => ({
  duration: 5 + (i % 7) * 0.8,
  delay: (i * 0.37) % 4,
  rotateX: 10 + (i % 5) * 6,
  rotateY: -20 + (i % 6) * 8,
  floatY: 8 + (i % 4) * 4,
}))

function FloatingKeyword({ text, position, variant, index }) {
  const animName = `float-${index}`

  return (
    <>
      <style>{`
        @keyframes ${animName} {
          0%   { transform: perspective(500px) rotateX(${variant.rotateX}deg) rotateY(${variant.rotateY}deg) translateY(0px); opacity: 0.45; }
          50%  { transform: perspective(500px) rotateX(${variant.rotateX}deg) rotateY(${variant.rotateY}deg) translateY(-${variant.floatY}px); opacity: 0.75; }
          100% { transform: perspective(500px) rotateX(${variant.rotateX}deg) rotateY(${variant.rotateY}deg) translateY(0px); opacity: 0.45; }
        }
      `}</style>
      <div style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        letterSpacing: '0.05em',
        padding: '9px 18px',
        border: '1px solid var(--border)',
        borderRadius: '6px',
        backgroundColor: 'var(--bg-surface)',
        animation: `${animName} ${variant.duration}s ease-in-out ${variant.delay}s infinite`,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        {text}
      </div>
    </>
  )
}

function HomePage() {
  const navigate = useNavigate()

  const shuffledKeywords = useMemo(() => {
    return [...KEYWORDS].sort(() => Math.random() - 0.5)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* 중앙 글로우 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 플로팅 키워드들 */}
      {POSITIONS.map((pos, i) => (
        <FloatingKeyword
          key={i}
          index={i}
          text={shuffledKeywords[i % shuffledKeywords.length]}
          position={pos}
          variant={VARIANTS[i]}
        />
      ))}

      {/* 콘텐츠 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          color: 'var(--point)',
          marginBottom: '24px',
          textTransform: 'uppercase',
        }}>
          Frontend Interview Prep
        </p>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}>
          면접, 제대로<br />준비하고 있나요?
        </h1>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '480px',
          marginBottom: '48px',
        }}>
          프론트엔드 면접에서 자주 나오는 질문들을 모았습니다.
          타이머로 실전처럼 연습하고, 부족한 부분을 북마크하세요.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/questions')}
            style={{
              padding: '14px 32px',
              backgroundColor: 'var(--point)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            질문 보기
          </button>
          <button
            onClick={() => navigate('/practice')}
            style={{
              padding: '14px 32px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            연습 시작
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage