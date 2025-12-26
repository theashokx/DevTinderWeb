import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

export const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpHandle = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      console.log("Signup success:", res.data);

      dispatch(addUser(res.data.data));

      navigate("/profile");
    } catch (err) {
      console.log("Signup Error:", err.response?.data);
      setError(err.response?.data || "Signup failed");
    }
  };

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
        <h2 className="text-xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {!isLogin && (
          <>
            <label className="label py-2">First Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label py-2">Last Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder=""
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
            />
          </>
        )}

        <label className="label py-2">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder=""
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label py-2">Password</label>
        <input
          type="text"
          className="input w-full"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500 text-center">{error}</p>
        <button
          className="btn btn-neutral mt-4 w-full"
          onClick={isLogin ? loginHandle : signUpHandle}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-blue-500 text-center mt-3 cursor-pointer hover:underline"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "New User? Click here to Signup"
            : "Existing User? Click here to Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
