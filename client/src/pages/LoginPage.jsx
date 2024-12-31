import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      if (userId.trim()) {
        const response = await axios.get(
          `http://localhost:8080/api/user/${userId}`
        );
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", response.data.user.username);
          navigate("/chat");
        }
      } else {
        setError("Please enter a valid User ID");
      }
    } catch (err) {
      setError("User ID not found. Please check and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Enter User ID (MongoDB ID)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <h3 className="text-xl font-bold mt-4">Users</h3>
        <ul className="mt-2 ">
          {users.map((user) => (
            <li
              key={user._id}
              className="border-b border-gray-300 py-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={(e) => setUserId(user._id)}
            >
              {user.name} {user._id}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
