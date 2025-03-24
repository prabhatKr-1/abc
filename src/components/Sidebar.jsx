import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/books">Books</Link></li>
        {user?.role !== "Reader" && <li><Link to="/requests">Requests</Link></li>}
        {user?.role === "Owner" && <li><Link to="/users">Users</Link></li>}
      </ul>
    </div>
  );
};
export default Sidebar;

