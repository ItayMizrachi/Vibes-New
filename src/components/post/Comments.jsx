import { DotsHorizontalIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import DeleteComment from "./DeleteComment";

const Comments = ({ commentsInfo, deleteComment, Intersector, user_id }) => {
  const { userData} = useContext(MyContext);
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
      {/* {commentsInfo.length > 0 && ( */}
      <>
        <div
          className={`${
            commentsInfo.length > 0 ? "h-20" : ""
          } ml-10 overflow-y-scroll scrollbar-thumb-black scrollbar-thin`}
        >
          {commentsInfo.map((comment, index) => (
            <div key={comment._id} className="flex items-start mb-3">
              <Link
                to={
                  "/" +
                  (comment.user === userData._id
                    ? userData.user_name
                    : comment.user?.user_name)
                }
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 mr-1">
                  <img
                    className="object-cover dark:hover:border-slate-600 dark:border-slate-700 w-full h-full rounded-full border p-[1px] hover:border-gray-400 transition duration-200"
                    src={
                      comment.user === userData._id
                        ? userData?.profilePic
                        : comment.user?.profilePic
                    }
                    alt="profile pic"
                  />
                </div>
              </Link>

              <div className="ml-0 md:ml-2 mt-2 md:max-w-md">
                <p className="break-words">
                  {" "}
                  <span className="text-sm font-bold mr-2">
                    <Link
                    className="hover:text-gray-600 dark:hover:text-gray-400"
                      to={
                        "/" +
                        (comment.user === userData._id
                          ? userData.user_name
                          : comment.user?.user_name)
                      }
                    >
                      {comment.user === userData._id
                        ? userData.user_name
                        : comment.user?.user_name}
                    </Link>
                  </span>
                  {comment.text}
                </p>
                <span className="text-gray-500 text-end">
                  {moment(comment.date_created).fromNow()}
                </span>
              </div>

              <div className="flex mt-3 items-center ml-auto pr-5 text-xs text-gray-500">
                <DotsHorizontalIcon
                  onClick={() => toggleShowDelete(index)}
                  className="w-5 h-5 ml-1 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400"
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
          <Intersector />
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Comments;

