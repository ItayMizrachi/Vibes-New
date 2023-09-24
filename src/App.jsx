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
import { useEffect } from "react";

const App = () => {
  const { userData, doApiUser, userSignOut, setUserData } = useUserData();
  const {
    deletePost,
    postsInfo,
    setPostsInfo,
    addNewPost,
    isPostLoading,
    Intersector,
  } = usePostInfo();
  const { followUser, followFlag } = useFollow();
  const [loading, setIsLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || ""
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // When darkMode state changes, store it in localStorage and update body class
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-gray-200 min-h-screen">
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
          isPostLoading,
          darkMode,
          toggleDarkMode,
        }}
      >
        <Router />
        {loading && <LoadingPage />}
        <ToastContainer theme="colored" />
      </MyContext.Provider>
    </div>
  );
};

export default App;
