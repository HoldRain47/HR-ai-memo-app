import { useEffect, useState } from "react";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 로컬스토리지에서 메모 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("memos");
    if (stored) {
      setMemos(JSON.parse(stored));
    }
  }, []);

  function updateLocalStorage(updated) {
    setMemos(updated);
    localStorage.setItem("memos", JSON.stringify(updated));
  }

  function toggleComplete(id) {
    const updated = memos.map((memo) =>
      memo.id === id ? { ...memo, isCompleted: !memo.isCompleted } : memo
    );
    updateLocalStorage(updated);
  }

  function deleteMemo(id) {
    const updated = memos.filter((memo) => memo.id !== id);
    updateLocalStorage(updated);
  }

  function startEdit(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  function saveEdit(id) {
    const updated = memos.map((memo) =>
      memo.id === id ? { ...memo, content: editText } : memo
    );
    updateLocalStorage(updated);
    setEditId(null);
    setEditText("");
  }

  const filteredMemos = memos.filter((memo) => {
    if (filter === "completed") return memo.isCompleted;
    if (filter === "incomplete") return !memo.isCompleted;
    return true;
  });

  const sortedMemos = [...filteredMemos].sort((a, b) => {
    if (sortBy === "time") {
      return (a.time || "").localeCompare(b.time || "");
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
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
          <option value="createdAt">작성일순</option>
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
              memo.isCompleted ? "bg-gray-300" : "bg-white"
            }`}
          >
            {editId === memo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 w-full mb-2 rounded-md"
                />
                <button
                  onClick={() => saveEdit(memo.id)}
                  className="px-3 py-1 border rounded-md mr-2 bg-blue-100"
                >
                  저장
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="px-3 py-1 border rounded-md"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                {/* 본문*/}
                <h3
                  className={`font-semibold text-lg ${
                    memo.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  할 일: {memo.content}
                </h3>

                {/* 주제*/}
                <p className="text-sm text-gray-700 mt-1">
                  주제: {memo.topic || "일반"}
                </p>

                {/* 진행 시간 */}
                <p className="text-sm text-gray-600 mt-1">
                  진행 시간: {memo.time || "없음"}
                </p>

                {/* 작성일 */}
                <p className="text-xs text-gray-400 mt-1">
                  작성일: {memo.createdAt}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleComplete(memo.id)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                  >
                    {memo.isCompleted ? "미완료" : "완료"}
                  </button>
                  {/* 수정 로직은 아직 대기 */}
                  {/* <button
                    onClick={() => startEdit(memo.id, memo.content)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-blue-100 text-blue-600"
                  >
                    수정
                  </button> */}
                  <button
                    onClick={() => deleteMemo(memo.id)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-red-100 text-red-600"
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
