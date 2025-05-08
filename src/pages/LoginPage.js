import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../util/ApiService";

const LoginPage = () => {
    const [form, setForm] = useState({
        userId: "",
        password: ""
    });

    const navigate = useNavigate(); // 추가

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.login(form);
            const { token, username, memberId } = response.data;

            localStorage.setItem("jwt_token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("memberId", memberId);
            navigate("/");
        } catch (error) {
            alert("로그인 실패: " + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input name="userId" placeholder="아이디" onChange={handleChange} required />
                <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} required />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginPage;
