import { useState } from "react";
import BookList from "./BookList";
import UserList from "./UserList";
import RequestList from "./RequestList";
import Navbar from "./NavBar";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="dashboard">
      <Navbar />
      <h2>Owner Dashboard</h2>
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
        {activeTab === "books" && <BookList role={"owner"} />}
        {activeTab === "users" && <UserList role={"owner"} />}
        {activeTab === "requests" && <RequestList role={"owner"}/>}
      </div>
    </div>
  );
};

export default OwnerDashboard;
