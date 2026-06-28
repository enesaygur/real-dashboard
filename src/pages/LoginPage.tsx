import React, { useState } from "react";
interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log(formData.email, formData.password);
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
