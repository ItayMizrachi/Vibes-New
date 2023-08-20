import { DotsHorizontalIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const Comments = ({ commentsInfo, deleteComment, Intersector, user_id }) => {
  // State to manage whether each comment's delete component is shown or not
  const [showDeleteList, setShowDeleteList] = useState(
    new Array(commentsInfo.length).fill(false)
  );

  // Function to toggle the showDelete state for a specific comment
  const toggleShowDelete = (index) => {
    const newShowDeleteList = [...showDeleteList];
    newShowDeleteList[index] = !newShowDeleteList[index];
    setShowDeleteList(newShowDeleteList);
  };

  return (
    <div>
      {commentsInfo.length > 0 && (
        <div className="h-20 ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {commentsInfo.map((comment, index) => (
            <div key={comment._id} className="flex items-center mb-3 space-x-2">
              <Link to={"/" + comment.user.user_name}>
                <img
                  className="rounded-full h-7"
                  src={comment.user.profilePic}
                  alt="profile pic"
                />
              </Link>
              <p className="flex-1 text-sm">
                <Link to={"/" + comment.user.user_name} className="font-bold">
                  {comment.user.user_name}{" "}
                </Link>
                {comment.text}
              </p>
              <p className="pr-5 text-xs text-gray-500">
                {moment(comment.date_created).fromNow()}
                <DotsHorizontalIcon
                  onClick={() => toggleShowDelete(index)}
                  className="w-3 h-3 ml-1 inline cursor-pointer hover:text-gray-600"
                />
              </p>
              {showDeleteList[index] && (
                <DeleteComment
                  comment={comment}
                  deleteComment={deleteComment}
                  setShowDelete={() => toggleShowDelete(index)}
                  user_id={user_id}
                />
              )}
            </div>
          ))}
          {/* <Intersector /> */}
        </div>
      )}
    </div>
  );
};

export default Comments;
