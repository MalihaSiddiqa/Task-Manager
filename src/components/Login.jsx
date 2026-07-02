import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username.trim() && password.trim()) {
      localStorage.setItem("isLoggedIn", "true"); 
      navigate("/dashboard"); 
    } else {
      alert("Please enter a username and password! ");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="task-form login-form">
        <h2>Welcome back!</h2>
        <p>Log in to manage your tasks</p>
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;