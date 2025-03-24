import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Books.css";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    isbn: "",
    total_copies: 1,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/books/add`,
        formData
      );
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="book-form-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Authors"
          value={formData.authors}
          onChange={(e) =>
            setFormData({ ...formData, authors: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total Copies"
          value={formData.total_copies}
          onChange={(e) =>
            setFormData({ ...formData, total_copies: parseInt(e.target.value) })
          }
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};
export default AddBook;
