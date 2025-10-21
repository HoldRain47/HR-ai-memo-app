// src/pages/MemoList.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMemos, deleteMemo, toggleMemo } from "../utils/memoApi";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const { token } = useSelector((state) => state.auth);

  // 로그인된 사용자 ID 추출
  useEffect(() => {
    async function fetchMemos() {
      try {
        if (!token) return;
        const userId = JSON.parse(atob(token.split(".")[1]))["sub"];
        const data = await getMemos(userId);
        setMemos(data);
      } catch (error) {
        console.error("메모 불러오기 실패:", error);
      }
    }
    fetchMemos();
  }, [token]);

  // 완료 상태 토글
  async function handleToggle(memo) {
    try {
      await toggleMemo(memo.id, memo.is_completed);
      const userId = JSON.parse(atob(token.split(".")[1]))["sub"];
      const data = await getMemos(userId);
      setMemos(data);
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  }

  // 메모 삭제
  async function handleDelete(id) {
    try {
      await deleteMemo(id);
      setMemos((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  }

  // 필터링
  const filteredMemos = memos.filter((memo) => {
    if (filter === "completed") return memo.is_completed;
    if (filter === "incomplete") return !memo.is_completed;
    return true;
  });

  // 정렬
  const sortedMemos = [...filteredMemos].sort((a, b) => {
    if (sortBy === "time") {
      return (a.time || "").localeCompare(b.time || "");
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 내 메모 목록</h2>

      {/* 필터 및 정렬 */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md border ${
            filter === "all" ? "bg-blue-200" : ""
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-3 py-1 rounded-md border ${
            filter === "incomplete" ? "bg-yellow-200" : ""
          }`}
        >
          미완료
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-md border ${
            filter === "completed" ? "bg-green-200" : ""
          }`}
        >
          완료
        </button>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className="border rounded-md px-2"
        >
          <option value="created_at">작성일순</option>
          <option value="time">시간순</option>
        </select>
      </div>

      {/* 메모 목록 */}
      {sortedMemos.length === 0 ? (
        <p className="text-gray-500">표시할 메모가 없습니다.</p>
      ) : (
        sortedMemos.map((memo) => (
          <div
            key={memo.id}
            className={`border rounded-xl p-4 mb-3 shadow-sm ${
              memo.is_completed ? "bg-gray-300" : "bg-white"
            }`}
          >
            {/* 본문 */}
            <h3
              className={`font-semibold text-lg ${
                memo.is_completed ? "line-through text-gray-500" : ""
              }`}
            >
              할 일: {memo.content}
            </h3>

            {/* 주제 */}
            <p className="text-sm text-gray-700 mt-1">
              주제: {memo.topic || "일반"}
            </p>

            {/* 진행 시간 */}
            <p className="text-sm text-gray-600 mt-1">
              진행 시간: {memo.time || "없음"}
            </p>

            {/* 작성일 */}
            <p className="text-xs text-gray-400 mt-1">
              작성일: {memo.created_at?.slice(0, 10)}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleToggle(memo)}
                className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
              >
                {memo.is_completed ? "미완료" : "완료"}
              </button>
              <button
                onClick={() => handleDelete(memo.id)}
                className="px-3 py-1 border rounded-md text-sm hover:bg-red-100 text-red-600"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
