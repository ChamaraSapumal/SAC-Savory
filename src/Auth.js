import React, { useState } from "react";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isLoginMode) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      // Get the userId from the Firebase auth object
      const userId = userCredential.user.uid;

      // Call your function to handle user data, passing the userId
      onAuthSuccess(userId); // You can use this userId to fetch or add user data
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isLoginMode ? "Login" : "Sign Up"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-2"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 w-full"
        >
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => setIsLoginMode(!isLoginMode)}
        className="text-blue-500"
      >
        Switch to {isLoginMode ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default Auth;
