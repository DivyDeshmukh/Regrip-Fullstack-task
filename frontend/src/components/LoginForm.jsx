import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import Input from "./Input";
import api from "../api/api";
import { login as loginAction } from "../features/authSlice";
import { toast, ToastContainer } from 'react-toastify';

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const response = await api.post("/login", data, {
        withCredentials: true
      });
      console.log(response.data.data.loggedInUser);
      if (response) {
        dispatch(loginAction(response.data.data.loggedInUser));
        toast.success("User Logged In successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      setError("apiError", { message: error?.response?.data?.message || error.message });
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F7F7F7] p-4 sm:p-6 md:p-8">
      <div className="bg-white w-full sm:max-w-md p-6 sm:p-8 rounded-2xl font-bold shadow-2xl shadow-[#ED729F]">
        <div className="w-full flex flex-col gap-2 justify-center items-center mt-4 text-black mb-4">
          <Logo className="h-16 w-16 p-1" />
          <h1 className="text-center text-lg sm:text-xl">Sign in to your account</h1>
          <span className="text-center text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#97BE80] underline">
              Signup
            </Link>
          </span>
          {/* Display API error message */}
          {errors.apiError && (
            <p className="text-red-500 mt-4 text-center text-sm sm:text-base">
              {errors.apiError.message}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(login)} className="text-left">
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#97BE80] ml-5 mb-2">
              Email:
            </label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email"
              className="form-input mt-1 block w-full rounded-md px-4 border-[1px] border-gray-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {/* Display email validation error */}
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-[#97BE80] ml-5 mb-2">
              Password:
            </label>
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your password"
              className="form-input mt-1 block w-full rounded-md px-4 border-[1px] border-gray-400"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              className="absolute top-12 -translate-y-1/3 right-4 transform"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <i className="ri-eye-line text-black"></i>
              ) : (
                <i className="ri-eye-off-line text-black"></i>
              )}
            </button>
            {/* Display password validation error */}
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-[#fff] hover:bg-white bg-[#ED729F] hover:text-[black] font-bold px-4 py-2 rounded-2xl mt-2 mx-auto hover:border-2 hover:border-black w-full sm:w-auto"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
