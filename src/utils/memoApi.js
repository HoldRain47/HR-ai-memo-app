// src/utils/memoApi.js
import { createClient } from "@supabase/supabase-js";

// 환경 변수 불러오기 (.env 파일에 있는 값)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ 1. 메모 추가
export async function addMemo(userId, memo) {
  const { data, error } = await supabase
    .from("memos")
    .insert([{ user_id: userId, ...memo }]);
  if (error) throw error;
  return data;
}

// ✅ 2. 사용자별 메모 목록 가져오기
export async function getMemos(userId) {
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// ✅ 3. 메모 삭제
export async function deleteMemo(id) {
  const { error } = await supabase.from("memos").delete().eq("id", id);
  if (error) throw error;
}

// ✅ 4. 완료 상태 토글
export async function toggleMemo(id, isCompleted) {
  const { error } = await supabase
    .from("memos")
    .update({ is_completed: !isCompleted })
    .eq("id", id);
  if (error) throw error;
}
