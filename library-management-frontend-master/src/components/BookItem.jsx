const BookItem = ({ book, role, onEdit, onDelete, onRequestBook }) => {
  return (
    <tr>
      <td>{book.ISBN}</td>
      <td>{book.title}</td>
      <td>{book.authors}</td>
      <td>{book.publisher}</td>
      <td>{book.version}</td>
      <td>{book.total_copies}</td>
      <td>{book.available_copies}</td>
      {role !== "reader" ? (
        <td>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book.ISBN)}>Delete</button>
        </td>
      ) : (
        <td>
          <button
            onClick={() => onRequestBook(book.ISBN)}
            disabled={book.available_copies <= 0}
          >
            Request Book
          </button>
        </td>
      )}
    </tr>
  );
};

export default BookItem;
