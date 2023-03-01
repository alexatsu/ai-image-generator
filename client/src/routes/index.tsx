import { createBrowserRouter } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { Home, Posts } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);
