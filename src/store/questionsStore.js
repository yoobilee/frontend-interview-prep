import { create } from 'zustand'
import { fetchQuestions } from '../lib/supabase'

const useQuestionsStore = create((set, get) => ({
  questions: [],
  loading: false,
  loaded: false,

  fetchIfNeeded: async () => {
    if (get().loaded) return
    set({ loading: true })
    const questions = await fetchQuestions()
    set({ questions, loading: false, loaded: true })
  },
}))

export default useQuestionsStore