import React, { useState } from "react";
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
  const { userData, doApiUser, userSignOut, setUserData } = useUserData();
  const { deletePost, postsInfo, setPostsInfo, addNewPost, Intersector } =
    usePostInfo();
  const { followUser, followFlag } = useFollow();
  const [loading, setIsLoading] = useState(false);

  return (
    <MyContext.Provider
      value={{
        userData,
        setUserData,
        doApiUser,
        userSignOut,
        deletePost,
        followUser,
        followFlag,
        loading,
        setIsLoading,
        postsInfo,
        setPostsInfo,
        addNewPost,
        Intersector,
      }}
    >
      <Router />
      {loading && <LoadingPage />}
      <ToastContainer theme="colored" />
    </MyContext.Provider>
  );
};

export default App;
