import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import { toast } from "react-hot-toast";

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
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {(role === "admin" || role === "owner") && (
        <button onClick={() => setShowForm(true)}>Add User</button>
      )}

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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Role</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user?.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
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
