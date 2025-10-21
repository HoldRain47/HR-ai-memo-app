import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <div className="flex gap-4 text-blue-600 font-semibold">
          <Link to="/">HR AI MEMO APP</Link>
          <Link to="/create-memo">메모 작성</Link>
          <Link to="/memo-list">메모 목록</Link>
        </div>
        <div className="flex gap-4 text-blue-600 font-semibold">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원 가입</Link>
          <Link to="/profile">프로필</Link>
        </div>
      </nav>
      <hr className="w-screen border-t border-gray-300 -mx-6 mb-6" />
      <Outlet />
    </div>
  );
}
