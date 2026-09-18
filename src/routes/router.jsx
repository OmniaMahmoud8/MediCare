import { createBrowserRouter } from "react-router";
import App from "../App";

import HomePage from "../pages/HomePage";
import DoctorsPage from "../pages/DoctorsPage";
import DoctorDetailsPage from "../pages/DoctorDetailsPage";
import BookAppointmentPage from "../pages/BookAppointmentPage";
import ServicesPage from "../pages/ServicesPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import ProfilePage from "../pages/ProfilePage";
import ConnectUsPage from "../pages/ConnectUsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "doctors",
          element: <DoctorsPage />,
        },
        {
          path: "doctors/:id",
          element: <DoctorDetailsPage />,
        },
        {
          path: "book-appointment",
          element: <BookAppointmentPage />,
        },
        {
          path: "services",
          element: <ServicesPage />,
        },
        {
          path: "appointments",
          element: <AppointmentsPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "connect",
          element: <ConnectUsPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: "/MediCare",
  }
);