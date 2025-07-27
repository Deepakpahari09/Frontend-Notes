import { useState } from "react";

export default function AuthForm({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isLogin) {
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        onAuth(email);
      } else {
        alert("Invalid credentials");
      }
    } else {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      alert("Signup successful! You can now login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "New user? Signup" : "Already have an account? Login"}
      </p>
    </div>
  );
}
