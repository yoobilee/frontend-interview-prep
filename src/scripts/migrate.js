import { createClient } from '@supabase/supabase-js'
import { questions } from '../data/questions/index.js'

const supabaseUrl = 'YOUR_PROJECT_URL'
const supabaseKey = 'YOUR_ANON_KEY'

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
  console.log(`총 ${questions.length}개 질문 마이그레이션 시작...`)

  const { error } = await supabase
    .from('questions')
    .insert(questions.map(q => ({
      id: q.id,
      category_id: q.categoryId,
      title: q.title,
      difficulty: q.difficulty,
      tags: q.tags,
      intent: q.intent,
      keywords: q.keywords,
      hint: q.hint,
      answer: q.answer,
    })))

  if (error) {
    console.error('마이그레이션 실패:', error)
  } else {
    console.log('마이그레이션 성공!')
  }
}

migrate()