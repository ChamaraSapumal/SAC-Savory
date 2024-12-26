import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Ensure Login component is correctly imported
import Signup from "./Signup"; // Add Signup component if needed
import Home from "./Home";
import UserDashboard from "./UserDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
