import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL, doApiGet } from "../../services/apiService";
import Post from "./Post";

const SinglePost2 = () => {
  const { post_id } = useParams();
  const [post, setPostInfo] = useState({});

  useEffect(() => {
    doApiSinglePost();
  }, []);

  const doApiSinglePost = async () => {
    try {
      const url = URL + "/userposts/single/" + post_id;
      const data = await doApiGet(url);
      setPostInfo(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto mt-12">
      {post.likes && (
        <Post
          _id={post._id}
          user_name={post.user?.user_name}
          profilePic={post.user?.profilePic}
          img_url={post.img_url}
          description={post.description}
          user_id={post?.user?._id}
          likes={post.likes}
          likesLength={post.likes?.length}
          date_created={post.date_created}
        />
      )}
    </div>
  );
};

export default SinglePost2;
