import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export const Login = () => {
  const [emailId, setEmail] = useState("ashok@gmail.com");
  const [password, setPassword] = useState("Ashok@123");

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

      console.log(user.data);
      dispatch(addUser(user.data));
      navigate("/");
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-base-200 border border-base-300 rounded-box w-96 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <label className="label">Email</label>
        <input
          type="emailId"
          className="input w-full"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label mt-2">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4 w-full" onClick={loginHandle}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
