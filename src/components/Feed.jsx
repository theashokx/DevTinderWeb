import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <>
        <div className="w-full flex justify-center mt-10">
          <div className="w-[450px] bg-base-200 p-6 rounded-2xl shadow text-center">
            <img
              src="https://illustrations.popsy.co/gray/sleeping-cat.svg"
              className="w-40 mx-auto mb-4 opacity-80"
            />

            <h2 className="text-xl font-bold mb-2">No Feed Yet</h2>
            <p className="text-gray-500">
              When new content arrives, it will appear here.
            </p>

            <button className="btn btn-outline btn-sm mt-4" onClick={getFeed}>
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    feed && (
      <div className="flex justify-center mt-6">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
