import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, id, request_id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(request_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    <div>
      <h1 className="text-center text-4xl">No Requests Found</h1>
    </div>;
  }

  return (
    requests && (
      <div className="w-full flex justify-center mt-6">
        <div className="w-[500px] bg-base-200 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Pending Requests
          </h2>

          {requests.length === 0 ? (
            <p className="text-center text-gray-500">No Requests Found</p>
          ) : (
            <ul className="space-y-3">
              {requests.map((request) => {
                const { firstName, lastName, photoUrl, _id, about } =
                  request.fromUserId;

                return (
                  <li
                    key={_id}
                    className="flex items-center gap-4 bg-base-300 p-3 rounded-lg"
                  >
                    <img
                      src={photoUrl}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div className="flex-1">
                      <p className="font-semibold">
                        {firstName} {lastName}
                      </p>

                      {about && (
                        <p className="text-sm text-gray-400 mt-1">{about}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          reviewRequest("rejected", _id, request._id)
                        }
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          reviewRequest("accepted", _id, request._id)
                        }
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    )
  );
};

export default Requests;
