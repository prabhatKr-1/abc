import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setAuthToken } from "../services/api";
import { AuthContext } from "../App";
import toast from "react-hot-toast";

import "../styles/Buttons.css";
import "../styles/Tables.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // Email validation function using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Common regex for email validation
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the email before proceeding
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(response.user));
      setAuthToken(response.token);
      setUser(response.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{color:"rgb(36, 38, 162)"}}>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
