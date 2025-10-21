// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MemoList from "../pages/MemoList";
import CreateMemo from "../pages/CreateMemo";
import Profile from "../pages/Profile";
import ProtectedRoute from "../layouts/ProtectedRoute"; //보호라우터

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true, // 기본 경로 ("/")
        Component: Home,
      },
      {
        Component: ProtectedRoute,
        children: [
          { path: "create-memo", Component: CreateMemo },
          { path: "memo-list", Component: MemoList },
        ],
      },
      //import MemoDetail from "../pages/PostDetail";
      // { 로그인 한 사용자의 메모를 보기위한 페이지
      //   path: "memo/:Id",
      //   Component: MemoDetail,
      // },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "Profile",
        Component: Profile,
      },
    ],
  },
]);

export default router;
