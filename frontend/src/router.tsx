import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import DashBoardLayout from "./layouts/DashBoardLayout.tsx";
import Home from "./pages/Home.tsx";
import PostsPage from "./pages/PostsPage.tsx";


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
    path: 'dashboard',
    element: <DashBoardLayout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'posts',
        element: <PostsPage/>
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
