import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymepnkcheqyvndbevyfr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZXBua2NoZXF5dm5kYmV2eWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NDIwOTEsImV4cCI6MjA5NDMxODA5MX0.c4_UOlr9XodpwHbUsaImEn9LHWqi6Wy3tGUOB84CI-Y'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id')

  if (error) throw error

  return data.map(q => ({
    id: q.id,
    categoryId: q.category_id,
    title: q.title,
    difficulty: q.difficulty,
    tags: q.tags,
    intent: q.intent,
    keywords: q.keywords,
    hint: q.hint,
    answer: q.answer,
    company: q.company || [],
  }))
}