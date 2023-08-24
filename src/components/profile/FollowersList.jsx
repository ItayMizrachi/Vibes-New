import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

const FollowersList = ({
  follow,
  title,
  setShowFollowers,
  setShowFollowing,
}) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      close();
    }
  };

  const close = () => {
    if (title === "Followers") {
      setShowFollowers(false);
    } else {
      setShowFollowing(false);
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-80"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg w-[320px]">
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-center font-bold">{title}</h2>
          <XIcon onClick={close} className="w-5 h-5 cursor-pointer" />
        </div>
        {follow.length === 0 ? (
          <p className="p-3 text-center">
            This user has no {title.toLowerCase()} yet.
          </p>
        ) : (
          <ul className="max-h-[300px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black">
            {follow.map((item, index) => (
              <li
                key={index}
                className={`p-3 hover:bg-gray-200 ${
                  index === follow.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <Link onClick={close} to={"/" + item.user_name}>
                  <img
                    src={item.profilePic}
                    className="rounded-full w-10 h-10 inline mr-2"
                    alt={`${item.user_name}'s profile`}
                  />
                </Link>
                <Link onClick={close} to={"/" + item.user_name}>
                  {item.user_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FollowersList;
