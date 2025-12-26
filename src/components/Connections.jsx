import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useFetcher } from "react-router-dom";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="w-full flex justify-center mt-8">
        <div className="w-[500px] bg-base-200 p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">No Connections Yet</h2>

          <p className="text-gray-500 mb-4">
            Once you start connecting, they’ll appear here 😊
          </p>

          <button className="btn btn-primary btn-sm" onClick={getConnections}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    connections && (
      <div className="w-full flex justify-center mt-6">
        <div className="w-[500px] bg-base-200 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Connections
          </h2>

          {connections.length === 0 ? (
            <p className="text-center text-gray-500">No connections found</p>
          ) : (
            <ul className="space-y-3">
              {connections.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-4 bg-base-300 p-3 rounded-lg"
                >
                  <img
                    src={user.photoUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">
                      {user.firstName} {user.lastName}
                    </p>

                    {(user.age || user.gender) && (
                      <p className="text-sm text-gray-500">
                        {user.age && <>Age: {user.age}</>}
                        {user.age && user.gender && " • "}
                        {user.gender && <>Gender: {user.gender}</>}
                      </p>
                    )}

                    {user.about && (
                      <p className="text-sm text-gray-400 mt-1">{user.about}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
};
