import { loginData } from "./misc/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const validateLogin = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error check verification");

  return response.json();
};

export const login = async (formData: loginData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPassword = async (data: {
  phone: string;
  password: string;
  newPassword: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/edit-password`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editPhone = async (data: {
  phone: string;
  password: string;
  newPhone: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/edit-phone`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getImages = async () => {
  const response = await fetch(`${API_BASE_URL}/api/images/get-all-images`);

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteImage = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/images/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const uploadImage = async (images: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/images/upload-images`, {
    method: "POST",
    credentials: "include",
    body: images,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getClasses = async () => {
  const response = await fetch(`${API_BASE_URL}/api/classes/get-all-classes`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createClass = async (data: { name: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/classes/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteClass = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/classes/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editClass = async (form: {
  data: { name: string };
  id: number;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/classes/edit/${form.id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getCourses = async () => {
  const response = await fetch(`${API_BASE_URL}/api/courses/get-all-courses`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createCourse = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/courses/create`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteCourse = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/courses/delete/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const editCourse = async (form: { data: FormData; id: number }) => {
  const response = await fetch(`${API_BASE_URL}/api/courses/edit/${form.id}`, {
    method: "PUT",
    credentials: "include",
    body: form.data,
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getWaitingRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/api/request/waiting-requests`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteWaitingRequests = async (requestIds: number[]) => {
  const response = await fetch(
    `${API_BASE_URL}/api/request/delete-waiting-requests`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestIds }),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const createRequests = async (data: {
  classId: number;
  requestIds: number[];
}) => {
  const response = await fetch(`${API_BASE_URL}/api/request/create-request`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const getRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/api/request/requests`, {
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const deleteRequests = async (requestIds: number[]) => {
  const response = await fetch(`${API_BASE_URL}/api/request/delete-requests`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestIds }),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const changeClassRequest = async (data: {
  requestIds: number[];
  id: number;
}) => {
  const requestIds = data.requestIds;
  const response = await fetch(
    `${API_BASE_URL}/api/request/edit-class/${data.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestIds }),
    }
  );

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};
