import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";
import Post from "./Post";
import { URL } from "../../services/apiService";
import { useLazyLoading } from "mg-js";

const Posts = () => {
  const { postsInfo } = useContext(MyContext);

  const [Intersector, data, setData] = useLazyLoading(
    {
      initPage: 1,
      distance: "50px",
      targetPercent: 0.5,
      uuidKeeper: "posts-home",
    },
    async (page) => {
      try {
        const url = URL + "/userPosts/allposts?page=" + page;
        const resp = await fetch(url);
        const obj = await resp.json();
        setData(obj);
      } catch (error) {
        alert(error);
      }
    }
  );

  return (
    <div>
      {data.map((post) => (
        <Post
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
      <Intersector />
    </div>
  );
};

export default Posts;
