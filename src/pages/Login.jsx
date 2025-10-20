import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 로컬 회원 목록 불러오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
      return;
    }

    // 로그인 성공 처리
    const fakeToken = "local-token-" + Date.now();
    dispatch(loginSuccess({ token: fakeToken, user: foundUser }));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-60">
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
          로그인
        </button>
      </form>
    </div>
  );
}
