import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState<string>("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!formData.email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!formData.password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      setAuthError("Invalid email or password");
    }

    setAuthError("Invalid email or password");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && <p>{passwordError}</p>}
        </div>
        {authError && <p>{authError}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
