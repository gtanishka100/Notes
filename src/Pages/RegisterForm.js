import React, { useState } from "react";
import "./../components/Register.css";
import Image from "../login.png";

const RegisterForm = ({ onRegister, onToggleToLogin }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && email && password) {
      onRegister();
    }
  };

  return (
    <div className="register-form-container">
      <div className="image-container">
        <img src={Image} alt="register img" />
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register a new account</h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already registered?{" "}
          <span className="toggle-link" onClick={onToggleToLogin}>
            Go to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
