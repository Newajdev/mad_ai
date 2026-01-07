import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home";

import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import PasswordChanged from "../pages/Auth/PasswordChanged";

import Users from "../pages/Users";
import Medicines from "../pages/Medicines";
import Doctors from "../pages/Doctors";
import Pharmacies from "../pages/Pharmacies";
import RefillRequest from "../pages/RefillRequest";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/medicines",
        element: <Medicines />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/pharmacies",
        element: <Pharmacies />,
      },
      {
        path: "/refill-requests",
        element: <RefillRequest />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "/password-changed",
    element: <PasswordChanged />,
  },
]);

export default router;
