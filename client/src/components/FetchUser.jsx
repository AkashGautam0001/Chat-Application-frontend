import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userID = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${userID}`
        );
        console.log(response.data.user);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    if (userID) {
      fetchUserData();
    } else {
      setError("No userID found in local storage");
      setLoading(false);
    }
  }, [userID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-gray-700">User Profile</h2>
      <p className="text-gray-600">UserID: {user?._id}</p>
      <p className="text-gray-600">Username: {user?.username}</p>
      <p className="text-gray-600">Email: {user?.email}</p>
    </div>
  );
};

export default FetchUser;
