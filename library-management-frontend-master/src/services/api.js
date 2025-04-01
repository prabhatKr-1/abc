import axios from "axios";
const API_BASE_URL = "http://localhost:8080/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// AUTH APIs
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
  return response.data;
};
export const logoutUser = async () => {
  const response = await api.get("/auth/logout");

  return response.data;
};

// USER APIs

export const fetchUsers = async (role) => {
  const response = await api.get(`${role}/users`);
  return response.data;
};

export const addUser = async (role, _user) => {
  // console.log(_user)
  let response;
  if (role === "admin") {
    response = await api.post(`${role}/create-reader`, _user);
  } else {
    response = await api.post(
      `${role}/create-${_user.Role.toLowerCase()}`,
      _user
    );
  }
  return response.data;
};

export const updateUser = async (role, _user) => {
  // console.log(_user)
  const response = await api.patch(`${role}/users/`, _user);
  return response.data;
};

export const deleteUser = async (role, id) => {
  const response = await api.delete(`${role}/users/${id}`);
  return response.data;
};

// BOOK APIs
export const fetchBooks = async (Role) => {
  const response = await api.get(`${Role}/books`, { withCredentials: true });
  return response.data;
};

export const addBook = async (role, book) => {
  book.ISBN = Number(book.ISBN);
  book.Total_copies = Number(book.Total_copies);
  book.Available_copies = Number(book.Available_copies);
  const response = await api.post(`${role}/books/add`, book);
  return response.data;
};
export const updateBook = async (role, id, book) => {
  book.ISBN = Number(book.ISBN);
  book.Total_copies = Number(book.Total_copies);
  book.Available_copies = Number(book.Available_copies);
  const response = await api.patch(`${role}/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (role, id) => {
  const response = await api.delete(`${role}/books/${id}`);

  return response.data;
};

export const fetchBorrowedBooks = async (role) => {
  const response = await api.get(`${role}/books/my`);
  // console.log(response);
  return response.data;
};

// REQUEST APIs
export const fetchRequests = async (role) => {
  let response;
  if (role === "reader") {
    response = await api.get(`${role}/books/requests`);
  } else {
    response = await api.get(`${role}/requests/all`);
  }
  return response.data;
};

export const handleRequest = async (role, req) => {
  const response = await api.post(`${role}/requests/process`, req);
  return response;
};

export const createRequest = async (role, req) => {
  const response = await api.post(`${role}/books/requests`, {
    ISBN: req.ISBN,
    RequestType: req.ReqType,
  });
  return response;
};
