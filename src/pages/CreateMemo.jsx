import { useState } from "react";
import MessageList from "../components/MessageList";
import ChatForm from "../components/ChatForm";
import { ai, config } from "../utils/genai";

export default function CreateMemo() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isLoading || prompt.trim() === "") return;

    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setIsLoading(true);
    await generateAiContent();
    setIsLoading(false);
  }

  async function generateAiContent() {
    try {
      // Gemini API 호출
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
      });

      // JSON 응답 파싱
      const data = JSON.parse(response.text);
      console.log("AI 응답:", data);

      // 프롬프트 초기화
      setPrompt("");

      // isMemo가 true일 때만 메모 생성
      if (data.isMemo === true) {
        const newMemo = {
          id: Date.now(),
          title: data.content,
          content: data.content,
          dueDate: data.dueDate || "",
          isCompleted: false,
          createdAt: new Date().toISOString().split("T")[0],
        };

        // 기존 메모 불러오기
        const stored = localStorage.getItem("memos");
        const memoList = stored ? JSON.parse(stored) : [];

        // 새 메모 추가 후 저장
        const updated = [...memoList, newMemo];
        localStorage.setItem("memos", JSON.stringify(updated));

        // 화면에도 표시
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: ` 메모가 생성되었습니다: ${data.content}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: " 할 일 관련 내용이 아닙니다." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: " 오류가 발생했습니다. 다시 시도해주세요." },
      ]);
    }
  }

  return (
    <>
      <MessageList messages={messages} />
      <ChatForm
        prompt={prompt}
        setPrompt={setPrompt}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </>
  );
}
