import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Books.css";

const EditBook = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    total_copies: 1,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/books/search`, {
        params: { isbn },
      })
      .then((res) => setFormData(res.data.book))
      .catch(() => toast.error("Failed to fetch book details"));
  }, [isbn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/books/${isbn}`,
        formData
      );
      toast.success("Book updated successfully");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  return (
    <div className="book-form-container">
      <h2>Edit Book</h2>
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
          placeholder="Total Copies"
          value={formData.total_copies}
          onChange={(e) =>
            setFormData({ ...formData, total_copies: parseInt(e.target.value) })
          }
          required
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};
export default EditBook;
