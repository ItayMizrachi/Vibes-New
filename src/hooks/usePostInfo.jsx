import { useLazyLoading } from "mg-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL, doApiMethod } from "../services/apiService";

export const usePostInfo = () => {
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

  // const [Intersector, postsInfo, setPostsInfo] = useLazyLoading(
  //   {
  //     initPage: 1,
  //     distance: "50px",
  //     targetPercent: 0.5,
  //     uuidKeeper: "posts-home",
  //   },
  //   async (page) => {
  //     try {
  //       const url = URL + "/userPosts/allposts?page=" + page;
  //       const resp = await fetch(url);
  //       const arr = await resp.json();
  //       setPostsInfo(arr);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // );

  const [postsInfo, setPostsInfo] = useState([]);
  const [page, setPage] = useState(1);

  // Increment the page whenever the threshold is reached
  const incrementPage = () => setPage((prevPage) => prevPage + 1);

  const [Intersector] = useLazyLoading(
    {
      initPage: page,
      distance: "10px",
      targetPercent: 0.5,
      uuidKeeper: "posts-home",
    },
    incrementPage
  );

  useEffect(() => {
   const fetchPosts = async () => {
      try {
        const url = URL + "/userPosts/allposts?page=" + page;
        const resp = await fetch(url);
        const arr = await resp.json();
        setPostsInfo((prevPosts) => [...prevPosts, ...arr]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [page]);

  const deletePost = async (_id) => {
    try {
      if (window.confirm("Are you sure you want to delete post?")) {
        const url = URL + "/userPosts/" + _id;
        await doApiMethod(url, "DELETE");
        setPostsInfo((prevData) => prevData.filter((p) => p._id !== _id));
        deletePostNotification(_id);
        toast.info(`Post deleted`);
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

  const addNewPost = (newPost) => {
    setPostsInfo((prevPosts) => [newPost, ...prevPosts]);
  };
  
  return { deletePost, postsInfo, setPostsInfo, Intersector , addNewPost};
};
