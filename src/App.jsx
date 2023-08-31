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
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // On component mount, check if dark mode is already enabled
  useEffect(() => {
    const isDark = document.body.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  // When darkMode state changes, store it in localStorage and update body class
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-gray-200">
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
