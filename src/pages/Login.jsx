// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      alert("로그인 성공!");
      navigate("/");
    } else {
      const supabaseMsg = result.payload?.msg;
      const message =
        supabaseMsg === "Invalid login credentials"
          ? "이메일 또는 비밀번호가 올바르지 않습니다."
          : "로그인 실패. 다시 시도해주세요.";
      alert(message);
    }
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
      {error && <p className="text-red-500 mt-2">{error.msg}</p>}
    </div>
  );
}
