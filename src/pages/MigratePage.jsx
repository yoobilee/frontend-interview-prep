import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { questions } from '../data/questions/index'

function MigratePage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMigrate = async () => {
    setLoading(true)
    setStatus('마이그레이션 시작...')

    // 기존 데이터 삭제
    await supabase.from('questions').delete().neq('id', 0)
    setStatus('기존 데이터 삭제 완료...')

    // 데이터 삽입
    const insertData = questions.map(q => ({
      id: q.id,
      category_id: q.categoryId,
      title: q.title,
      difficulty: q.difficulty,
      tags: q.tags,
      intent: q.intent,
      keywords: q.keywords,
      hint: q.hint,
      answer: q.answer,
    }))

    const { error } = await supabase.from('questions').insert(insertData)

    if (error) {
      setStatus(`오류: ${error.message}`)
    } else {
      setStatus(`✅ 완료! ${questions.length}개 질문 마이그레이션 성공!`)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '600px', margin: '100px auto', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>DB 마이그레이션</h1>
      <button
        onClick={handleMigrate}
        disabled={loading}
        style={{
          padding: '16px 32px',
          backgroundColor: 'var(--point)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '마이그레이션 중...' : '전체 마이그레이션 시작'}
      </button>
      {status && (
        <p style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          {status}
        </p>
      )}
    </div>
  )
}

export default MigratePage