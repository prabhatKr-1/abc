import { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/api";
import { toast } from "react-hot-toast";

import "../styles/Buttons.css";
import "../styles/Tables.css";
import "../styles/Forms.css";

const UserForm = ({ role, userToEdit, onUserSaved, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [userRole, setUserRole] = useState("reader");
  const [userPass, setUserPass] = useState("");

  // Populate form fields if editing a user
  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setUserRole(userToEdit.Role);
      setContact(userToEdit.contact_number);
      setUserPass(userToEdit.password);
    }
  }, [userToEdit]);

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
    // Password must be at least 8 characters long, contain one uppercase letter,
    // one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(contact)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!validatePassword(userPass)) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    const userData = {
      name,
      email,
      Role: userRole,
      password: userPass,
      contactnumber: contact,
    };

    try {
      if (userToEdit) {
        await updateUser(role, userData);
        toast.success("User updated successfully!");
      } else {
        await addUser(role, userData);
        toast.success("User added successfully!");
      }
      onUserSaved();
      onClose();
    } catch (error) {
      console.log(error);
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
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
          required
        />
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="Reader">Reader</option>
          <option value="Admin">Admin</option>
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
