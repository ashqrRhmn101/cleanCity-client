import { createBrowserRouter } from "react-router";
import NavBar from "../Components/NavBar";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home/Home";
import Issues from "../Pages/Home/Issues";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import AddIssues from "../Pages/Issues/AddIssues";
import MyIssues from "../Pages/Issues/MyIssues";
import MyContribution from "../Pages/Issues/MyContribution";
import PrivateRouter from "../Provider/PrivateRouter";
import IssueDetails from "../Pages/Home/IssueDetails";

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
        path: "/issues",
        element: <Issues />,
        loader: () => fetch("http://localhost:3000/issues"),
      },
      {
        path: "/issueDetails/:id",
        element: <PrivateRouter><IssueDetails/></PrivateRouter>,
        loader: ({params}) => fetch(`http://localhost:3000/issues/${params.id}`),
      },
      {
        path: "/addIssues",
        element: (
          <PrivateRouter>
            <AddIssues />
          </PrivateRouter>
        ),
      },
      {
        path: "/myIssues",
        element: (
          <PrivateRouter>
            <MyIssues />
          </PrivateRouter>
        ),
      },
      {
        path: "/myContribution",
        element: (
          <PrivateRouter>
            <MyContribution />
          </PrivateRouter>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
