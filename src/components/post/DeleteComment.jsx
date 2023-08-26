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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90"
      onClick={handleOverlayClick}
    >
      <div className="bg-white shadow-xl rounded-lg divide-y divide-gray-200 w-80"> {/* Added shadow for emphasis, divide for better button separation and controlled the width */}
        <button
          onClick={() => setShowDelete(false)}
          className="w-full p-4 hover:bg-gray-200 transition duration-200  rounded-t-lg flex justify-center items-center" // Increased padding
        >
          <span className="text-red-500 font-semibold">Report</span>
          <span className="ml-2 text-gray-500">(coming soon!)</span>
        </button>
  
        {(comment?.user === userData._id || user_id === userData._id || comment?.user._id === userData._id ) && (
          <button
            onClick={() => del(comment._id)}
            className="w-full p-4 hover:bg-gray-200 transition duration-200 flex justify-center items-center text-red-500 font-semibold" // Increased padding
          >
            Delete Comment
          </button>
        )}
  
        <button
          onClick={() => setShowDelete(false)}
          className="w-full p-4 hover:bg-gray-200 transition duration-200 rounded-b-lg flex justify-center items-center" // Increased padding
        >
          Cancel
        </button>
      </div>
    </div>
  );}
  
  export default DeleteComment;