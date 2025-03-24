import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/owner/users`)
      .then((res) => setUsers(res.data.admins))
      .catch(() => toast.error("Failed to fetch users"));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`
        );
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="users-container">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} ({user.role})
            </span>
            <div>
              <Link to={`/users/edit/${user.id}`} className="edit-button">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
