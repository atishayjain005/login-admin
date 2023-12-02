import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: username,
          password: password,
        }
      );

      console.log("Login successful!");
      console.log("Response:", response.data);

      navigate("/admin-dashboard", { state: response.data });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Venue Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="text-field">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </div>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? "🔒" : "👁️"}
          </span>
        </div>
        <button type="submit">Login</button>
        <p>New Registration?</p>
      </form>
    </div>
  );
};

export default LoginForm;
