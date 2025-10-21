import { useState } from "react";
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { ai, config } from "../utils/genai";

export default function CreateMemo() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [pendingMemo, setPendingMemo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isLoading || prompt.trim() === "") return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
      });

      const data = JSON.parse(response.text);
      setPrompt("");
      setIsLoading(false);

      if (data.isMemo) {
        const newMemo = {
          id: Date.now(),
          title: data.topic || "일반",
          topic: data.topic || "일반",
          content: data.content || "내용 없음",
          time: data.time || "시간 미정",
          isCompleted: false,
          createdAt: new Date().toISOString().split("T")[0],
        };

        setPendingMemo(newMemo);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `
    📝 제안된 메모입니다:<br/><br/>
    📌 주제: ${data.topic}<br/>
    💬 내용: ${data.content}<br/>
    ⏰ 진행 시간: ${data.time}<br/><br/>
    이 메모를 생성할까요?
  `,
            isHtml: true,
            showButtons: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "이 내용은 메모로 만들 수 없습니다." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "오류가 발생했습니다. 다시 시도해주세요." },
      ]);
      setIsLoading(false);
    }
  }

  function handleConfirm(isYes) {
    if (isYes && pendingMemo) {
      const stored = localStorage.getItem("memos");
      const memoList = stored ? JSON.parse(stored) : [];
      const updated = [...memoList, pendingMemo];
      localStorage.setItem("memos", JSON.stringify(updated));

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "메모가 생성되었습니다." },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "메모 생성을 취소했습니다." },
      ]);
    }

    setPendingMemo(null);
    setMessages((prev) => prev.map((msg) => ({ ...msg, showButtons: false })));
  }

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            {/*HTML 메시지와 일반 메시지를 분리 렌더링 */}
            {msg.isHtml ? (
              <div
                className={`inline-block p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-blue-100 text-gray-900"
                    : "bg-gray-100 text-gray-800"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              ></div>
            ) : (
              <div
                className={`inline-block p-3 rounded-xl ${
                  msg.role === "user"
                    ? "bg-blue-100 text-gray-900"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            )}

            {/*Y/N 버튼 */}
            {msg.showButtons && (
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => handleConfirm(true)}
                  className="px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Y
                </button>
                <button
                  onClick={() => handleConfirm(false)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  N
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <ChatForm
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
