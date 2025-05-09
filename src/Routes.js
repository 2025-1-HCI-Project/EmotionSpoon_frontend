import React from 'react';
import { Route, Routes } from "react-router-dom";
import DiaryPage from "./pages/DiaryPage";
import AnalyzingPage from "../src/pages/AnalyzingPage";
import LandingPage from "../src/pages/LandingPage";
import CalendarPage from "../src/pages/CalendarPage";
import Header from "../src/layout/Header";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";

function MyRoutes() {
    return (
        <>
            <Header />
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
