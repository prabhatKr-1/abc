const RequestItem = ({ request, role, onAccept, onReject }) => {
  return (
    <tr>
      <td>{request.reqID}</td>
      <td>{request.readerID}</td>
      <td>{request.bookID}</td>
      <td>{request.status}</td>
      <td>{request.RequestType}</td>
      {role !== "reader" && (
        <td>
          <button onClick={() => onAccept(request)}>Accept</button>
          <button onClick={() => onReject(request)}>Reject</button>
        </td>
      )}
    </tr>
  );
};

export default RequestItem; 
