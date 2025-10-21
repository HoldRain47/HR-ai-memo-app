# 개요

## 기술 스택

> React + React Router v7
> Redux Toolkit + Redux Persist
> Tailwind CSS
> Supabase Auth
> Google Gemini API

## 주요 기능

1. 자연어로 입력한 내용을 AI가 분석해 메모 생성
2. Supabase 기반 회원가입 및 로그인
3. Redux Toolkit과 Persist로 전역 상태 및 세션 유지
4. Supabase에 사용자 별 메모 저장 및 관리
5. 메모 완료/미완료 상태 변경 및 삭제

## 프로젝트 실행 방법

## 기타

## HR-ai-memo-app

```
hr-ai-memo-app
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ ChatForm.jsx
│  │  ├─ ChatMessage.jsx
│  │  └─ MessageList.jsx
│  ├─ index.css
│  ├─ layouts
│  │  ├─ ProtectedRoute.jsx
│  │  └─ RootLayout.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ CreateMemo.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ MemoList.jsx
│  │  ├─ Profile.jsx
│  │  └─ Signup.jsx
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ authSlice.js
│  │  └─ index.js
│  └─ utils
│     ├─ genai.js
│     └─ memoApi.js
└─ vite.config.js

```
