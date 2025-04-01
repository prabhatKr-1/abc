 

import { useState } from 'react';
import { createRequest } from "../services/api";  
import { toast } from "react-hot-toast";  
import "../styles/Buttons.css";
import "../styles/Tables.css";

const IssuedBooksItem = ({ book, role }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReturn = async (e) => {
    e.stopPropagation();
    try {
      await createRequest(role, { ISBN: book.ISBN, ReqType: "return" });
      toast.success(`Return request created successfully!`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Failed to return book.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <>
      {/* Mobile View */}
      <tr className="mobile-row" onClick={() => setIsExpanded(!isExpanded)}>
        <td className='hide-desktop' colSpan="5">
          <div className="mobile-header">
            <span className="isbn">ISBN: {book.ISBN}</span>
            <span className="toggle">{isExpanded ? '−' : '+'}</span>
          </div>
          
          {isExpanded && (
            <div className="mobile-details">
              <div className="detail-item">
                <span>Issue Date:</span>
                <span>{formatDate(book.Issue_Date)}</span>
              </div>
              <div className="detail-item">
                <span>Due Date:</span>
                <span>{formatDate(book.Due_Date)}</span>
              </div>
              <div className="detail-item">
                <span>Status:</span>
                <span className={`status-${book.Status.toLowerCase()}`}>
                  {book.Status}
                </span>
              </div>

              {role === "reader" && book.Status === "issued" && (
                <div className="mobile-actions">
                  <button 
                    className="compact-btn success"
                    onClick={handleReturn}
                  >
                    Return
                  </button>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>

      {/* Desktop View */}
      <tr className="desktop-view">
        <td>{book.ISBN}</td>
        <td>{formatDate(book.Issue_Date)}</td>
        <td>{formatDate(book.Due_Date)}</td>
        <td className={`status-${book.Status.toLowerCase()}`}>{book.Status}</td>
        {role === "reader" && book.Status === "issued" && (
          <td>
            <button className="success" onClick={handleReturn}>Return</button>
          </td>
        )}
      </tr>
    </>
  );
};

export default IssuedBooksItem;
