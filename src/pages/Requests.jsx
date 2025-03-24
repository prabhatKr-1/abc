import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/Requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/requests/all`)
      .then((res) => setRequests(res.data.requests))
      .catch(() => toast.error("Failed to fetch requests"));
  }, []);

  return (
    <div className="requests-container">
      <h2>Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            <span>
              {req.requestType} request for ISBN: {req.bookID}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Requests;
