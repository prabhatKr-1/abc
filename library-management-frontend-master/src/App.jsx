import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect, useMemo } from "react";
import Auth from "./pages/Auth";
import { logoutUser } from "./services/api";
import toast, { Toaster } from "react-hot-toast";
import OwnerDashboard from "./components/OwnerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ReaderDashboard from "./components/ReaderDashboard";
import LandingPage from "./pages/LandingPage";

export const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        toast.error("Session expired, please log in again");
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  const authContextValue = useMemo(() => ({ user, setUser, logout }), [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={authContextValue}>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          {/* <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />
            }
          /> */}
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                user.Role === "Owner" ? (
                  <OwnerDashboard />
                ) : user.Role === "Admin" ? (
                  <AdminDashboard />
                ) : (
                  <ReaderDashboard />
                )
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

export const useAuth = () => useContext(AuthContext);
