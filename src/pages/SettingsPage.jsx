import { useState, useEffect } from 'react'
import { Settings, Key, Check } from 'lucide-react'

const AI_MODELS = [
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic의 AI 모델. 면접 답변 분석에 탁월합니다.',
    placeholder: 'sk-ant-api03-...',
  },
  {
    id: 'gpt',
    name: 'GPT-4',
    description: 'OpenAI의 AI 모델. 광범위한 지식을 보유하고 있습니다.',
    placeholder: 'sk-...',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google의 AI 모델. 최신 정보에 강합니다.',
    placeholder: 'AIza...',
  },
  {
    id: 'groq',
    name: 'Groq',
    description: '무료로 사용 가능한 초고속 AI 모델. Llama 3.3 70B 기반입니다.',
    placeholder: 'gsk_...',
  },
]

function SettingsPage() {
  const [selectedModel, setSelectedModel] = useState(
    localStorage.getItem('ai_model') || 'claude'
  )
  const [apiKeys, setApiKeys] = useState({
    claude: localStorage.getItem('api_key_claude') || '',
    gpt: localStorage.getItem('api_key_gpt') || '',
    gemini: localStorage.getItem('api_key_gemini') || '',
  })
  const [saved, setSaved] = useState(false)
  const [showKeys, setShowKeys] = useState({
    claude: false,
    gpt: false,
    gemini: false,
  })

  const handleSave = () => {
    localStorage.setItem('ai_model', selectedModel)
    Object.entries(apiKeys).forEach(([model, key]) => {
      localStorage.setItem(`api_key_${model}`, key)
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const currentModel = AI_MODELS.find(m => m.id === selectedModel)
  const hasApiKey = apiKeys[selectedModel]?.trim().length > 0

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>

      {/* 헤더 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Settings size={20} color='var(--point)' />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            설정
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          AI 피드백에 사용할 모델과 API 키를 설정하세요
        </p>
      </div>

      {/* AI 모델 선택 */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '24px',
        marginBottom: '12px',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          AI 모델 선택
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {AI_MODELS.map(model => {
            const isActive = selectedModel === model.id
            const hasKey = apiKeys[model.id]?.trim().length > 0
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? 'var(--point)' : 'var(--border)'}`,
                  backgroundColor: isActive ? 'rgba(249,115,22,0.08)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <p style={{
                      fontSize: '14px', fontWeight: 600,
                      color: isActive ? 'var(--point)' : 'var(--text-primary)',
                    }}>
                      {model.name}
                    </p>
                    {hasKey && (
                      <span style={{
                        fontSize: '10px', fontWeight: 600,
                        color: '#22c55e',
                        backgroundColor: 'rgba(34,197,94,0.1)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: '1px solid rgba(34,197,94,0.3)',
                      }}>
                        키 등록됨
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {model.description}
                  </p>
                </div>
                <div style={{
                  width: '20px', height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${isActive ? 'var(--point)' : 'var(--border)'}`,
                  backgroundColor: isActive ? 'var(--point)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}>
                  {isActive && <Check size={11} color='#fff' strokeWidth={3} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* API 키 입력 */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Key size={14} color='var(--text-secondary)' />
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            API 키 설정
          </p>
        </div>

        {AI_MODELS.map(model => (
          <div key={model.id} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {model.name} API 키
              </label>
              <button
                onClick={() => setShowKeys(prev => ({ ...prev, [model.id]: !prev[model.id] }))}
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px 8px',
                }}
              >
                {showKeys[model.id] ? '숨기기' : '보기'}
              </button>
            </div>
            <input
              type={showKeys[model.id] ? 'text' : 'password'}
              placeholder={model.placeholder}
              value={apiKeys[model.id]}
              onChange={e => setApiKeys(prev => ({ ...prev, [model.id]: e.target.value }))}
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-elevated)',
                border: `1px solid ${apiKeys[model.id] ? 'var(--point)' : 'var(--border)'}`,
                borderRadius: '8px',
                fontSize: '13px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
            />
          </div>
        ))}

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          API 키는 브라우저 로컬 스토리지에만 저장되며 외부로 전송되지 않습니다.
        </p>
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: saved ? '#22c55e' : 'var(--point)',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {saved ? <><Check size={16} /> 저장됨</> : '설정 저장'}
      </button>
    </div>
  )
}

export default SettingsPage