import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <>
      <h2>Welcome</h2>
      <div className="tabs">
        <button
          onClick={() => setActiveTab("login")}
          className={activeTab === "books" ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={activeTab === "users" ? "active" : ""}
        >
          SignUp
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "login" && <Login />}
        {activeTab === "signup" && <Signup />}
      </div>
    </>
  );
}

export default Auth;
