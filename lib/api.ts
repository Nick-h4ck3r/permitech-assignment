import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};

const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post("/auth/register", { username, password });
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

export const getNote = async (id: string) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: {
  title: string;
  body: string;
  tags: string[];
}) => {
  const response = await api.post("/notes", note);
  return response.data;
};

export const updateNote = async (
  id: string,
  note: { title: string; body: string; tags: string[] }
) => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export default api;
