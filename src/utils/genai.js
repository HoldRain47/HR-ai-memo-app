// 기본 컨텐츠 생성형 AI
import { GoogleGenAI } from "@google/genai";
// 환경 변수 GEMINI API KEY
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// AI 객체 생성
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// AI Chat 객체 생성
const chat = ai.chats.create({
  model: "gemini-2.5-flash",
});

// 응답 스키마
const responseSchema = {
  type: "object",
  properties: {
    // 객체의 속성들
    isMemo: {
      type: "boolean",
      description: "할 일, 메모, 업무, 계획 등 관련 여부",
    },
    content: {
      type: "string",
      description: "할 일 내용(본문)",
    },
    time: {
      type: "string",
      description: "진행할 시간(예: 오전 10시, 오후 3시 등)",
    },
    topic: {
      type: "string",
      description: "주제(AI가 선정)",
    },
  },
  required: ["isMemo", "content", "time", "topic"],
  additionalProperties: false,
};

// const config = {
//   temperature: 1,
//   maxOutputTokens: 1000,
//   stopSquences: "\\n\\n",
//   systemInstruction: [
//     "당신은 전문 할 일 관리 분석가입니다",
//     "업무, 할 일, 메모와 관련된 질문에만 답변합니다.",
//     "그 외 질문에는 '할 일과 관련없습니다' 라고 답변합니다.",
//   ],
// };

const systemInstruction = [
  `오늘 날짜: ${new Date().toISOString().split("T")[0]}`,
  "당신은 할 일 관리 AI입니다. 사용자의 자연어 입력을 분석하여 JSON으로만 응답합니다.",
  "JSON에는 반드시 다음 속성이 포함되어야 합니다: isMemo, content, time, topic.",
  "topic은 입력 내용을 요약하거나 관련 주제를 한글로 생성합니다.",
  "예시: { isMemo: true, content: '헬스장 가기', time: '오전 7시', topic: '운동' }",
  "사용자의 입력이 메모, 업무, 일정과 관련이 없으면 isMemo를 false로 설정합니다.",
  "time에는 실제 진행할 시간(예: 오전 9시, 오후 1시)을 포함합니다.",
  "topic이 비어 있거나 판단할 수 없는 경우, '일반'이라는 기본 주제를 사용합니다.",
];

const config = {
  responseMimeType: "application/json", // 응답 형식(확장자)
  responseJsonSchema: responseSchema, // 응답 JSON 구조
  systemInstruction: systemInstruction,
};

export { ai, chat, config };
