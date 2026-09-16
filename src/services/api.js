import axios from "axios";

const API_URL = "https://retoolapi.dev/2mxXSs";
const AVAILABILITY_API_URL = "https://retoolapi.dev/xWbMVq";
const APPOINTMENTS_API_URL = "https://retoolapi.dev/heDbAg";

// Doctors API

export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}/doctors`);

  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await axios.get(`${API_URL}/doctors/${id}`);

  return response.data;
};

// Availability API

export const getDoctorAvailability = async (doctorId) => {
  const response = await axios.get(
    `${AVAILABILITY_API_URL}/doctorAvailability`,
  );

  return response.data.filter(
    (item) => String(item.doctorId) === String(doctorId),
  );
};

// Appointments API

export const getAppointments = async () => {
  const response = await axios.get(`${APPOINTMENTS_API_URL}/appointments`);

  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await axios.post(
    `${APPOINTMENTS_API_URL}/appointments`,
    appointmentData,
  );

  return response.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await axios.put(
    `${APPOINTMENTS_API_URL}/appointments/${id}`,
    appointmentData,
  );

  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(
    `${APPOINTMENTS_API_URL}/appointments/${id}`,
  );

  return response.data;
};
