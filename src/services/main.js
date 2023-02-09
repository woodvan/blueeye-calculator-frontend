import API from "../utils/API";

export async function getOperations() {
  const data = await API.get(`operations`);
  return data;
}

export async function requestOperation(payload) {
  const data = await API.post('request', payload);
  return data;
}

export async function getRecords(payload) {
  const res = await API.post('records', payload);
  return res?.data?.data;
}

export async function removeRecords(id) {
  const res = await API.delete(`records/${id}`);
  return res;
}
