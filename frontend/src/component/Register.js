import React from "react";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user/UserContext";
import { register } from "../context/user/UserActions";
import { toast } from "react-toastify";

// function generateOTP() {
//   // Declare a digits variable
//   // which stores all digits
//   var digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < 4; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const { name, email, number, password } = formData;

  const navigate = useNavigate();

  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, number, password };

      const data = await register(userData);
      dispatch({ type: "REGISTER_USER", payload: data });

      navigate("/");
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-[0rem]">
      <div className="w-full mt-24 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-700 underline">
          Register
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              for="name"
              className="block text-sm font-semibold text-gray-800"
            >
              User Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="number"
              className="block text-sm font-semibold text-gray-800"
            >
              Number
            </label>
            <input
              type="number"
              name="number"
              id="number"
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {/* <div className="mb-2 mt-1">
            <button
              onClick={generateOTP}
              className="px-4 w-28 text-xs  py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Generate Otp
            </button>
            <input
              type="number"
              name="password"
              id="password"
              placeholder="Enter The Otp"
              disabled="true"
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div> */}

          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          already have an account?{"   "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
