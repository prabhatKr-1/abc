import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Users.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contactNumber: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/owner/users`)
      .then((res) => {
        const user = res.data.admins.find((u) => u.id === parseInt(id));
        if (user) setFormData(user);
      })
      .catch(() => toast.error("Failed to fetch user details"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`,
        formData
      );
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="user-form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={(e) =>
            setFormData({ ...formData, contactNumber: e.target.value })
          }
          required
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};
export default EditUser;
