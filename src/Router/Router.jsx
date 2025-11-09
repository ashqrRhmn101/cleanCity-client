import { createBrowserRouter } from "react-router";
import NavBar from "../Components/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
  },
]);

export default router;
