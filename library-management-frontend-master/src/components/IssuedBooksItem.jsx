import { createRequest } from "../services/api"; // Import API function
import { toast } from "react-hot-toast"; // Import toast for notifications

const IssuedBooksItem = ({ book, role }) => {
  const handleReturn = async () => {
    try {
      await createRequest(role, { ISBN: book.ISBN, ReqType: "return" });
      toast.success(`Return request created successfully!`);
    } catch (error) { 
      console.log(error)
      toast.error(error?.response?.data?.error || "Failed to return book.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <tr>
      <td>{book.ISBN}</td>
      <td>{formatDate(book.Issue_Date)}</td>
      <td>{formatDate(book.Due_Date)}</td>
      {role === "reader" && book.Status === "issued" && (
        <td>
          <button onClick={handleReturn}>Return</button>
        </td>
      )}
    </tr>
  );
};

export default IssuedBooksItem;
