import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage/>
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children: [
        {
            path: 'auth/login',
            element: <LoginPage/>
        },
        {
            path:'auth/register',
            element: <SignupPage/>
        }
    ]
}
]);

export default router;
