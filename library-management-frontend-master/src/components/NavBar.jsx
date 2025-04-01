// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../App";
// import { toast } from "react-hot-toast";
// import "../styles/Navbar.css";
// import "../styles/Buttons.css";
// import "../styles/Tables.css";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//       toast.success("Logged out successfully!");
//     } catch (error) {
//       toast.error("Failed to log out");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">{user.LibName}</div>
//       <div className="navbar-actions">
//         {user && <span className="navbar-user">Hello, {user.Name}</span>}
//         <button className="navbar-logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { toast } from "react-hot-toast";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">{user?.LibName || "Library System"}</div>
      <div className="navbar-actions">
        {user && <span className="navbar-user">Hello, {user.Name}</span>}
        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
