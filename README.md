# FE Interview Prep

> 말할 수 있어야 아는 것입니다.

프론트엔드 개발자로 전환을 준비하면서 한 가지 고민이 생겼습니다.  
개념은 이해하고 있는데, 막상 말로 설명하려면 어디서부터 시작해야 할지 막막한 순간들.  
암기가 아니라 말로 꺼내는 연습이 필요하다고 생각해서 직접 만들었습니다.

<br />

## 🔗 배포

**[frontend-interview-prep-ruby.vercel.app](https://frontend-interview-prep-ruby.vercel.app/)**

<br />

## 📌 주요 기능

### 📚 질문 학습
| 기능 | 설명 |
|------|------|
| 질문 목록 | 102개 질문을 카테고리 · 난이도 · 키워드로 필터링 및 검색 |
| 질문 상세 | 면접관 의도, 핵심 키워드 체크, 힌트, 모범 답변 단계적 제공 |
| 기업 기출 배지 | 실제 기업 면접에서 출제된 질문 표시 |
| 북마크 | 다시 볼 질문 저장, 카테고리별 그룹핑 |

### 🏋️ 실전 연습
| 기능 | 설명 |
|------|------|
| 연습 모드 | 카테고리 · 난이도 · 문제 수 · 타이머 설정 후 실전처럼 연습 |
| 결과 분석 | 세션 종료 후 카테고리별 분포 시각화 및 풀었던 질문 목록 |
| 코딩 테스트 | 20개 알고리즘 문제를 JS · TS · Python으로 실제 실행 및 채점 |

### 🤖 AI 기능
| 기능 | 설명 |
|------|------|
| AI 피드백 | 면접 답변 · 코딩 테스트에서 AI 피드백 제공 |
| 질문 제보 | 제보한 질문을 AI가 자동으로 모범 답변 · 키워드 · 난이도 생성 |
| 지원 모델 | Groq (무료) · Claude · GPT-4 · Gemini |

<br />

## 🛠 기술 스택

**Frontend**  
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)

**Backend / Database**  
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

**AI**  
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)

**Deploy**  
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br />

## 💡 설계 의도

**데이터 구조**  
질문 데이터는 Supabase(PostgreSQL)로 관리합니다.  
102개의 질문이 6개 카테고리로 구성되어 있으며, Zustand로 클라이언트 캐싱해 불필요한 재요청을 방지합니다.

**AI 연동**  
질문 제보 시 Groq API(Llama 3.3 70B)로 모범 답변 · 핵심 키워드 · 난이도 · 카테고리를 자동 생성합니다.  
AI 피드백은 사용자가 설정한 API 키로 동작하며 Claude · GPT-4 · Gemini · Groq를 지원합니다.

**상태 관리**  
북마크는 Zustand + localStorage로 관리해 새로고침 후에도 유지됩니다.  
서버 데이터는 Zustand로 캐싱해 페이지 이동 시 불필요한 재요청을 방지합니다.

**UX**  
면접 준비라는 맥락에 맞게, 정보를 단계적으로 열어보는 방식을 택했습니다.  
힌트 → 핵심 키워드 → 모범 답변 순으로 스스로 생각할 시간을 확보합니다.

<br />

## 📁 프로젝트 구조

```
src/
├── components/       # 공통 컴포넌트 (Layout, ErrorBoundary, Skeleton)
├── pages/            # 페이지 컴포넌트
├── data/             # 카테고리 메타데이터
├── lib/              # Supabase 클라이언트
├── store/            # Zustand 스토어 (questions, bookmarks, settings)
└── utils/            # AI 피드백 · 질문 생성 유틸
```

<br />

## 🗺 개발 히스토리

- [x] 질문 목록 · 필터링 · 검색
- [x] 질문 상세 (면접관 의도 · 키워드 체크 · 관련 질문)
- [x] 연습 모드 (타이머 · 결과 시각화 · 질문 목록)
- [x] 북마크 (카테고리별 그룹핑)
- [x] 코딩 테스트 (Monaco Editor · Judge0 API · 20개 문제)
- [x] AI 피드백 (Groq · Claude · GPT-4 · Gemini)
- [x] 질문 제보 (AI 자동 생성 · 관리자 승인)
- [x] 기업 기출 배지
- [x] Supabase DB 연동
- [x] 로딩 스켈레톤 · 에러 바운더리
- [x] Vercel 배포

<br />

---

Developed by **YooBi Lee**