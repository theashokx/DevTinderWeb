import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export const Login = () => {
  const [emailId, setEmail] = useState("yuvraj@gmail.com");
  const [password, setPassword] = useState("Yuvraj@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandle = async () => {
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(user.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-base-200 border border-base-300 rounded-box w-96 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label mt-2">Password</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 text-center">{error}</p>
        <button className="btn btn-neutral mt-4 w-full" onClick={loginHandle}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
