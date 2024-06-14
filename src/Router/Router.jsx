import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";
import Home from "../pages/Home/Home";
import HotelList from "../pages/HotelList/HotelList";
import HotelDetails from "../pages/HotelDetails/HotelDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Home/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hotellist",
        element: <HotelList />,
      },
      {
        path: "/hoteldetails/:id",
        element: <HotelDetails />,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5500/hotels/${params.id}`),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
