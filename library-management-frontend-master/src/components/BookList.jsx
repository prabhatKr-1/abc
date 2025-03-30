import { useState, useEffect } from "react";
import { fetchBooks, deleteBook, createRequest } from "../services/api";
import BookItem from "./BookItem";
import BookForm from "./BookForm";
import { toast } from "react-hot-toast";

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
      console.log(isbn);
      await deleteBook(role, isbn);
      toast.success("Book deleted successfully!");
      loadBooks();
    } catch (error) {
      console.log(error);
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
      await createRequest(role, {
        ISBN: isbn,
        ReqType: "issue"
      });
      toast.success("Book request submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error||"Failed to submit book request.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="book-list">
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {role !== "reader" && (
        <button onClick={() => setShowForm(true)}>Add Book</button>
      )}

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

      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Version</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((book) =>
              book?.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((book, index) => (
              <BookItem
                key={book.ISBN || `book-${index}`}
                book={book}
                role={role}
                onEdit={handleEdit}
                onDelete={() => {
                  console.log(book);
                  handleDelete(book.ISBN);
                }}
                onRequestBook={handleRequestBook}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
