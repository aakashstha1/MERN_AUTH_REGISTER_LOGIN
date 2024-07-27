import React, { useState } from "react";
import LoadingButton from "./LoadingButton";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setIsLoginOpen, setIsRegisterOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsLoginOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-box w-[30%]">
        <form onSubmit={handleLogin}>
          <h1 className="text-3xl text-center font-bold mb-2">Login</h1>
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setIsLoginOpen(false)}>
            ✕
          </button>
          <div className="mt-2 ">
            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="off"
                type="email"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                name="password"
                autoComplete="off"
                type="password"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            {!loading ? (
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </button>
            ) : (
              <LoadingButton />
            )}
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?
          <button
            className="ml-1 text-blue-500"
            onClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          >
            Register
          </button>
        </p>
      </div>
    </dialog>
  );
};

export default Login;
