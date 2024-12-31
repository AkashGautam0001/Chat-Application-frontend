import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionList from "../components/SessionList";
import ChatRoomPage from "../components/ChatRoomPage";
import FetchUser from "../components/FetchUser";
import axios from "axios";
import { joinRoom, leaveRoom, onNewMessage, addUser } from "../services/socket";
import socket from "../services/socket";
import { SOCKET_EVENTS } from "../utils/constants";

const ChatPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("userId");
    if (!loggedUserId) {
      navigate("/");
    } else {
      setUserId(loggedUserId);
      fetchSessions();
      addUser(loggedUserId); // Add user when they log in
    }
  }, [navigate]);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/chatSession");
      setSessions(response.data.sessions);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const handleSessionClick = async (sessionId) => {
    if (currentSessionId) {
      leaveRoom(currentSessionId);
    }
    setCurrentSessionId(sessionId);
    joinRoom(sessionId);
  };

  return (
    <div className=" bg-black text-gray-200">
      <div className="p-4 bg-blue-800 text-center font-bold text-2xl shadow-lg">
        Real-Time Chat
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-4 bg-gray-900 border-r border-gray-700 p-4">
          <h3 className="text-lg font-bold mb-4 text-white">Sessions</h3>
          <SessionList
            sessions={sessions}
            onSessionClick={handleSessionClick}
          />
          <FetchUser />
        </div>
        <div className="col-span-8 bg-gray-800 p-4">
          {currentSessionId ? (
            <ChatRoomPage sessionId={currentSessionId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">
                Select a session to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
