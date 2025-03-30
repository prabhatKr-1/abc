import { useState, useEffect } from "react";
import { fetchRequests, handleRequest } from "../services/api";
import RequestItem from "./RequestItem";
import { toast } from "react-hot-toast";

const RequestList = ({ role, userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const response = await fetchRequests(role, userId);
    setRequests(response.requests);
    console.log(response);
  };
  const handleAccept = async (request) => {
    try {
      await handleRequest(role, {
        reqID: request.reqID,
        ReqType: request.RequestType,
        Action: "approve",
      });
      toast.success("Request accepted!");
      await loadRequests();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to accept request.");
    }
  };

  const handleReject = async (request) => {
    try {
      await handleRequest(role, {
        reqID: request.reqID,
        ReqType: request.RequestType,
        Action: "reject",
      });
      toast.success("Request rejected!");
      await loadRequests();
    } catch (error) {
      toast.error("Failed to reject request.");
    }
  };

  return (
    <div className="request-list">
      <h2>Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Reader ID</th>
            <th>ISBN</th>
            <th>Request Type</th>
            {role !== "reader" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests?.length > 0 ? (
            requests.map((request) => (
              <RequestItem
                key={request.reqID}
                request={request}
                role={role}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5">No requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
