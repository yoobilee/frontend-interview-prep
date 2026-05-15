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

**질문 목록**  
카테고리(HTML/CSS, JavaScript, React, 브라우저/네트워크, CS 기초, 성능 최적화)와 난이도별 필터링을 지원합니다.

**질문 상세**  
단순한 모범 답변 암기가 아닌, 면접관의 의도와 핵심 키워드를 함께 제공합니다.  
답변 연습 후 키워드를 직접 체크하며 내 답변의 완성도를 스스로 평가할 수 있습니다.

**연습 모드**  
카테고리, 난이도, 문제 수, 타이머를 직접 설정해 실전처럼 연습할 수 있습니다.  
세션이 끝나면 카테고리별 분포를 시각화해 취약한 영역을 파악할 수 있습니다.

**코딩 테스트**  
20개의 알고리즘 문제를 JavaScript, TypeScript, Python으로 풀 수 있습니다.  
Judge0 API로 실제 코드를 실행하고 테스트케이스 통과 여부를 확인할 수 있습니다.  
AI 피드백으로 코드 품질과 개선 방향을 받아볼 수 있습니다.

**AI 피드백**  
면접 질문 답변, 연습 모드, 코딩 테스트에서 AI 피드백을 받을 수 있습니다.  
Claude, GPT-4, Gemini 중 원하는 모델을 선택하고 API 키를 설정해 사용할 수 있습니다.

**북마크**  
다시 보고 싶은 질문을 저장하고, 카테고리별로 묶어서 확인할 수 있습니다.

<br />

## 🛠 기술 스택

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=zustand&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

<br />

## 💡 설계 의도

**데이터 구조**  
질문 데이터는 Supabase(PostgreSQL)로 관리합니다.  
100개의 질문이 카테고리별로 구성되어 있으며, Zustand로 클라이언트 캐싱해 불필요한 재요청을 방지합니다.

**상태 관리**  
북마크는 Zustand + localStorage로 관리해 새로고침 후에도 유지됩니다.  
별도 백엔드 없이 클라이언트 단에서 완결되는 구조를 택했습니다.

**UX**  
면접 준비라는 맥락에 맞게, 정보를 한 번에 보여주지 않고 단계적으로 열어보는 방식을 택했습니다.  
힌트 → 핵심 키워드 → 모범 답변 순으로 스스로 생각할 시간을 확보할 수 있습니다.

<br />

## 📁 프로젝트 구조

```
src/
├── components/       # 공통 컴포넌트 (Layout)
├── pages/            # 페이지 컴포넌트
├── data/             # 카테고리 메타데이터
├── lib/              # Supabase 클라이언트
├── store/            # Zustand 스토어
└── utils/            # AI 피드백 유틸
```

<br />

## 🗺 로드맵

- [x] 질문 목록 및 필터링
- [x] 질문 상세 (면접관 의도, 키워드 체크, 관련 질문)
- [x] 연습 모드 (타이머, 결과 시각화)
- [x] 북마크 (카테고리별 그룹핑)
- [x] 코딩 테스트 (Monaco Editor, Judge0 API, 20개 문제)
- [x] AI 피드백 (Claude, GPT-4, Gemini 지원)
- [x] Vercel 배포
- [ ] 사용자 질문 제보
- [ ] 기업별 필터 (네카라쿠배 등)

<br />

---

Developed by **YooBi Lee**