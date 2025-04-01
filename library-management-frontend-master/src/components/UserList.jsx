import { useState, useEffect } from "react";
import { fetchUsers, updateUser, deleteUser } from "../services/api";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import { toast } from "react-hot-toast";

import "../styles/Buttons.css";
import "../styles/Tables.css";
import "../styles/Booklist.css";

const UserList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers(role);
    setUsers(data.users);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(role, id);
      toast.success("User deleted successfully!");
      loadUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  return (
    <div className="user-list">
      <div className="search-add">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {(role === "admin" || role === "owner") && (
        <button onClick={() => setShowForm(true)}>Add User</button>
      )}
</div>
      {showForm && (
        <UserForm
          role={role}
          userToEdit={userToEdit}
          onUserSaved={loadUsers}
          onClose={() => {
            setShowForm(false);
            setUserToEdit(null);
          }}
        />
      )}

      <table>
        <thead>
          <tr>
            <th className="mobile-hidden">ID</th>
            <th className="mobile-show">Name</th>
            <th className="mobile-hidden">Email</th>
            <th className="mobile-hidden">Contact</th>
            <th className="mobile-hidden">Role</th>
            {(role === "admin" || role ==="owner") && <th className="mobile-hidden">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user?.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).sort((a,b) => a.id-b.id)
            .map((user, index) => (
              <UserItem
                key={user.id || `user-${index}`}
                user={user}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
