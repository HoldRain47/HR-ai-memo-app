import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function RootLayout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // 로그인 상태 확인

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        {/* 왼쪽 메뉴 */}
        <div className="flex gap-4 font-semibold">
          <Link to="/">HR AI MEMO APP</Link>
          <Link to="/create-memo">메모 작성</Link>
          <Link to="/memo-list">메모 목록</Link>
        </div>

        {/* 오른쪽 메뉴: 로그인 여부에 따라 다르게 표시 */}
        <div className="flex gap-4 font-semibold">
          {token ? (
            <>
              <Link to="/profile">프로필</Link>
              <button
                onClick={() => dispatch(logout())}
                className="hover:underline"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원 가입</Link>
            </>
          )}
        </div>
      </nav>

      <hr className="w-screen border-t border-gray-300 -mx-6 mb-6" />
      <Outlet />
    </div>
  );
}
