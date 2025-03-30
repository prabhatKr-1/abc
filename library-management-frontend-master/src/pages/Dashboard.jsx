import React from "react";
import OwnerDashboard from "../components/OwnerDashboard";
import AdminDashboard from "../components/AdminDashboard";
import ReaderDashboard from "../components/ReaderDashboard";
import { AuthContext } from "../main";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  if (!isLoggedIn) {
    navigate("/login");
  }
  const role = user.Role;

  return (
    <div>
      MY Dashboard
      <button type="submit" onClick={logout}>
        Logout
      </button>
      {role == "Owner" ? (
        <OwnerDashboard />
      ) : role == "Admin" ? (
        <AdminDashboard />
      ) : (
        <ReaderDashboard />
      )}
    </div>
  );
}

export default Dashboard;
