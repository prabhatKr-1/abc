import { useState, useEffect, useContext } from "react";
import { addBook, updateBook } from "../services/api";
import { toast } from "react-hot-toast";

const BookForm = ({ role, bookToEdit, onBookSaved, onClose }) => {
  const [isbn, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthor] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availbleCopies, setAvailableCopies] = useState("");
  const [publisher, setPublisher] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setISBN(bookToEdit.isbn);
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.authors);
      setTotalCopies(bookToEdit.total_copies);
      setAvailableCopies(bookToEdit.available_copies);
      setPublisher(bookToEdit.publisher);
      setVersion(bookToEdit.version);
    }
  }, [bookToEdit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      ISBN: isbn,
      title,
      authors,
      Total_copies: totalCopies,
      Available_copies: availbleCopies,
      publisher,
      version,
    };

    try {
      if (bookToEdit) {
        await updateBook(role, bookToEdit.ISBN, bookData);
        toast.success("Book updated successfully!");
      } else {
        await addBook(role, bookData);
        toast.success("Book added successfully!");
      }
      onBookSaved();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to save the book.");
    }
  };

  return (
    <div className="form-container">
      <h3>{bookToEdit ? "Edit Book" : "Add Book"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={authors}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <input
          type="text"
          value={version}
          placeholder="Version"
          onChange={(e) => setVersion(e.target.value)}
        />
        <input
          type="text"
          value={totalCopies}
          placeholder="Total Copies"
          onChange={(e) => setTotalCopies(e.target.value)}
        />
        <input
          type="text"
          placeholder="Available Copies"
          value={availbleCopies}
          onChange={(e) => setAvailableCopies(e.target.value)}
        />
        <button type="submit">{bookToEdit ? "Update" : "Add"} Book</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BookForm;
