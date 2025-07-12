import React, { useEffect, useState } from "react";
import bgimg from "../images/bg-img.jpg";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setError("User does not exist. Please try again.");
    }, 1500);
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <div id="preloader"></div>
      ) : (
        <div className="bg-img-container">
          <img src={bgimg} alt="Background" />
          <div className="login-form">
            <h2 className="login-text">Welcome Back</h2>
            {showAlert && (
              <div className="alert-container">
                Incorrect username or password. Please try again.
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-options">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember Me
                </label>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
