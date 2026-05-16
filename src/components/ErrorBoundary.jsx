import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: '16px',
          backgroundColor: '#0E0C0A',  // --bg-base
        }}>
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px',
          }}>
            ⚠️
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FAFAF9' }}>
            문제가 발생했습니다
          </h2>
          <p style={{ fontSize: '14px', color: '#A8A29E', maxWidth: '400px', lineHeight: 1.7 }}>
            예기치 않은 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              backgroundColor: 'var(--point)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            새로고침
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary