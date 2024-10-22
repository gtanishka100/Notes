import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RegisterForm from "./Pages/RegisterForm";
import LoginForm from "./Pages/LoginForm";
import NotesPage from "./Pages/NotesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const getInitialLoginState = () => {
    const savedLoginState = localStorage.getItem("loggedIn");
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  };

  const [loggedIn, setLoggedIn] = useState(getInitialLoginState);

  const handleLogin = (data) => {
    if (data.success && data.data?.sessionId) {
      localStorage.setItem("session-id", data.data.sessionId);
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
    }
  };

  const handleRegister = (data) => {
    if (data.success && data.data?.id) {
      localStorage.setItem("session-id", data.data.id);
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("session-id");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  const RegisterWithNavigate = () => {
    const navigate = useNavigate();
    return (
      <RegisterForm
        onRegister={handleRegister}
        onToggleToLogin={() => navigate("/login")}
      />
    );
  };

  const LoginWithNavigate = () => {
    const navigate = useNavigate();
    return (
      <LoginForm
        onLogin={handleLogin}
        onToggleToRegister={() => navigate("/")}
      />
    );
  };

  const ProtectedRoute = ({ children }) => {
    const sessionId = localStorage.getItem("session-id");

    if (!loggedIn || !sessionId) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="app-container">
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

        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/notes" replace />
              ) : (
                <RegisterWithNavigate />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/notes" replace />
              ) : (
                <LoginWithNavigate />
              )
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
