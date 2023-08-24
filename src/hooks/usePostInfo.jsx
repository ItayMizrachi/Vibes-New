import { useLazyLoading } from "mg-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL, doApiMethod } from "../services/apiService";

export const usePostInfo = () => {
  // const [postsInfo, setPostsInfo] = useState([]);
  // const [singlePostInfo, setSinglePostInfo] = useState({});
  // const { post_id } = useParams();

  // useEffect(() => {
  //   doApiPosts();
  // }, []);

  // const doApiPosts = async () => {
  //   try {
  //     const url = URL + "/userPosts/allposts";
  //     const data = await doApiGet(url);
  //     setPostsInfo(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // TODO: lazyloading after the bug  in the library is fixed
  // lazyloading

  // const [Intersector, data, setData] = useLazyLoading(
  //   { initPage: 0, distance: "50px", targetPercent: 0.5 },
  //   async (page) => {
  //     try {
  //       const url = URL + `/userPosts/allposts?page=${page}`;
  //       const d = await doApiGet(url);
  //       setData(d);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   );

  const [deletedPostId, setDeletedPostId] = useState(null);

  const [Intersector, postsInfo, setPostsInfo] = useLazyLoading(
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
        const arr = await resp.json();
        setPostsInfo(arr);
      } catch (error) {
        console.log(error);
      }
    }
  );

  
  const deletePost = async (_id) => {
    try {
        if (window.confirm("Are you sure you want to delete post?")) {
            const url = URL + "/userPosts/" + _id;
            await doApiMethod(url, "DELETE");
            setPostsInfo((prevData) => prevData.filter((p) => p._id !== _id));
            toast.info(`Post deleted`);
            deletePostNotification(_id);
            
            setDeletedPostId(_id); // Set the recently deleted post ID
        }
    } catch (error) {
        console.log(error);
    }
};


  const deletePost2 = async (_id) => {
    try {
      if (window.confirm("Are you sure you want to delete post?")) {
        const url = URL + "/userPosts/" + _id;
        await doApiMethod(url, "DELETE");
        setPostsInfo((prevData) => prevData.filter((p) => p._id !== _id));
        toast.info(`Post deleted`);
        deletePostNotification(_id);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deletePostNotification = async (post_id) => {
    try {
      const url = URL + `/notifications/post/${post_id}`;
      await doApiMethod(url, "DELETE");
      // console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(deletedPostId) {
        // Here, you can perform any side effects, like fetching new data, reflecting changes, etc.
        // For instance:
        // fetchDataAndUpdatePostsInfo();
        console.log("Post with ID " + deletedPostId + " was deleted");
    }
}, [deletedPostId]);


  return { deletePost, postsInfo, setPostsInfo, Intersector };
};
