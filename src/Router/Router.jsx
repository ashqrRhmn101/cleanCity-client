import { createBrowserRouter } from "react-router";
import NavBar from "../Components/NavBar";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home/Home";
import Issues from "../Pages/Home/Issues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/issues',
        element: <Issues/>,
      },
      {
        path: '/',
        element: <Home/>,
      }
    ]
  },
]);

export default router;
