import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  InformationCircleIcon,
  MoonIcon,
  PlusCircleIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { HomeIcon, LogoutIcon } from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../context/myContext";
import { TOKEN_KEY, URL, doApiGet } from "../services/apiService";
import Dalle4 from "./Dalle4";
import Noftlications from "./Noftlications";
import Search from "./Search";
import AddPost from "./post/AddPost";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header = () => {
  const {
    userSignOut,
    userData,
    setUserData,
    setIsLoading,
    darkMode,
    toggleDarkMode,
  } = useContext(MyContext);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showNoftlications, setShowNoftlications] = useState(false);
  const [showImgAi, setShowImgAi] = useState(false);
  const nav = useNavigate();

  const toggleNoftlications = () => {
    setShowNoftlications(!showNoftlications);
  };
  const [isRead, setIsRead] = useState({ unreadCount: 0 });

  const doApiUnreadCount = async () => {
    try {
      const url = URL + "/notifications/unread-count/" + userData?._id;
      const data = await doApiGet(url);
      setIsRead(data);
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData._id) {
      doApiUnreadCount();
    }
  }, [userData]);

  const logout = async () => {
    if (window.confirm("Are you sure you want to log out")) {
      try {
        setIsLoading(true);
        await localStorage.removeItem(TOKEN_KEY); // Remove the token from localStorage
        await localStorage.removeItem("tokenExpiration"); // Remove the token expiration time
        toast.info("You logged out, see you soon...");
        setUserData({});
        nav("/signin");
        setIsLoading(false);
      } catch (error) {
        console.error("Error deleting token:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-10 md:px-6 p-5 lg:p-0  border-b shadow-s px-3 bg-white dark:border-slate-800 dark:bg-slate-900 ">
      <div className="flex justify-between w-full mx-auto md:max-w-7xl px-2 md:px-0">
        {showNoftlications && (
          <Noftlications
            setIsRead={setIsRead}
            setShowNoftlications={setShowNoftlications}
            showNoftlications={showNoftlications}
          />
        )}
        {showAddPost && <AddPost setShowAddPost={setShowAddPost} />}
        {showImgAi && <Dalle4 setShowImgAi={setShowImgAi} />}
        {/* {showImgAi && <ImageAi setShowImgAi={setShowImgAi} />} */}
        {/* left */}
        {/* Light mode logo for large screens */}
        <div
          className={`relative w-24 h-24 cursor-pointer ${
            darkMode ? "hidden" : "hidden lg:block"
          }`}
        >
          <Link to="/">
            <img
              src="/images/vibes-logo.png"
              className="object-contain w-full h-full "
              alt="logo"
            />
          </Link>
        </div>
        {/* Light mode logo for small screens */}
        <div
          className={`relative flex-shrink-0 w-10 cursor-pointer ${
            darkMode ? "hidden" : "lg:hidden"
          }`}
        >
          <Link to="/">
            <img
              src="/images/vibes-logo-responsive.png"
              className="object-contain w-full h-full"
              alt="responsive logo"
            />
          </Link>
        </div>

        {/* Dark mode logo for large screens */}
        <div
          className={`relative w-24 h-24 cursor-pointer ${
            darkMode ? "hidden lg:block" : "hidden"
          }`}
        >
          <Link to="/">
            <img
              src="/images/dark-logo.png"
              className="object-contain w-full h-full "
              alt="logo"
            />
          </Link>
        </div>
        {/* Dark mode logo for small screens */}
        <div
          className={`relative flex-shrink-0 w-10 cursor-pointer ${
            darkMode ? "lg:hidden" : "hidden"
          }`}
        >
          <Link to="/">
            <img
              src="/images/dark-responsive-logo.png"
              alt="logo"
              className="object-contain w-full h-full "
            />
          </Link>
        </div>

        {/* middle - Search input field */}
        <div className="max-w-xs hidden  items-center md:flex ">
          <Search />
        </div>

        {/* right */}
        <div className="flex items-center justify-end space-x-2 md:space-x-4">
          <Link to="/">
            <HomeIcon className="navBtn " />
          </Link>
          <Link to="about">
            <InformationCircleIcon className="navBtn " />
          </Link>
          {!localStorage[TOKEN_KEY] ? (
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <SunIcon className="h-6 transition-all duration-150 ease-out cursor-pointer  hover:scale-125" />
              ) : (
                <MoonIcon className="h-6 transition-all duration-150 ease-out cursor-pointer hover:scale-125 " />
              )}
            </button>
          ) : (
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <SunIcon className="navBtn" />
              ) : (
                <MoonIcon className="navBtn " />
              )}
            </button>
          )}


          {localStorage[TOKEN_KEY] && userData ? (
            <>
              <div onClick={toggleNoftlications} className="relative navBtn ">
                <BellIcon className="navBtn " />
                {isRead.unreadCount > 0 && (
                  <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 dark:bg-red-400 rounded-full -top-1 -right-2 animate-pulse">
                    {isRead.unreadCount}
                  </div>
                )}
              </div>

              <PlusCircleIcon
                onClick={() => setShowAddPost(true)}
                className="navBtn "
              />

              <Link to="chat">
                <ChatIcon className="navBtn " />
              </Link>

              <CameraIcon
                onClick={() => setShowImgAi(true)}
                className="navBtn "
              />

              <div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="w-10 h-10 align-middle">
                      <img
                        src={userData?.profilePic}
                        alt="profile pic"
                        className="dark:hover:border-slate-600 dark:border-slate-700 object-cover w-full h-full rounded-full border p-[1px] hover:border-gray-400 transition duration-200"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-800 dark:text-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2">
                        <Menu.Item className="md:hidden ">
                          {({ active }) => (
                            <div className="md:hidden">
                              <Search  />
                             </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={userData.user_name}
                              className={`mt-1 ${
                                active
                                  ? "bg-gray-200 dark:bg-slate-700 "
                                  : "dark:text-gray-200"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <UserIcon className="h-5 w-5 mr-2" />
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={toggleDarkMode}
                              className={`md:hidden ${
                                active
                                  ? "bg-gray-200 dark:bg-slate-700 "
                                  : "dark:text-gray-200"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {darkMode ? (
                                <SunIcon className="h-5 w-5 mr-2" />
                              ) : (
                                <MoonIcon className="h-5 w-5 mr-2" />
                              )}
                              {darkMode ? "Light Mode" : "Dark Mode"}
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`${
                                active
                                  ? "bg-gray-200 dark:bg-slate-700"
                                  : "dark:text-gray-200"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              <LogoutIcon className="h-5 w-5 mr-2" />
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Link
                to="signin"
                className="text-sm hidden md:inline-flex font-semibold text-indigo-400 hover:text-indigo-500  transition duration-200  "
              >
                sign in
              </Link>
              <p className="font-semibold text-gray-400 hidden md:inline-flex">
                {" "}
                |{" "}
              </p>
              <Link
                to="signup"
                className="text-sm hidden md:inline-flex font-semibold text-indigo-400 hover:text-indigo-500  transition duration-200 "
              >
                sign up
              </Link>
            </>
          )}

          {/* <button >Sign In</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
