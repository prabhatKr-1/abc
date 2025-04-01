// import "../styles/Buttons.css";
// import "../styles/Tables.css";

// const RequestItem = ({ request, role, onAccept, onReject }) => {
//   return (
//     <tr>
//       <td>{request.reqID}</td>
//       <td>{request.readerID}</td>
//       <td>{request.bookID}</td>
//       <td>{request.RequestType}</td>
//       <td>{request.status}</td>
//       {role !== "reader" && (
//         <td>
//           <button onClick={() => onAccept(request)}>Accept</button>
//           <button onClick={() => onReject(request)}>Reject</button>
//         </td>
//       )}
//     </tr>
//   );
// };

// export default RequestItem;


import { useState } from 'react';
import "../styles/Buttons.css";
import "../styles/Tables.css";

const RequestItem = ({ request, role, onAccept, onReject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <tr className="mobile-row" onClick={() => setIsExpanded(!isExpanded)}>
        <td className='hide-desktop' colSpan="6">
          <div className="mobile-header">
            <span className="request-id">Request #{request.reqID}</span>
            <span className="toggle">{isExpanded ? '−' : '+'}</span>
          </div>
          
          {isExpanded && (
            <div className="mobile-details">
              <div className="detail-item">
                <span>Reader ID:</span>
                <span>{request.readerID}</span>
              </div>
              <div className="detail-item">
                <span>ISBN:</span>
                <span>{request.bookID}</span>
              </div>
              <div className="detail-item">
                <span>Type:</span>
                <span>{request.RequestType}</span>
              </div>
              {/* <div className="detail-item">
                <span>Status:</span>
                <span className={`status-${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div> */}

              {role !== "reader" && (
                <div className="mobile-actions">
                  <button 
                    className="compact-btn success"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAccept(request);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="compact-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReject(request);
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>

      {/* Desktop View */}
      <tr className="desktop-view">
        <td>{request.reqID}</td>
        <td>{request.readerID}</td>
        <td>{request.bookID}</td>
        <td>{request.RequestType}</td>
        {/* <td className={`status-${request.status.toLowerCase()}`}>
          {request.status}
        </td> */}
        {role !== "reader" && (
          <td>
            <button className="success" onClick={() => onAccept(request)}>Accept</button>
            <button className="danger" onClick={() => onReject(request)}>Reject</button>
          </td>
        )}
      </tr>
    </>
  );
};

export default RequestItem;
