import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                <li>
                  <a href="#">Item 1</a>
                </li>
                <li tabIndex={0}>
                  <a className="justify-between">
                    Parent
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </a>
                  <ul className="p-2 bg-white">
                    <li>
                      <a href="#">Submenu 1</a>
                    </li>
                    <li>
                      <a href="#">Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Item 3</a>
                </li>
              </ul>
            </div>
            <a className="ml-4 text-xl font-bold text-gray-800" href="#">LOGO</a>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <a className="text-gray-800 hover:text-gray-600" href="#">Item 1</a>
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-600 flex items-center">
                Parent
                <svg className="ml-1 fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className="absolute left-0 mt-2 p-2 bg-white border border-gray-200 rounded shadow-md hidden group-hover:block">
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Submenu 1</a>
                </li>
                <li>
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Submenu 2</a>
                </li>
              </ul>
            </div>
            <a className="text-gray-800 hover:text-gray-600" href="#">Item 3</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="btn " onClick={() => setIsLoginOpen(true)}>LOGIN</button>
            <button className="btn " onClick={() => setIsRegisterOpen(true)}>REGISTER</button>
          </div>
        </div>
      </nav>
      <ToastContainer />
      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} />}
      {isRegisterOpen && <Register setIsRegisterOpen={setIsRegisterOpen} setIsLoginOpen={setIsLoginOpen} />}
      
    </div>
  );
};

export default App;
