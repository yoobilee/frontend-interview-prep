import { NavLink, useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'

function Layout({ children }) {
  const navigate = useNavigate()

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
    </div>
  )
}

export default Layout