import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">프로필 페이지</h2>
      {token ? (
        <>
          <p className="mt-4">현재 상태 :로그인.</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => dispatch(logout())}
          >
            로그아웃
          </button>
        </>
      ) : (
        <p>현재 상태 : 로그아웃.</p>
      )}
    </div>
  );
}
