
import { useState } from 'react';
import "../styles/Buttons.css";
import "../styles/Tables.css";

const UserItem = ({ user, role, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <tr className="mobile-row" onClick={() => setIsExpanded(!isExpanded)}>
        <td className='hide-desktop' colSpan="6">
          <div className="mobile-header">
            <span className="name">{user.name}</span>
            <span className="toggle">{isExpanded ? '−' : '+'}</span>
          </div>
          
          {isExpanded && (
            <div className="mobile-details">
              <div className="detail-item">
                <span>ID:</span>
                <span>{user.id}</span>
              </div>
              <div className="detail-item">
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="detail-item">
                <span>Contact:</span>
                <span>{user.contact_number}</span>
              </div>
              <div className="detail-item">
                <span>Role:</span>
                <span>{user.Role}</span>
              </div>

              {(role === "admin" || role === "owner") && (
                <div className="mobile-actions">
                  <button 
                    className="compact-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="compact-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>

      {/* Desktop View */}
      <tr className="desktop-view">
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.contact_number}</td>
        <td>{user.Role}</td>
        {role !== "reader" && (
          <td>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </td>
        )}
      </tr>
    </>
  );
};

export default UserItem;
