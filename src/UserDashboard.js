import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { db } from "./Firebase"; // Ensure you correctly import the Firebase config

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setIsLoggedIn(true);
        console.log("Fetching data for user UID:", user.uid); // Debugging statement
        const userRef = ref(db, `Users/${user.uid}`);
        console.log("Database reference path:", `Users/${user.uid}`); // Debugging statement

        try {
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("User data fetched successfully:", userData);
            setUserData(userData);
          } else {
            console.warn("No data found for UID:", user.uid);
            setError(
              "No data available for this user. Please check the database."
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          setError("Error fetching data: " + error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No authenticated user found.");
        setError("Please log in to view the dashboard.");
        setIsLoggedIn(false); // User is not logged in
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  // Empty dependency array ensures this effect runs once when the component mounts

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update state to reflect logged-out status
      setUserData(null); // Clear user data
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
      setError("Failed to log out. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Logout/Login Button */}
      <div className="flex justify-end">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => console.log("Navigate to login page")}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Login
          </button>
        )}
      </div>

      {/* User Dashboard */}
      {isLoggedIn && userData && (
        <div>
          <div className="sm:px-0">
            <h3 className="text-lg font-semibold text-gray-900">
              User Dashboard
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Personal details and application data.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                  {userData?.firstName || "N/A"} {userData?.lastName || ""}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                  {userData?.email || "N/A"}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                  {userData?.phoneNumber || "N/A"}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Address</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                  {userData?.address || "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
