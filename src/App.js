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

function App() {
  const getInitialLoginState = () => {
    const savedLoginState = localStorage.getItem("loggedIn");
    return savedLoginState ? JSON.parse(savedLoginState) : false;
  };

  const [loggedIn, setLoggedIn] = useState(getInitialLoginState);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
  };

  const handleRegister = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
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

  return (
    <Router>
      <div className="app-container">
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
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/notes"
            element={loggedIn ? <NotesPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
