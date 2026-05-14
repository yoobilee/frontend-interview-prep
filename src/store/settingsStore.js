import { create } from 'zustand'

const useSettingsStore = create(() => ({
  getModel: () => localStorage.getItem('ai_model') || 'claude',
  getApiKey: (model) => localStorage.getItem(`api_key_${model}`) || '',
}))

export default useSettingsStore