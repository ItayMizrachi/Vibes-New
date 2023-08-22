import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

const LikesList = ({ likes, setShowLikes }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("bg-black")) {
      setShowLikes(false);
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-80"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg w-[250px]">
        <div className="flex justify-between p-4 border-b">
          <h2 className="text-center font-bold">Likes</h2>
          <XIcon
            onClick={() => setShowLikes(false)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        {likes.length === 0 ? (
          <p className="p-3 text-center">No likes on this post yet.</p>
        ) : (
          <ul className="max-h-[300px] overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-black">
            {likes.map((like, index) => (
              <li
                key={index}
                className={`p-3 hover:bg-gray-200 ${index === likes.length - 1 ? "rounded-b-lg" : ""
                  }`}
              >
                <Link to={"/" + like}>{like}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LikesList;
