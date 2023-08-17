import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

function fetchData(method, url, data, headers = { "Content-Type": "application/json" }) {
  const response = axios({
    method,
    url,
    data,
    baseURL,
    headers,
    withCredentials: true,
  });

  return response;
}

export default fetchData;
