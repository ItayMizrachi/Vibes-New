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
        <div className="w-20 h-20 mx-auto mt-10">
          <img
            className="object-contain w-full h-full
            animate-spin"
            src="/images/vibes-logo-responsive.png"
            alt={`vibes logo`}
          />
        </div>
      )}
      <Intersector />
    </div>
  );
};

export default Posts;
