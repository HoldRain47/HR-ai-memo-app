import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">HR AI MEMO APP</h1>
      <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
        이 프로젝트는{" "}
        <span className="font-semibold text-blue-500">Google Gemini API</span>를
        활용해 사용자의 자연어 입력을 분석하고 구조화된 메모를 자동으로 생성하는
        <span className="font-semibold"> AI 메모 생성 서비스</span>입니다.
      </p>

      <div className="mt-8 text-left max-w-2xl bg-gray-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          📋 주요 기능
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>자연어로 입력한 내용을 AI가 분석해 메모 생성</li>
          <li>Supabase 기반 회원가입 및 로그인</li>
          <li>Redux Toolkit과 Persist로 전역 상태 및 세션 유지</li>
          <li>Supabase에 사용자 별 메모 저장 및 관리</li>
          <li>메모 완료/미완료 상태 변경 및 삭제</li>
        </ul>
      </div>

      <div className="mt-8 text-left max-w-2xl bg-gray-50 p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          ⚙️ 기술 스택
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>React + React Router v7</li>
          <li>Redux Toolkit + Redux Persist</li>
          <li>Tailwind CSS</li>
          <li>Supabase Auth</li>
          <li>Google Gemini API</li>
        </ul>
      </div>
      {/* 이동 버튼 */}
      <div className="flex gap-6 mt-10">
        <Link
          to="/create-memo"
          className="px-6 py-3 bg-gray-300 text-white rounded-xl font-semibold hover:bg-gray-500 transition"
        >
          ✏️ 메모 작성하기
        </Link>
        <Link
          to="/memo-list"
          className="px-6 py-3 bg-gray-300 text-white rounded-xl font-semibold hover:bg-gray-500 transition"
        >
          📄 메모 목록 보기
        </Link>
      </div>

      <p className="mt-10 text-gray-500 text-sm">
        © 2025 HR AI MEMO APP — AI 기반 메모 관리 프로젝트
      </p>
    </div>
  );
}
