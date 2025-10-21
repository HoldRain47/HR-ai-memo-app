import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignup, error } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await dispatch(signup({ email, password }));

    if (signup.fulfilled.match(result)) {
      alert("회원가입 완료! 이메일을 확인하세요.");
      navigate("/login");
    } else {
      alert(result.payload?.msg || "회원가입 실패");
    }
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
      {error && <p className="text-red-500 mt-2">{error.msg}</p>}
    </div>
  );
}
