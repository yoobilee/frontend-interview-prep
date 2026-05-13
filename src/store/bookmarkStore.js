import { create } from 'zustand'

const useBookmarkStore = create((set, get) => ({
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),

  toggleBookmark: (id) => {
    const current = get().bookmarks
    const updated = current.includes(id)
      ? current.filter(b => b !== id)
      : [...current, id]
    localStorage.setItem('bookmarks', JSON.stringify(updated))
    set({ bookmarks: updated })
  },

  isBookmarked: (id) => get().bookmarks.includes(id),
}))

export default useBookmarkStore