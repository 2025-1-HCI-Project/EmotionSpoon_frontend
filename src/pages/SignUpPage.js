import React, { useState } from "react";
import ApiService from "../util/ApiService";
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        userId: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.signUp(form);
            alert("회원가입되었습니다.");
            navigate("/login");
        } catch (error) {
            alert("회원가입 실패하였습니다.: " + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="이름" onChange={handleChange} required />
                <input name="email" placeholder="이메일" onChange={handleChange} required />
                <input name="userId" placeholder="아이디" onChange={handleChange} required />
                <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} required />
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
};

export default SignUpPage;
