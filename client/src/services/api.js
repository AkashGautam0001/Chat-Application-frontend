import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const fetchUser = (userId) => axios.get(`${API_URL}/user/${userId}`);
export const fetchSessions = () => axios.get(`${API_URL}/chatSession`);
export const fetchMessages = (sessionId) =>
  axios.get(`${API_URL}/message/${sessionId}`);
export const sendMessage = (sessionId, message) =>
  axios.post(`${API_URL}/message/${sessionId}`, message);
