// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 로그인 성공 시 실행
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      // 로컬스토리지에 저장
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    // 로그아웃 시 실행
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
