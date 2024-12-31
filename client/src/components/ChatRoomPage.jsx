import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages, sendMessage as apiSendMessage } from "../services/api";
import {
  joinRoom,
  leaveRoom,
  onNewMessage,
  sendMessage as socketSendMessage,
} from "../services/socket";
import ChatWindow from "./ChatWindow";

const ChatRoomPage = ({ sessionId: propSessionId }) => {
  const { sessionId: routeSessionId } = useParams();
  const sessionId = propSessionId || routeSessionId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderId, setSenderId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    joinRoom(sessionId); // Join the room on mount

    // Fetch existing messages from the API
    fetchMessages(sessionId)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((err) => {
        console.error("Error fetching messages", err);
      });

    // Listen for new messages via socket
    onNewMessage((newMessage) => {
      console.log("New message received via socket:", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on unmount
    return () => {
      leaveRoom(sessionId);
    };
  }, [sessionId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent empty messages

    const messageDataForDB = {
      senderId,
      content: newMessage,
      sessionId,
      createdAt: new Date().toISOString(),
    };

    const username = localStorage.getItem("userName");

    const formattedMessageForSocket = {
      sender: {
        id: senderId,
        name: username || "Unknown",
      },
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    console.log(
      "New message received via socket.io 4",
      formattedMessageForSocket
    );
    // setMessages((prevMessages) => [...prevMessages, formattedMessageForSocket]);

    socketSendMessage(sessionId, formattedMessageForSocket);

    apiSendMessage(sessionId, messageDataForDB)
      .then((response) => {
        console.log("Message sent:", response.data);
      })
      .catch((err) => {
        console.error("Error sending message", err);
      });

    setNewMessage(""); // Clear the input field
  };

  return (
    <div className="chat-room-page bg-black text-white h-screen flex flex-col">
      {/* Header */}
      <div className="chat-header bg-gray-800 p-4 text-center shadow-md">
        <h2 className="text-2xl font-bold">Chat Room: {sessionId}</h2>
      </div>

      {/* Messages Container */}
      <div className="messages-container flex-grow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <ChatWindow messages={messages} userId={senderId} />
      </div>

      {/* Message Input */}
      <div className="message-input p-4 bg-gray-800 flex gap-4 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input-message bg-gray-900 text-white p-3 rounded-lg flex-grow outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="send-button bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
