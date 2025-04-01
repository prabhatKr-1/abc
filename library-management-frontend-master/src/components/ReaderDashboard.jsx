import { useState } from "react";
import BookList from "./BookList";
import IssuedBooksList from "./IssuedBooksList";
import RequestList from "./RequestList";
import Navbar from "./Navbar";

import "../styles/Buttons.css";
import "../styles/Tables.css";
import "../styles/Dashboard.css";

const ReaderDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="dashboard">
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Reader Dashboard</h2>
      <div className="tabs">
        <button
          onClick={() => setActiveTab("books")}
          className={activeTab === "books" ? "active" : ""}
        >
          <h2>Books</h2>
        </button>
        <button
          onClick={() => setActiveTab("issued")}
          className={activeTab === "issued" ? "active" : ""}
        >
          <h2>Issued Books</h2>
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={activeTab === "requests" ? "active" : ""}
        >
          <h2>Requests</h2>
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "books" && <BookList role={"reader"} />}
        {activeTab === "issued" && <IssuedBooksList role={"reader"} />}
        {activeTab === "requests" && <RequestList role={"reader"} />}
      </div>
    </div>
  );
};

export default ReaderDashboard;
