import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/reader/books`)
      .then((res) => setBooks(res.data.books))
      .catch(() => toast.error("Failed to fetch books"));
  }, []);

  const handleDelete = async (isbn) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/admin/books/${isbn}`
        );
        setBooks(books.filter((book) => book.isbn !== isbn));
        toast.success("Book deleted successfully");
      } catch (error) {
        toast.error("Failed to delete book");
      }
    }
  };

  return (
    <div className="books-container">
      <h2>Books</h2>
      <Link to="/books/add" className="add-button">
        Add Book
      </Link>
      <ul>
        {books.map((book) => (
          <li key={book.isbn}>
            <span>
              {book.title} by {book.authors}
            </span>
            <div>
              <Link to={`/books/edit/${book.isbn}`} className="edit-button">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book.isbn)}
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
export default Books;
