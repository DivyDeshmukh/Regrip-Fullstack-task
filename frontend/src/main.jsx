import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store/store.js';
import "./index.css";

const App = lazy(() => import ('./App.jsx'));
const AuthProtected = lazy(() => import("./components/AuthProtected.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <LandingPage />
        },
        {
          path: "dashboard",
          element: <AuthProtected>
            <DashboardPage />
          </AuthProtected>
        }
      ]
    }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Suspense>
  </Provider>
);

