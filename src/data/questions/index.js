import { htmlCssQuestions } from './html-css'
import { javascriptQuestions } from './javascript'
import { reactQuestions } from './react'
import { browserNetworkQuestions } from './browser-network'
import { csQuestions } from './cs'
import { performanceQuestions } from './performance'

export const categories = [
  { id: 'html-css', label: 'HTML/CSS' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'browser-network', label: '브라우저/네트워크' },
  { id: 'cs', label: 'CS 기초' },
  { id: 'performance', label: '성능 최적화' },
]

export const questions = [
  ...htmlCssQuestions,
  ...javascriptQuestions,
  ...reactQuestions,
  ...browserNetworkQuestions,
  ...csQuestions,
  ...performanceQuestions,
]