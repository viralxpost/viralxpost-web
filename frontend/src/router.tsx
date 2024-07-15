import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";

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
            path: 'login',
            element: <LoginPage/>
        },
        {
            path:'register',
            element: <SignupPage/>
        }
    ]
}
]);

export default router;
