import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about } = user;

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
          <button className="btn btn-outline btn-error w-40">Ignore</button>
          <button className="btn btn-outline btn-primary w-40">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
