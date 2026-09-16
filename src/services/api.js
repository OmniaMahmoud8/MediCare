import axios from "axios";

const API_URL = "https://retoolapi.dev/2mxXSs";
const AVAILABILITY_API_URL = "https://retoolapi.dev/xWbMVq";

export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);

  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axios.get(`${API_URL}/doctors/${id}`);

  return response.data;
};

export const getDoctorAvailability = async (doctorId) => {
  const response = await axios.get(
    `${AVAILABILITY_API_URL}/doctorAvailability`,
  );

  return response.data.filter(
    (item) => String(item.doctorId) === String(doctorId),
  );
};
