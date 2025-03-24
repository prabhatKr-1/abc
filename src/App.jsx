import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Book";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Requests from "./pages/Requests";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import "./styles/App.css";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="/books"
                element={<ProtectedRoute element={<Books />} />}
              />
              <Route
                path="/books/add"
                element={<ProtectedRoute element={<AddBook />} />}
              />
              <Route
                path="/books/edit/:isbn"
                element={<ProtectedRoute element={<EditBook />} />}
              />
              <Route
                path="/requests"
                element={<ProtectedRoute element={<Requests />} />}
              />
              <Route
                path="/users"
                element={<ProtectedRoute element={<Users />} />}
              />
              <Route
                path="/users/edit/:id"
                element={<ProtectedRoute element={<EditUser />} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
