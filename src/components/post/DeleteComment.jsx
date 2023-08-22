import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";

const DeleteComment = ({ setShowDelete, comment, deleteComment, user_id }) => {
  const { userData } = useContext(MyContext);
  const handleOverlayClick = (event) => {
    // Check if the click occurred on the black overlay itself, not the content area
    if (event.target.classList.contains("bg-black")) {
      setShowDelete(false);
    }
  };

  const del = (comment_id) => {
    setShowDelete(true);
    deleteComment(comment_id);
  };

  return (
    <div
      className="fixed inset-0 flex z-50 justify-center items-center bg-black bg-opacity-80 "
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg">
        <button
          onClick={() => setShowDelete(false)}
          className="w-full p-3 hover:bg-gray-200 rounded-t-lg"
        >
          <span className="text-red-500 font-semibold"> Report </span>(coming
          soon!)
        </button>
        {(comment?.user._id === userData._id || user_id === userData._id) && (
          <button
            onClick={() => del(comment._id)}
            className="w-full p-3 hover:bg-gray-200 text-red-500 font-semibold"
          >
            Delete Comment
          </button>
        )}

        <button
          onClick={() => setShowDelete(false)}
          className="w-full p-3 hover:bg-gray-200 rounded-b-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteComment;
