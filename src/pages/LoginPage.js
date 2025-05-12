import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import ApiService from "../util/ApiService";
import "./LoginPage.css";

const LoginPage = () => {
  const [form, setForm] = useState({ userId: "", password: "" });
  const navigate = useNavigate();

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
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-group">
          <input
            name="userId"
            placeholder="ID"
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <Link to="/forgot" className="forgot-link">
          Forgot Password?
        </Link>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="register-text">
          Don’t have account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;