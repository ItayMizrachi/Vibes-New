import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { MyContext } from "./context/myContext";
import { useFollow } from "./hooks/useFollow";
import { usePostInfo } from "./hooks/usePostInfo";
import { useUserData } from "./hooks/useUserData";
import LoadingPage from "./pages/LoadingPage";
import Router from "./routes/Router";

const App = () => {
  const { userData, doApiUser, userSignOut, loading } = useUserData();
  const { deletePost, postsInfo, Intersector, singlePostInfo, setPostsInfo } = usePostInfo();
  const { followUser, followFlag } = useFollow();

  return (
    <MyContext.Provider
      value={{
        userData,
        doApiUser,
        userSignOut,
        deletePost,
        postsInfo,
        setPostsInfo,
        followUser,
        followFlag,
        Intersector,
        singlePostInfo,
      }}
    >
      <Router />
      {loading && <LoadingPage/>}
      <ToastContainer theme="colored" />
    </MyContext.Provider>
  );
};

export default App;
