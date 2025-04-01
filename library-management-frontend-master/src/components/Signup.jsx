import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import toast from "react-hot-toast";

import "../styles/Buttons.css";
import "../styles/Tables.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [libName, setLibName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email regex
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Ensures exactly 10 digits
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter,
    // one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      setLoading(false);
      return;
    }

    try {
      const data = await signup({
        name,
        email,
        LibraryName: libName,
        ContactNumber: phone,
        password,
      });
      toast.success(data?.message || "Account created successfully! Login now");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{color:"rgb(36, 38, 162)"}}>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          placeholder="Library Name"
          value={libName}
          onChange={(e) => setLibName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
