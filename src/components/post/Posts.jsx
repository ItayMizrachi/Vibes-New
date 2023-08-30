import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";
import Post from "./Post";

const Posts = () => {
  const { postsInfo, setPostsInfo, Intersector, isPostLoading } =
    useContext(MyContext);

  return (
    <div>
      {postsInfo.map((post) => (
        <Post
          postsInfo={postsInfo}
          setPostsInfo={setPostsInfo}
          likes={post.likes}
          likesLength={post.likes.length}
          key={post._id + Math.random()}
          _id={post._id}
          user_name={post.user?.user_name}
          profilePic={post.user?.profilePic}
          img_url={post.img_url}
          description={post.description}
          user_id={post.user?._id}
          date_created={post.date_created}
        />
      ))}
      {isPostLoading && (
        <div className="flex flex-col items-center justify-center w-full mt-10 space-y-6  p-6 ">
          <img
            className="object-contain w-24 h-24 animate-spin mb-4"
            src="/images/vibes-logo-responsive.png"
            alt="vibes logo"
          />
          <div className="w-64 p-4 border rounded-lg bg-white shadow-md">
            <p className="text-md text-gray-700 mb-2">
              Thanks for your visit! Our servers may occasionally go into a
              sleep mode. Waking them up can lead to longer initial loading
              times. This is especially true when accessing after periods of
              inactivity.
            </p>
            <p className="text-sm text-red-500 mt-2">
              We sincerely apologize for the wait. Your patience is greatly
              appreciated.
            </p>
          </div>
        </div>
      )}

      <Intersector />
    </div>
  );
};

export default Posts;
