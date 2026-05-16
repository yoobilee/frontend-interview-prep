function SkeletonItem({ width = '100%', height = '16px', borderRadius = '4px', style = {} }) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      backgroundColor: 'var(--bg-elevated)',
      background: 'linear-gradient(90deg, var(--bg-elevated) 25%, var(--bg-surface) 50%, var(--bg-elevated) 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeleton-shimmer 1.5s infinite',
      ...style,
    }} />
  )
}

export function QuestionListSkeleton() {
  return (
    <div>
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '8px',
        }}>
          <div style={{ width: '3px', backgroundColor: 'var(--bg-elevated)', flexShrink: 0 }} />
          <div style={{ padding: '20px', flexShrink: 0 }}>
            <SkeletonItem width='24px' height='16px' />
          </div>
          <div style={{ flex: 1, padding: '20px 20px 20px 0' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <SkeletonItem width='60px' height='14px' />
              <SkeletonItem width='40px' height='14px' />
            </div>
            <SkeletonItem width='70%' height='18px' style={{ marginBottom: '10px' }} />
            <div style={{ display: 'flex', gap: '6px' }}>
              <SkeletonItem width='50px' height='22px' borderRadius='4px' />
              <SkeletonItem width='60px' height='22px' borderRadius='4px' />
              <SkeletonItem width='45px' height='22px' borderRadius='4px' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonItem