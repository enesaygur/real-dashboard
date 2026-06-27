function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
