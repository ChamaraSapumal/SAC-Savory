import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase"; // Import Firebase instances
import { ref, push, serverTimestamp } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userID, setUserID] = useState(null);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const [alertMessage, setAlertMessage] = useState(""); // State for success message
  const [alertType, setAlertType] = useState(""); // State for alert type (success/error)
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
        setUserID(user.uid);
      } else {
        setIsLoggedIn(false);
        setShowRedirectMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.contact || !/^\d+$/.test(formData.contact))
      newErrors.contact = "Valid contact number is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.guests || formData.guests <= 0)
      newErrors.guests = "Guests must be greater than zero.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(""); // Clear previous error

    try {
      const reservationRef = ref(db, "reservations");
      await push(reservationRef, {
        ...formData,
        dateTime: `${formData.date}T${formData.time}`,
        createdAt: serverTimestamp(),
        createdBy: userEmail,
        userID: userID,
      });

      setAlertMessage("Reservation successfully submitted!");
      setAlertType("success");

      // Reset form
      setFormData({
        name: "",
        contact: "",
        date: "",
        time: "",
        guests: "",
        specialRequests: "",
      });
    } catch (error) {
      setAlertMessage("Error saving reservation. Please try again.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  if (showRedirectMessage) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-600 font-medium text-lg">
          Oops! You need to log in to access this page. Redirecting you now...
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 pt-32">
      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`${
            alertType === "success"
              ? "bg-teal-50 border-t-2 border-teal-500"
              : "bg-red-50 border-s-4 border-red-500"
          } rounded-lg p-4 mb-4`}
          role="alert"
        >
          <div className="flex">
            <div className="shrink-0">
              <span
                className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${
                  alertType === "success"
                    ? "border-teal-100 bg-teal-200 text-teal-800"
                    : "border-red-100 bg-red-200 text-red-800"
                }`}
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {alertType === "success" ? (
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  ) : (
                    <path d="M18 6L6 18"></path>
                  )}
                  {alertType === "success" ? (
                    <path d="m9 12 2 2 4-4"></path>
                  ) : (
                    <path d="m6 6 12 12"></path>
                  )}
                </svg>
              </span>
            </div>
            <div className="ms-3">
              <h3 className="text-gray-800 font-semibold">
                {alertType === "success" ? "Successfully updated." : "Error!"}
              </h3>
              <p className="text-sm text-gray-700">{alertMessage}</p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center">Table Reservation</h1>
      <p className="text-center text-sm text-gray-600 mb-4">
        Logged in as: <span className="font-medium">{userEmail}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Form fields go here */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Guests</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          {errors.guests && (
            <p className="text-red-500 text-sm">{errors.guests}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Submitting..." : "Reserve Table"}
        </button>
      </form>
    </div>
  );
};

export default Table;
