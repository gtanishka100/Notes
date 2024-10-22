import React, { useState } from "react";
import "./../components/Register.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../login.png";

const RegisterForm = ({ onRegister, onToggleToLogin }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://notes-backend-ts.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }
      if (data.success && data.data.id) {
        // Save user session ID in localStorage
        localStorage.setItem("User-id", data.data.id);

        setUserName("");
        setEmail("");
        setPassword("");

        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        onRegister(data);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred during registration", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="image-container">
        <img src={Image} alt="login img" />
      </div>
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-form">Register a new account</h2>

        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
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
