import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Logo from "./Logo";
import api from "../api/api";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const signup = async (data) => {
    try {
      const response = await api.post("/signup", data, {
        withCredentials: true
      });
      if (response) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (err) {
      setError("apiError", { message: err?.response?.data?.message || err.message });
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F7F7F7] p-4 sm:p-6 md:p-8">
      <div className="bg-white w-full sm:max-w-md p-6 sm:p-8 rounded-2xl font-bold shadow-2xl shadow-[#ED729F]">
        <div
          id="text"
          className="w-full flex flex-col gap-2 justify-center items-center mt-4 text-black mb-4"
        >
          <Logo className="h-[64px] w-[64px] p-1" />
          <h1 className="text-center text-lg sm:text-xl">Sign up for an account</h1>
          <span className="text-center text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-[#97BE80] underline">
              Sign in
            </Link>
          </span>
          {/* Display API error message */}
          {errors.apiError && (
            <p className="text-red-500 mt-4 text-center text-sm sm:text-base">
              {errors.apiError.message}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-[#97BE80] ml-5 mb-2"
            >
              Username:
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter username"
              className="form-input mt-1 block w-full rounded-md px-4 border-[1px] border-gray-400"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {/* Display username validation error */}
            {errors.username && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#97BE80] ml-5 mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-[#97BE80] ml-5 mb-2"
            >
              Password:
            </label>
            <Input
              id="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Enter your password"
              className="form-input mt-1 block w-full rounded-md px-4 border-[1px] border-gray-400"
              {...register("password", {
                required: "Password is required",
                validate: {
                  minLength: value => value.length >= 8 || "Password must be at least 8 characters long",
                  hasNumber: value => /\d/.test(value) || "Password must contain at least one number",
                  hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                  hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character"
                }
              })}
            />
            <button
              type="button"
              className="absolute top-10 right-4"
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
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
