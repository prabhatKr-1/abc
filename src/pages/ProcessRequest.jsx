import axios from "axios";
import toast from "react-hot-toast";
import "../styles/Requests.css";

const ProcessRequest = ({ reqID, reqType }) => {
  const handleAction = async (action) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/requests/process`,
        { action, reqtype: reqType, reqid: reqID }
      );
      toast.success(`Request ${action}d successfully`);
    } catch (error) {
      toast.error("Failed to process request");
    }
  };

  return (
    <div>
      <button
        onClick={() => handleAction("approve")}
        className="approve-button"
      >
        Approve
      </button>
      <button onClick={() => handleAction("reject")} className="reject-button">
        Reject
      </button>
    </div>
  );
};
export default ProcessRequest;
