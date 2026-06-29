import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
  const { login, loading } = useAuth();
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
    if (
      formData.email === "admin@example.com" &&
      formData.password === "123456"
    ) {
      try {
        await login(formData.email, formData.password);
        navigate("/");
      } catch (error) {
        setAuthError("Invalid email or password");
      }

      return;
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
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
