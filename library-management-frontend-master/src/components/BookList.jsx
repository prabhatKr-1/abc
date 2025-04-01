import { useState, useEffect } from "react";
import { fetchBooks, deleteBook, createRequest } from "../services/api";
import BookItem from "./BookItem";
import BookForm from "./BookForm";
import { toast } from "react-hot-toast";

import "../styles/Tables.css";
import "../styles/Booklist.css";
import "../styles/Buttons.css";

const BookList = ({ role }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks(role);
    setBooks(data.books);
  };

  const handleDelete = async (isbn) => {
    try {
      await deleteBook(role, isbn);
      toast.success("Book deleted successfully!");
      loadBooks();
    } catch (error) {
      toast.error("Failed to delete book.");
    }
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
    setShowForm(true);
  };

  const handleRequestBook = async (isbn) => {
    if (isRequesting) return;
    try {
      setIsRequesting(true);
      await createRequest(role, { ISBN: isbn, ReqType: "issue" });
      toast.success("Book request submitted successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to submit book request."
      );
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="book-list">
      <div className="search-add">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {role !== "reader" && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            Add Book
          </button>
        )}
      </div>
      {showForm && (
        <BookForm
          role={role}
          bookToEdit={bookToEdit}
          onBookSaved={loadBooks}
          onClose={() => {
            setShowForm(false);
            setBookToEdit(null);
          }}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="mobile-hidden">ISBN</th>
              <th className="mobile-show">Title</th>
              <th className="mobile-hidden"  >Author</th>
              <th className="mobile-hidden">Publisher</th>
              <th className="mobile-hidden">Version</th>
              <th className="mobile-hidden">Total Copies</th>
              <th className="mobile-hidden">Available Copies</th>
              <th className="mobile-hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books
              .filter(
                (book) =>
                  book?.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  book?.authors
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  searchTerm.toLowerCase().includes(book?.ISBN.toString())
              )
              .sort((a, b) => a.ISBN - b.ISBN)
              .map((book, index) => (
                <BookItem
                  key={book.ISBN || `book-${index}`}
                  book={book}
                  role={role}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(book.ISBN)}
                  onRequestBook={handleRequestBook}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
