import { useState, useEffect } from "react";
import { fetchBorrowedBooks } from "../services/api";
import IssuedBooksItem from "./IssuedBooksItem";

const BorrowedBooksList = ({ role }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const loadBorrowedBooks = async () => {
      try {
        const data = await fetchBorrowedBooks(role);
        setBorrowedBooks(data?.response || []);
      } catch (error) {
        console.error("Error loading borrowed books:", error);
        setBorrowedBooks([]);
      }
    };

    loadBorrowedBooks();
  }, [role]);  

  return (
    <div className="borrowed-books-list">
      <h2>Borrowed Books</h2>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Return Date</th>
            <th>Due Date</th>
            {role !== "reader" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book, index) => (
              <IssuedBooksItem
                key={`${book.ISBN}-${index}`}
                book={book}
                role={role}
              />
            ))
          ) : (
            <tr>
              <td colSpan={role !== "reader" ? 4 : 3}>
                No books currently borrowed.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooksList;
