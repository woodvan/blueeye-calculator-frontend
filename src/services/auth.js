import API from "../utils/API";

export async function login(payload) {
  const res = await API.post(`login`, payload);
  return res;
}

export async function register(payload) {
  const res = await API.post(`register`, payload);
  return res;
}

export async function getCurrentUser() {
  const res = await API.post('currentUser');
  return res?.data?.data;
}