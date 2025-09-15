import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/subscriptions/";

export const listSubscriptions = () => axios.get(API_URL);
export const createSubscription = (data) => axios.post(API_URL, data);
export const updateSubscription = (id, data) => axios.put(`${API_URL}${id}/`, data);
export const deleteSubscription = (id) => axios.delete(`${API_URL}${id}/`);
export const getStats = () => axios.get(`${API_URL}stats/`);
