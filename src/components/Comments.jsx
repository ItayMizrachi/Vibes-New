import { DotsHorizontalIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const Comments = ({ commentsInfo, deleteComment, Intersector, user_id }) => {
  const [showDeleteList, setShowDeleteList] = useState(
    new Array(commentsInfo.length).fill(false)
  );

  const toggleShowDelete = (index) => {
    const newShowDeleteList = [...showDeleteList];
    newShowDeleteList[index] = !newShowDeleteList[index];
    setShowDeleteList(newShowDeleteList);
  };

  return (
    <div>
      {commentsInfo.length > 0 && (
        <div className="ml-10">
          {commentsInfo.map((comment, index) => (
            <div
              key={comment._id}
              className="flex flex-col md:flex-row items-start mb-3"
            >
              <Link
                to={"/" + comment.user.user_name}
                className="flex items-center space-x-2"
              >
                <img
                  className="rounded-full h-10 w-10"
                  src={comment.user.profilePic}
                  alt="profile pic"
                />
                <p className="text-sm font-bold">{comment.user.user_name}</p>
              </Link>
              <div className="ml-0 md:ml-2 mt-2 md:max-w-md">
                <p className="break-words">{comment.text}</p>
              </div>
              <div className="flex mt-3 items-center ml-auto pr-5 text-xs text-gray-500">
                {moment(comment.date_created).fromNow()}
                <DotsHorizontalIcon
                  onClick={() => toggleShowDelete(index)}
                  className="w-3 h-3 ml-1 cursor-pointer hover:text-gray-600"
                />
              </div>
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
        </div>
      )}
    </div>
  );
};

export default Comments;
