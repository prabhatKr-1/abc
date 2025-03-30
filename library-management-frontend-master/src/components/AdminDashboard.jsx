import { useState } from "react";
import BookList from "./BookList";
import UserList from "./UserList";
import RequestList from "./RequestList";
import { useAuth } from "../App";
import Navbar from "./NavBar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");
  return (
    <div className="dashboard">
      <Navbar />
      <h2>Admin Dashboard</h2>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("books")}
          className={activeTab === "books" ? "active" : ""}
        >
          Books
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={activeTab === "requests" ? "active" : ""}
        >
          Requests
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "books" && <BookList role={"admin"} />}
        {activeTab === "users" && <UserList role={"admin"} />}
        {activeTab === "requests" && <RequestList role={"admin"} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
