import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider"; // Import AuthProvider
import Login from "./Login"; // Ensure Login component is correctly imported
import Signup from "./Signup"; // Add Signup component if needed
import Home from "./Home";
import UserDashboard from "./UserDashboard";
import Menu from "./Menu";
import NotFound from "./NotFound"; // Import the NotFound component
import GotoWeb from "./GotoWeb";

function App() {
  return (
    <AuthProvider>
      {/* Wrap the app with AuthProvider */}
      <Router basename="/sac-savory">
        <Navbar />
        <div className="mx-auto p-0">
          <Routes>
            {/* Define the routes */}
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/menu" element={<Menu />} />
            {/* Catch-all route for undefined paths (404) */}
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
          </Routes>
        </div>
        <GotoWeb />
      </Router>
    </AuthProvider>
  );
}

export default App;
