import {
  BellIcon,
  CameraIcon,
  ChatIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  SearchIcon
} from "@heroicons/react/outline";
import { HomeIcon, LogoutIcon } from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/myContext";
import { TOKEN_KEY, URL, doApiGet } from "../services/apiService";
import Dalle4 from "./Dalle4";
import Noftlications from "./Noftlications";
import Search from "./Search";
import AddPost from "./post/AddPost";

const Header = () => {
  const { userSignOut, userData } = useContext(MyContext);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showNoftlications, setShowNoftlications] = useState(false);
  const [showImgAi, setShowImgAi] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 md:px-6 bg-white border-b shadow-s px-3">
      <div className="flex justify-between max-w-6xl mx-auto">
        {showNoftlications && (
          <Noftlications
            setIsRead={setIsRead}
            setShowNoftlications={setShowNoftlications}
          />
        )}
        {showAddPost && <AddPost setShowAddPost={setShowAddPost} />}
        {showImgAi && <Dalle4 setShowImgAi={setShowImgAi} />}
        {/* {showImgAi && <ImageAi setShowImgAi={setShowImgAi} />} */}
        {/* left */}
        <div className="relative hidden w-24 h-24 cursor-pointer lg:inline-grid">
          <Link to="/">
            <img
              src="/images/vibes-logo.png"
              className="object-contain w-full h-full"
              alt="logo"
            />
          </Link>
        </div>
        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Link to="/">
            <img
              src="/images/vibes-logo-responsive.png"
              className="object-contain w-full h-full"
              alt="responsive logo"
            />
          </Link>
        </div>

        {/* middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative p-3 mt-1 rounded-md md:mt-4">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <Search />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-2 md:space-x-4">
          <Link to="/">
            <HomeIcon className="navBtn" />
          </Link>
          <Link to="about">
            <InformationCircleIcon className="navBtn" />
          </Link>

          {/* <MenuIcon className="w-10 h-6 cursor-pointer md:hidden" /> */}

          {localStorage[TOKEN_KEY] && userData ? (
            <>
              <div onClick={toggleNoftlications} className="relative navBtn">
                <BellIcon className="navBtn" />
                {isRead.unreadCount > 0 && (
                  <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
                    {isRead.unreadCount}
                  </div>
                )}
              </div>

              <PlusCircleIcon
                onClick={() => setShowAddPost(true)}
                className="navBtn"
              />

              {/* <Link to="groups">
                <UserGroupIcon className="navBtn" />
              </Link> */}
              {/* <Link to="chatbot">
                <AcademicCapIcon className="navBtn" />
              </Link> */}
              <Link to="chat">
                <ChatIcon className="navBtn" />
              </Link>

              <CameraIcon
                onClick={() => setShowImgAi(true)}
                className="navBtn"
              />

              <LogoutIcon onClick={userSignOut} className="lowNavBtn" />
              <Link to={userData.user_name}>
                <div className="w-10 h-10">
                  <img
                    src={userData?.profilePic}
                    alt="profile pic"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="signin"
                className="text-sm hidden md:inline-flex font-semibold text-blue-400 "
              >
                sign in
              </Link>
              <p className="font-semibold text-gray-400 hidden md:inline-flex">
                {" "}
                |{" "}
              </p>
              <Link
                to="signup"
                className="text-sm hidden md:inline-flex font-semibold text-blue-400"
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
