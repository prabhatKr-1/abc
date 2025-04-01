import { useState } from "react";
import BookList from "./BookList";
import UserList from "./UserList";
import RequestList from "./RequestList";
import Navbar from "./Navbar";

import "../styles/Buttons.css";
import "../styles/Tables.css";
import "../styles/Dashboard.css";


const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="dashboard">
      <Navbar />
      <h2 style={{textAlign:"center"}}>Owner Dashboard</h2>
      <div className="tabs">
        <button
          onClick={() => setActiveTab("books")}
          className={activeTab === "books" ? "active" : ""}
        >
          <h2>Books</h2>
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          <h2>Users</h2>
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={activeTab === "requests" ? "active" : ""}
        >
          <h2>Requests</h2>
          
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "books" && <BookList role={"owner"} />}
        {activeTab === "users" && <UserList role={"owner"} />}
        {activeTab === "requests" && <RequestList role={"owner"} />}
      </div>
    </div>
  );
};

export default OwnerDashboard;
