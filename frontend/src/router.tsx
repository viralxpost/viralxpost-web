import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

import AuthLayout from "./layouts/AuthLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import DashBoardLayout from "./layouts/DashBoardLayout.tsx";
import Home from "./pages/Home.tsx";
import PostsPage from "./pages/Features.tsx";
import About from "./pages/About.tsx";
import Features from "./pages/Features.tsx";
import Blog from "./pages/Blog.tsx";
import Pricing from "./pages/Pricing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
