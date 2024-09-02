import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import {Provider} from "react-redux";
import store from './store/store.js';
import "./index.css";
import LandingPage from './pages/LandingPage.jsx';
import AuthProtected from './components/AuthProtected.jsx';
import { ToastContainer } from 'react-toastify';

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
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

