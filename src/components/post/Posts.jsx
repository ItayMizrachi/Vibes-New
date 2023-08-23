import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";
import Post from "./Post";

const Posts = () => {
  const { postsInfo } = useContext(MyContext);

  const [Intersector, data, setData] = useLazyLoading(
    { initPage: 0, distance: "50px", targetPercent: 0.5 },
    (page) => {
      // do your api request using page parameter and update the data state
    }
  );

  return (
    <div>
      {postsInfo.map((post) => (
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
      {/* <Intersector /> */}
    </div>
  );
};

export default Posts;
