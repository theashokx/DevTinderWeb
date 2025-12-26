import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const feed = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card w-96 bg-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <figure className="h-64 overflow-hidden">
        <img
          src={photoUrl || "/default-avatar.png"}
          alt={firstName}
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg">
          {firstName} {lastName}
          {age && (
            <span className="text-sm font-normal text-gray-500">, {age}</span>
          )}
        </h2>

        {gender && <p className="text-sm text-gray-500 capitalize">{gender}</p>}

        <p className="text-sm leading-relaxed mt-2">{about}</p>

        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-error w-40"
            onClick={() => handleFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-primary w-40"
            onClick={() => handleFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
