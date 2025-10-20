import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // 기존 사용자 목록 가져오기 (없으면 빈 배열)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 이미 존재하는 이메일인지 확인
    const userExists = existingUsers.some((user) => user.email === email);
    if (userExists) {
      alert("이미 가입된 이메일입니다.");
      return;
    }

    // 새 사용자 추가
    const newUser = { email, password };
    existingUsers.push(newUser);

    // 로컬스토리지에 저장
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-2 w-60">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1"
          required
        />
        <button className="border px-2 py-1 bg-blue-500 text-white">
          회원가입
        </button>
      </form>
    </div>
  );
}
