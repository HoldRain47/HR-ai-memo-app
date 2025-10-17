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
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: config,
      });

      // Gemini의 응답(JSON 문자열 → JS 객체로 변환)
      const data = JSON.parse(response.text);
      console.log("AI 응답:", data);
      setPrompt("");

      if (data.isMemo === true) {
        const newMemo = {
          id: Date.now(),
          title: data.content,
          content: data.content,
          dueDate: data.dueDate || "",
          isCompleted: false,
          createdAt: new Date().toISOString().split("T")[0],
        };

        const stored = localStorage.getItem("memos");
        const memoList = stored ? JSON.parse(stored) : [];
        const updated = [...memoList, newMemo];
        localStorage.setItem("memos", JSON.stringify(updated));

        setMessages((prev) => [
          ...prev,
          { role: "ai", content: `메모가 생성되었습니다: ${data.content}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "요청사항을 수행할 수 없습니다." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "오류가 발생했습니다. 다시 시도해주세요." },
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
