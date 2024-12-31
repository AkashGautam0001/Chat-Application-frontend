import axios from "axios";

export const API_URL = `https://scalable-chat-app-qcq3.onrender.com/api`;

export const fetchUser = (userId) => axios.get(`${API_URL}/user/${userId}`);
export const fetchSessions = () => axios.get(`${API_URL}/chatSession`);
export const fetchMessages = (sessionId) =>
  axios.get(`${API_URL}/message/${sessionId}`);
export const sendMessage = (sessionId, message) =>
  axios.post(`${API_URL}/message/${sessionId}`, message);
