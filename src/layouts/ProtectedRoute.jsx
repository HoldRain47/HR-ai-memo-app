// src/layouts/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token);

  // 토큰이 없으면 로그인 페이지로 강제 이동
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 하위 페이지 렌더링
  return <Outlet />;
}
