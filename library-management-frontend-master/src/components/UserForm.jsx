import { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";
import { toast } from "react-hot-toast";

const UserForm = ({ role, userToEdit, onUserSaved, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [userRole, setUserRole] = useState("reader");
  const [userPass, setUserPass] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setUserRole(userToEdit.role);
      setContact(userToEdit.Contact_number);
      setUserPass(userToEdit.password);
    }
  }, [userToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, role: userRole,password:userPass,contactnumber:contact };

    try {
      if (userToEdit) {
        await updateUser(role, userToEdit.id, userData);
        toast.success("User updated successfully!");
      } else {
        await addUser(role, userData);
        toast.success("User added successfully!");
      }
      onUserSaved();
      onClose();
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.error || "Failed to save the user.");
    }
  };

  return (
    <div className="form-container">
      <h3>{userToEdit ? "Edit User" : "Add User"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        />
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="reader">Reader</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{userToEdit ? "Update" : "Add"} User</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
