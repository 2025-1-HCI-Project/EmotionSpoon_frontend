import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import DiaryPage from "./pages/DiaryPage";
import AnalyzingPage from "./pages/AnalyzingPage";
import LandingPage from "./pages/LandingPage";
import CalendarPage from "./pages/CalendarPage";
import Header from "./layout/Header";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function MyRoutes() {
  const { pathname } = useLocation();
  // 실제 path 값과 동일하게 소문자로 설정
  const noHeaderPaths = ["/login", "/signup", "/analyzing"];

  return (
    <>
      {/* 로그인/회원가입/분석 페이지가 아닐 때만 Header 렌더 */}
      { !noHeaderPaths.includes(pathname) && <Header /> }

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/analyzing" element={<AnalyzingPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default MyRoutes;
