import { useEffect, useState } from "react";

export default function MemoList() {
  const [memos, setMemos] = useState([]);
  const [filter, setFilter] = useState("all"); // all, completed, incomplete
  const [sortBy, setSortBy] = useState("createdAt"); // createdAt, dueDate
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 로컬스토리지에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("memos");
    if (stored) {
      setMemos(JSON.parse(stored));
    }
  }, []);

  // 로컬스토리지 업데이트 함수
  function updateLocalStorage(updated) {
    setMemos(updated);
    localStorage.setItem("memos", JSON.stringify(updated));
  }

  // 완료 상태 변경
  function toggleComplete(id) {
    const updated = memos.map((memo) =>
      memo.id === id ? { ...memo, isCompleted: !memo.isCompleted } : memo
    );
    updateLocalStorage(updated);
  }

  // 메모 삭제
  function deleteMemo(id) {
    const updated = memos.filter((memo) => memo.id !== id);
    updateLocalStorage(updated);
  }

  // 수정 모드 진입
  function startEdit(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  // 수정 완료
  function saveEdit(id) {
    const updated = memos.map((memo) =>
      memo.id === id ? { ...memo, content: editText, title: editText } : memo
    );
    updateLocalStorage(updated);
    setEditId(null);
    setEditText("");
  }

  // 필터링 적용
  const filteredMemos = memos.filter((memo) => {
    if (filter === "completed") return memo.isCompleted;
    if (filter === "incomplete") return !memo.isCompleted;
    return true;
  });

  // 정렬 적용
  const sortedMemos = [...filteredMemos].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 내 메모 목록</h2>

      {/* 필터 및 정렬 메뉴 */}
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
          <option value="dueDate">마감일순</option>
        </select>
      </div>

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
                <h3
                  className={`font-semibold text-lg ${
                    memo.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {memo.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">{memo.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  마감일: {memo.dueDate || "없음"} / 작성일: {memo.createdAt}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleComplete(memo.id)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                  >
                    {memo.isCompleted ? "미완료" : "완료"}
                  </button>
                  <button
                    onClick={() => startEdit(memo.id, memo.content)}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-blue-100 text-blue-600"
                  >
                    수정
                  </button>
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
