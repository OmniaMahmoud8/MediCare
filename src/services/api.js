import axios from "axios";

const API_URL = "https://retoolapi.dev/2mxXSs";

export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);

  return response.data;
};
