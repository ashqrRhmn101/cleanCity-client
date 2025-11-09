import { createBrowserRouter } from "react-router";
import NavBar from "../Components/NavBar";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home/Home";
import Issues from "../Pages/Home/Issues";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";

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
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
    ]
  },
]);

export default router;
