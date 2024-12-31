import io from "socket.io-client";
import { SOCKET_EVENTS } from "../utils/constants";

const socket = io("http://localhost:8000"); // Update to the new messaging server URL

export const joinRoom = (sessionId) => {
  socket.emit(SOCKET_EVENTS.JOIN_ROOM, { sessionId });
};

export const addUser = (userId) => {
  socket.emit(SOCKET_EVENTS.NEW_USER_ADD, userId);
};

export const onNewMessage = (callback) => {
  console.log("Listening for new messages via socket.io 3");
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, callback);
};

export const sendMessage = (sessionId, message) => {
  console.log("Sending message via socket.io 1", message);
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { sessionId, message });
};

export const onActiveUsers = (callback) => {
  socket.on(SOCKET_EVENTS.GET_USERS, callback);
};

export const leaveRoom = (sessionId) => {
  socket.emit(SOCKET_EVENTS.LEAVE_ROOM, { sessionId });
};

export default socket;
