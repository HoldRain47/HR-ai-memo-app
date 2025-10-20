import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">프로필 페이지</h2>
      {token ? (
        <>
          <p className="mt-4">현재 로그인된 사용자: {user.email}</p>
          <p className="text-sm text-gray-500">토큰: {token}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => dispatch(logout())}
          >
            로그아웃
          </button>
        </>
      ) : (
        <p>로그인 정보가 없습니다.</p>
      )}
    </div>
  );
}
