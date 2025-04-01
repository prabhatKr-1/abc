


import { useState } from 'react';
import "../styles/Tables.css";
import "../styles/Booklist.css";
import "../styles/Buttons.css";

const BookItem = ({ book, role, onEdit, onDelete, onRequestBook }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <tr className="mobile-row" onClick={() => setIsExpanded(!isExpanded)}>
        <td className='hide-desktop' colSpan="8">
          <div className="mobile-header">
            <span className="title">{book.title}</span>
            <span className="toggle">{isExpanded ? '−' : '+'}</span>
          </div>
          
          {isExpanded && (
            <div className="mobile-details">
              <div className="detail-item">
                <span>ISBN:</span>
                <span>{book.ISBN}</span>
              </div>
              <div className="detail-item">
                <span>Author:</span>
                <span>{book.authors}</span>
              </div>
              <div className="detail-item">
                <span>Publisher:</span>
                <span>{book.publisher}</span>
              </div>
              <div className="detail-item">
                <span>Version:</span>
                <span>{book.version}</span>
              </div>
              <div className="detail-item">
                <span>Total Copies:</span>
                <span>{book.total_copies}</span>
              </div>
              <div className="detail-item">
                <span>Available:</span>
                <span>{book.available_copies}</span>
              </div>

              <div className="mobile-actions">
                {role !== "reader" ? (
                  <>
                    <button 
                      className="compact-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(book);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="compact-btn danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(book.ISBN);
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="compact-btn primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestBook(book.ISBN);
                    }}
                    disabled={book.available_copies <= 0}
                  >
                    Request
                  </button>
                )}
              </div>
            </div>
          )}
        </td>
      </tr>

      {/* Desktop View */}
      <tr className="desktop-view">
        <td>{book.ISBN}</td>
        <td>{book.title}</td>
        <td>{book.authors}</td>
        <td>{book.publisher}</td>
        <td>{book.version}</td>
        <td>{book.total_copies}</td>
        <td>{book.available_copies}</td>
        <td>
          {role !== "reader" ? (
            <>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book.ISBN)}>Delete</button>
            </>
          ) : (
            <button 
              onClick={() => onRequestBook(book.ISBN)}
              disabled={book.available_copies <= 0}
            >
              Request
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default BookItem;
