// // SessionManagement.jsx
// import React, { useState, useEffect } from "react";
// import { fetchMessages, sendMessage as apiSendMessage } from "../services/api";
// import {
//   joinRoom,
//   leaveRoom,
//   onNewMessage,
//   sendMessage as socketSendMessage,
// } from "../services/socket";
// import ChatWindow from "./ChatWindow";

// const SessionManagement = ({ sessionId }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [senderId, setSenderId] = useState(localStorage.getItem("userId"));

//   useEffect(() => {
//     const fetchMessagesData = async () => {
//       try {
//         const response = await fetchMessages(sessionId);
//         setMessages(response.data.messages);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       }
//     };

//     fetchMessagesData();

//     joinRoom(sessionId);

//     onNewMessage((newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       leaveRoom(sessionId);
//     };
//   }, [sessionId]);

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       const messageData = {
//         sessionId,
//         senderId,
//         content: message,
//       };

//       try {
//         await apiSendMessage(sessionId, messageData);
//         socketSendMessage(sessionId, messageData);
//         setMessage("");
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Chat Session: {sessionId}</h2>

//       <div className="messages mb-4 max-h-96 overflow-y-scroll">
//         <ChatWindow messages={messages} userId={senderId} />
//       </div>

//       <div className="flex items-center">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           placeholder="Type a message"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SessionManagement;
