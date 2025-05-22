import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiService from "../util/ApiService";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [form, setForm] = useState({
    username: "",
    userId: "",
    email: "",
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
      alert("회원가입 실패: " + (error.response?.data || error.message));
    }
  };

  return (
      <div className="signup-page">
        <div className="signup-container">
          <h2 className="title">Register</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Username :</label>
            <input
                name="username"
                placeholder="Enter your name"
                value={form.username}
                onChange={handleChange}
                required
            />
            <label>User ID :</label>
            <input
                name="userId"
                placeholder="Enter your ID"
                value={form.userId}
                onChange={handleChange}
                required
            />
            <label>Email Address :</label>
            <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <label>Password :</label>
            <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <button type="submit" className="signup-button">Sign up</button>
            <p className="login-prompt">
              Already have an account?
              <Link to="/login" className="forgot-link"> Login</Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default SignUpPage;
